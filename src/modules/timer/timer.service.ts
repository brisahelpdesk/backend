import { Injectable, BadRequestException } from '@nestjs/common';
import { TimerModule as ITimerModule } from '../../interfaces/timer-module.interface';
import { TimerRepository } from './timer.repository';
import { TimerResponseDto } from './dto/timer-response.dto';

@Injectable()
export class TimerService implements ITimerModule {
  constructor(private readonly timerRepository: TimerRepository) {}

  async startTimer(): Promise<TimerResponseDto> {
    const started_at = new Date();
    // TODO: Utilizar o ID do usuário autenticado
    const timer = await this.timerRepository.create({ user_id: 1, started_at });

    return timer;
  }

  async pauseTimer(timerId: string): Promise<TimerResponseDto> {
    const id = Number(timerId);
    const timer = await this.timerRepository.findById(id);
    if (timer.state !== 'running') {
      throw new BadRequestException('Timer cannot be paused');
    }

    const paused_at = new Date();
    const TimerPaused = await this.timerRepository.update(id, { paused_at, state: 'paused' });

    return TimerPaused;
  }

  async resumeTimer(timerId: string): Promise<TimerResponseDto> {
    const id = Number(timerId);
    const timer = await this.timerRepository.findById(id);
    if (timer.state !== 'paused') {
      throw new BadRequestException('Timer cannot be resumed');
    }

    const resumed_at = new Date();
    let total_paused = timer.total_paused || 0;
    if (timer.paused_at) {
      total_paused += Math.floor((resumed_at.getTime() - new Date(timer.paused_at).getTime()) / 1000);
    }
    const timerResumed = await this.timerRepository.update(id, { resumed_at, state: 'running', total_paused });

    return timerResumed;
  }

  async stopTimer(timerId: string): Promise<TimerResponseDto> {
    const id = Number(timerId);
    const timer = await this.timerRepository.findById(id);
    if (timer.state === 'stopped') {
      throw new BadRequestException('Timer already stopped');
    }

    const stopped_at = new Date();
    let total_paused = timer.total_paused || 0;
    if (timer.state === 'paused' && timer.paused_at) {
      total_paused += Math.floor((stopped_at.getTime() - new Date(timer.paused_at).getTime()) / 1000);
    }
    const duration = Math.floor((stopped_at.getTime() - new Date(timer.started_at).getTime()) / 1000) - total_paused;
    const timerStoped = await this.timerRepository.update(id, { stopped_at, state: 'stopped', duration, total_paused });

    return timerStoped;
  }
}

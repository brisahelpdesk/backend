import { Injectable, BadRequestException } from '@nestjs/common';
import { TimerModule as ITimerModule } from '../../interfaces/timer-module.interface';
import { TimerRepository } from './timer.repository';

@Injectable()
export class TimerService implements ITimerModule {
  constructor(private readonly timerRepository: TimerRepository) {}

  async startTimer(): Promise<{ timerId: string; startedAt: Date }> {
    const started_at = new Date();
    // TODO: Utilizar o ID do usuário autenticado
    const timer = await this.timerRepository.create({ user_id: 1, started_at });

    return {
      timerId: timer.id.toString(),
      startedAt: timer.started_at,
    };
  }

  async pauseTimer(timerId: string): Promise<{ paused: boolean; pausedAt: Date }> {
    const id = Number(timerId);
    const timer = await this.timerRepository.findById(id);
    if (timer.state !== 'running') {
      throw new BadRequestException('Timer cannot be paused');
    }

    const paused_at = new Date();
    await this.timerRepository.update(id, { paused_at, state: 'paused' });

    return {
      paused: true,
      pausedAt: paused_at,
    };
  }

  async resumeTimer(timerId: string): Promise<{ resumed: boolean; resumedAt: Date }> {
    const id = Number(timerId);
    const timer = await this.timerRepository.findById(id);
    if (timer.state !== 'paused') {
      throw new BadRequestException('Timer cannot be resumed');
    }

    const resumed_at = new Date();
    let total_paused = timer.total_paused || 0;
    if (timer.paused_at) {
      total_paused += resumed_at.getTime() - new Date(timer.paused_at).getTime();
    }
    await this.timerRepository.update(id, { resumed_at, state: 'running', total_paused });

    return {
      resumed: true,
      resumedAt: resumed_at,
    };
  }

  async stopTimer(timerId: string): Promise<{ stopped: boolean; stoppedAt: Date; duration: number }> {
    const id = Number(timerId);
    const timer = await this.timerRepository.findById(id);
    if (timer.state === 'stopped') {
      throw new BadRequestException('Timer already stopped');
    }

    const stopped_at = new Date();
    let total_paused = timer.total_paused || 0;
    if (timer.state === 'paused' && timer.paused_at) {
      total_paused += stopped_at.getTime() - new Date(timer.paused_at).getTime();
    }
    const duration = stopped_at.getTime() - new Date(timer.started_at).getTime() - total_paused;
    await this.timerRepository.update(id, { stopped_at, state: 'stopped', duration, total_paused });

    return {
      stopped: true,
      stoppedAt: stopped_at,
      duration,
    };
  }
}

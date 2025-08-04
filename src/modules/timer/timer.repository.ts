import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';
import { TimerResponseDto } from './dto/timer-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TimerRepository {
  constructor(private readonly persistence: PersistenceService) {}

  async create(data: CreateTimerDto): Promise<TimerResponseDto> {
    const timer = await this.persistence.tb_timer.create({
      data: {
        user_id: data.user_id,
        started_at: data.started_at,
        state: 'running',
      },
    });
    
    return plainToInstance(TimerResponseDto, timer, { excludeExtraneousValues: true });
  }

  async update(id: number, data: UpdateTimerDto): Promise<TimerResponseDto> {
    const timer = await this.persistence.tb_timer.update({
      where: { id },
      data,
    });

    return plainToInstance(TimerResponseDto, timer, { excludeExtraneousValues: true });
  }

  async findById(id: number): Promise<TimerResponseDto> {
    const timer = await this.persistence.tb_timer.findUnique({ where: { id } });

    if (!timer) {
      throw new NotFoundException('Timer not found');
    }

    return plainToInstance(TimerResponseDto, timer, { excludeExtraneousValues: true });
  }
}

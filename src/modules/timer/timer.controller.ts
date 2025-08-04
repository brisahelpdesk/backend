import { Controller, Post, Param, Patch } from '@nestjs/common';
import { TimerService } from './timer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('timer')
@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Post()
  start() {
    return this.timerService.startTimer();
  }

  @Patch('pause/:id')
  pause(@Param('id') id: string) {
    return this.timerService.pauseTimer(id);
  }

  @Patch('resume/:id')
  resume(@Param('id') id: string) {
    return this.timerService.resumeTimer(id);
  }

  @Patch('stop/:id')
  stop(@Param('id') id: string) {
    return this.timerService.stopTimer(id);
  }
}

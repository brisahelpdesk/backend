import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';

import { TimerRepository } from './timer.repository';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [TimerController],
  providers: [TimerService, TimerRepository],
  exports: [TimerService, TimerRepository],
})
export class TimerModule {}

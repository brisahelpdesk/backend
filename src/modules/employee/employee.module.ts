import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [PersistenceModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  exports: [EmployeeService], // Export the service so other modules can use it
})
export class EmployeeModule {} 
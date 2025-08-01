import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class BranchDto {
  @ApiProperty({ description: 'Branch UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Branch name' })
  @Expose()
  name: string;
}

class DepartmentDto {
  @ApiProperty({ description: 'Department UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Department name' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Department description' })
  @Expose()
  description?: string;
}

class EmployeeStatusDto {
  @ApiProperty({ description: 'Employee status UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Employee status name' })
  @Expose()
  status: string;

  @ApiProperty({ description: 'Employee status description' })
  @Expose()
  description?: string;
}

class JobPositionDto {
  @ApiProperty({ description: 'Job position UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Job position title' })
  @Expose()
  title: string;

  @ApiProperty({ description: 'Job position description' })
  @Expose()
  description?: string;
}

class UserDto {
  @ApiProperty({ description: 'User UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'User email' })
  @Expose()
  email: string;
}

class SupervisorDto {
  @ApiProperty({ description: 'Supervisor UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Supervisor individual tax ID' })
  @Expose()
  individual_tax_id: string;

  @ApiProperty({ description: 'Supervisor first name' })
  @Expose()
  first_name: string;

  @ApiProperty({ description: 'Supervisor last name' })
  @Expose()
  last_name: string;

  @ApiProperty({ description: 'Supervisor contact email' })
  @Expose()
  contact_email: string;

  @ApiProperty({ description: 'Supervisor branch information' })
  @Expose()
  @Type(() => BranchDto)
  tb_branch: BranchDto;

  @ApiProperty({ description: 'Supervisor department information' })
  @Expose()
  @Type(() => DepartmentDto)
  tb_department?: DepartmentDto;

  @ApiProperty({ description: 'Supervisor employee status' })
  @Expose()
  @Type(() => EmployeeStatusDto)
  tb_employee_status: EmployeeStatusDto;

  @ApiProperty({ description: 'Supervisor job position' })
  @Expose()
  @Type(() => JobPositionDto)
  tb_job_position: JobPositionDto;
}

class SubordinateDto {
  @ApiProperty({ description: 'Subordinate UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Subordinate individual tax ID' })
  @Expose()
  individual_tax_id: string;

  @ApiProperty({ description: 'Subordinate first name' })
  @Expose()
  first_name: string;

  @ApiProperty({ description: 'Subordinate last name' })
  @Expose()
  last_name: string;

  @ApiProperty({ description: 'Subordinate contact email' })
  @Expose()
  contact_email: string;

  @ApiProperty({ description: 'Subordinate branch information' })
  @Expose()
  @Type(() => BranchDto)
  tb_branch: BranchDto;

  @ApiProperty({ description: 'Subordinate department information' })
  @Expose()
  @Type(() => DepartmentDto)
  tb_department?: DepartmentDto;

  @ApiProperty({ description: 'Subordinate employee status' })
  @Expose()
  @Type(() => EmployeeStatusDto)
  tb_employee_status: EmployeeStatusDto;

  @ApiProperty({ description: 'Subordinate job position' })
  @Expose()
  @Type(() => JobPositionDto)
  tb_job_position: JobPositionDto;
}

export class EmployeeResponseDto {
  @ApiProperty({ description: 'Employee UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Individual tax ID (CPF)' })
  @Expose()
  individual_tax_id: string;

  @ApiProperty({ description: 'Internal employee code' })
  @Expose()
  internal_code?: string;

  @ApiProperty({ description: 'First name' })
  @Expose()
  first_name: string;

  @ApiProperty({ description: 'Last name' })
  @Expose()
  last_name: string;

  @ApiProperty({ description: 'Whether the employee is active' })
  @Expose()
  is_active: boolean;

  @ApiProperty({ description: 'Contact email address' })
  @Expose()
  contact_email: string;

  @ApiProperty({ description: 'Extension number' })
  @Expose()
  extension_number?: string;

  @ApiProperty({ description: 'Hire date' })
  @Expose()
  @Transform(({ value }) => value.toISOString().split('T')[0])
  hired_at: Date;

  @ApiProperty({ description: 'Dismissal date' })
  @Expose()
  @Transform(({ value }) => value ? value.toISOString().split('T')[0] : null)
  dimissed_at?: Date;

  @ApiProperty({ description: 'Employee creation date' })
  @Expose()
  @Transform(({ value }) => value.toISOString())
  created_at: Date;

  @ApiProperty({ description: 'Employee last update date' })
  @Expose()
  @Transform(({ value }) => value.toISOString())
  updated_at: Date;

  @ApiProperty({ description: 'Branch information' })
  @Expose()
  @Type(() => BranchDto)
  tb_branch: BranchDto;

  @ApiProperty({ description: 'Department information' })
  @Expose()
  @Type(() => DepartmentDto)
  tb_department?: DepartmentDto;

  @ApiProperty({ description: 'Employee status information' })
  @Expose()
  @Type(() => EmployeeStatusDto)
  tb_employee_status: EmployeeStatusDto;

  @ApiProperty({ description: 'Job position information' })
  @Expose()
  @Type(() => JobPositionDto)
  tb_job_position: JobPositionDto;

  @ApiProperty({ description: 'Associated user information' })
  @Expose()
  @Type(() => UserDto)
  tb_user?: UserDto;

  @ApiProperty({ description: 'Supervisor information' })
  @Expose()
  @Type(() => SupervisorDto)
  tb_employee?: SupervisorDto;

  @ApiProperty({ description: 'Subordinates list' })
  @Expose()
  @Type(() => SubordinateDto)
  other_tb_employee: SubordinateDto[];

  // Helper methods for easy access
  @ApiProperty({ description: 'Full name of the employee' })
  @Expose()
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @ApiProperty({ description: 'Whether the employee has a supervisor' })
  @Expose()
  get hasSupervisor(): boolean {
    return !!this.tb_employee;
  }

  @ApiProperty({ description: 'Whether the employee has subordinates' })
  @Expose()
  get hasSubordinates(): boolean {
    return this.other_tb_employee.length > 0;
  }

  @ApiProperty({ description: 'Number of subordinates' })
  @Expose()
  get subordinatesCount(): number {
    return this.other_tb_employee.length;
  }

  @ApiProperty({ description: 'Whether the employee has a user account' })
  @Expose()
  get hasUserAccount(): boolean {
    return !!this.tb_user;
  }

  @ApiProperty({ description: 'Whether the employee is dismissed' })
  @Expose()
  get isDismissed(): boolean {
    return !!this.dimissed_at;
  }
} 
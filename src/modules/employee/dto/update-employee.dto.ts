import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({ description: 'Individual tax ID (CPF)' })
  @IsOptional()
  @IsString()
  individual_tax_id?: string;

  @ApiPropertyOptional({ description: 'Internal employee code' })
  @IsOptional()
  @IsString()
  internal_code?: string;

  @ApiPropertyOptional({ description: 'Associated user ID' })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiPropertyOptional({ description: 'Supervisor employee ID' })
  @IsOptional()
  @IsNumber()
  supervisor_id?: number;

  @ApiPropertyOptional({ description: 'Department ID' })
  @IsOptional()
  @IsNumber()
  department_id?: number;

  @ApiPropertyOptional({ description: 'Job position ID' })
  @IsOptional()
  @IsNumber()
  job_position_id?: number;

  @ApiPropertyOptional({ description: 'Branch ID' })
  @IsOptional()
  @IsNumber()
  branch_id?: number;

  @ApiPropertyOptional({ description: 'Employee status ID' })
  @IsOptional()
  @IsNumber()
  employee_status_id?: number;

  @ApiPropertyOptional({ description: 'First name' })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ description: 'Last name' })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ description: 'Whether the employee is active' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ description: 'Hire date' })
  @IsOptional()
  @IsDateString()
  hired_at?: string;

  @ApiPropertyOptional({ description: 'Dismissal date' })
  @IsOptional()
  @IsDateString()
  dimissed_at?: string;

  @ApiPropertyOptional({ description: 'Contact email address' })
  @IsOptional()
  @IsEmail()
  contact_email?: string;

  @ApiPropertyOptional({ description: 'Extension number' })
  @IsOptional()
  @IsString()
  extension_number?: string;
} 
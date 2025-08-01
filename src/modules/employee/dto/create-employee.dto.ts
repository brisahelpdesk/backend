import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Individual tax ID (CPF)' })
  @IsString()
  individual_tax_id: string;

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

  @ApiProperty({ description: 'Job position ID' })
  @IsNumber()
  job_position_id: number;

  @ApiProperty({ description: 'Branch ID' })
  @IsNumber()
  branch_id: number;

  @ApiProperty({ description: 'Employee status ID' })
  @IsNumber()
  employee_status_id: number;

  @ApiProperty({ description: 'First name' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ description: 'Whether the employee is active' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Hire date' })
  @IsDateString()
  hired_at: string;

  @ApiPropertyOptional({ description: 'Dismissal date' })
  @IsOptional()
  @IsDateString()
  dimissed_at?: string;

  @ApiProperty({ description: 'Contact email address' })
  @IsEmail()
  contact_email: string;

  @ApiPropertyOptional({ description: 'Extension number' })
  @IsOptional()
  @IsString()
  extension_number?: string;
} 
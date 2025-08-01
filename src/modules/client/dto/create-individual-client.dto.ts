import { IsString, IsOptional, IsNumber, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIndividualClientDto {
  @ApiProperty({ description: 'Client type ID' })
  @IsNumber()
  client_type_id: number;

  @ApiProperty({ description: 'Client status ID' })
  @IsNumber()
  client_status_id: number;

  @ApiPropertyOptional({ description: 'Date when client became a client' })
  @IsOptional()
  @IsDateString()
  client_since?: string;

  @ApiProperty({ description: 'Contact email address' })
  @IsEmail()
  contact_email: string;

  @ApiProperty({ description: 'Individual tax ID (CPF)' })
  @IsString()
  individual_tax_id: string;

  @ApiPropertyOptional({ description: 'Associated user ID' })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ description: 'First name' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Birth date' })
  @IsDateString()
  birthdate: string;
} 
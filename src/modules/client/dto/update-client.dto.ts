import { IsString, IsOptional, IsNumber, IsEmail, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto {
  // Base client fields
  @ApiPropertyOptional({ description: 'Client type ID' })
  @IsOptional()
  @IsNumber()
  client_type_id?: number;

  @ApiPropertyOptional({ description: 'Client status ID' })
  @IsOptional()
  @IsNumber()
  client_status_id?: number;

  @ApiPropertyOptional({ description: 'Date when client became a client' })
  @IsOptional()
  @IsDateString()
  client_since?: string;

  @ApiPropertyOptional({ description: 'Contact email address' })
  @IsOptional()
  @IsEmail()
  contact_email?: string;

  // Individual client fields
  @ApiPropertyOptional({ description: 'Individual tax ID (CPF)' })
  @IsOptional()
  @IsString()
  individual_tax_id?: string;

  @ApiPropertyOptional({ description: 'Associated user ID' })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiPropertyOptional({ description: 'First name' })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ description: 'Last name' })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ description: 'Birth date' })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  // Company client fields
  @ApiPropertyOptional({ description: 'Company tax ID (CNPJ)' })
  @IsOptional()
  @IsString()
  company_tax_id?: string;

  @ApiPropertyOptional({ description: 'Company size ID' })
  @IsOptional()
  @IsNumber()
  company_size_id?: number;

  @ApiPropertyOptional({ description: 'Legal name of the company' })
  @IsOptional()
  @IsString()
  legal_name?: string;

  @ApiPropertyOptional({ description: 'Trade name of the company' })
  @IsOptional()
  @IsString()
  trade_name?: string;
} 
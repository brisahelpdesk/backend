import { IsString, IsOptional, IsNumber, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyClientDto {
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

  @ApiProperty({ description: 'Company tax ID (CNPJ)' })
  @IsString()
  company_tax_id: string;

  @ApiProperty({ description: 'Company size ID' })
  @IsNumber()
  company_size_id: number;

  @ApiProperty({ description: 'Legal name of the company' })
  @IsString()
  legal_name: string;

  @ApiProperty({ description: 'Trade name of the company' })
  @IsString()
  trade_name: string;
} 
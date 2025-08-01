import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ClientTypeDto {
  @ApiProperty({ description: 'Client type UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Client type name' })
  @Expose()
  type: string;

  @ApiProperty({ description: 'Client type description' })
  @Expose()
  description?: string;
}

class ClientStatusDto {
  @ApiProperty({ description: 'Client status UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Client status name' })
  @Expose()
  status: string;

  @ApiProperty({ description: 'Client status description' })
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

class IndividualClientDto {
  @ApiProperty({ description: 'Individual tax ID' })
  @Expose()
  individual_tax_id: string;

  @ApiProperty({ description: 'First name' })
  @Expose()
  first_name: string;

  @ApiProperty({ description: 'Last name' })
  @Expose()
  last_name: string;

  @ApiProperty({ description: 'Birth date' })
  @Expose()
  @Transform(({ value }) => value.toISOString().split('T')[0])
  birthdate: Date;

  @ApiProperty({ description: 'Associated user' })
  @Expose()
  @Type(() => UserDto)
  tb_user?: UserDto;
}

class CompanySizeDto {
  @ApiProperty({ description: 'Company size UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Company size name' })
  @Expose()
  size: string;

  @ApiProperty({ description: 'Company size description' })
  @Expose()
  description?: string;
}

class CompanyClientDto {
  @ApiProperty({ description: 'Company tax ID' })
  @Expose()
  company_tax_id: string;

  @ApiProperty({ description: 'Legal name' })
  @Expose()
  legal_name: string;

  @ApiProperty({ description: 'Trade name' })
  @Expose()
  trade_name: string;

  @ApiProperty({ description: 'Company size information' })
  @Expose()
  @Type(() => CompanySizeDto)
  tb_company_size: CompanySizeDto;
}

export class ClientResponseDto {
  @ApiProperty({ description: 'Client UUID' })
  @Expose()
  uuid: string;

  @ApiProperty({ description: 'Contact email' })
  @Expose()
  contact_email: string;

  @ApiProperty({ description: 'Client type information' })
  @Expose()
  @Type(() => ClientTypeDto)
  tb_client_type: ClientTypeDto;

  @ApiProperty({ description: 'Client status information' })
  @Expose()
  @Type(() => ClientStatusDto)
  tb_client_status: ClientStatusDto;

  @ApiProperty({ description: 'Date when client became a client' })
  @Expose()
  @Transform(({ value }) => value ? value.toISOString().split('T')[0] : null)
  client_since?: Date;

  @ApiProperty({ description: 'Client creation date' })
  @Expose()
  @Transform(({ value }) => value.toISOString())
  created_at: Date;

  @ApiProperty({ description: 'Client last update date' })
  @Expose()
  @Transform(({ value }) => value.toISOString())
  updated_at: Date;

  @ApiProperty({ description: 'Individual client information (if applicable)' })
  @Expose()
  @Type(() => IndividualClientDto)
  tb_client_individual?: IndividualClientDto;

  @ApiProperty({ description: 'Company client information (if applicable)' })
  @Expose()
  @Type(() => CompanyClientDto)
  tb_client_company?: CompanyClientDto;

  // Helper methods for type discrimination
  @ApiProperty({ description: 'Whether this is an individual client' })
  @Expose()
  get isIndividual(): boolean {
    return !!this.tb_client_individual;
  }

  @ApiProperty({ description: 'Whether this is a company client' })
  @Expose()
  get isCompany(): boolean {
    return !!this.tb_client_company;
  }

  @ApiProperty({ description: 'Client type (individual or company)' })
  @Expose()
  get clientType(): 'individual' | 'company' {
    return this.isIndividual ? 'individual' : 'company';
  }
} 
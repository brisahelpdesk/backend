# Client Module

This module provides comprehensive CRUD operations for both individual and company clients. It handles the complex relationship between the base client table and the specific individual/company client tables.

## Features

- **Dual Client Types**: Support for both individual and company clients
- **Complete CRUD Operations**: Create, Read, Update, Delete for both client types
- **Type Discrimination**: Automatic detection of client type (individual vs company)
- **Status Management**: Activate/deactivate clients
- **Transaction Safety**: Database operations use transactions for data integrity
- **Comprehensive Relations**: Includes all related data (user, company size, etc.)

## API Endpoints

### Generic Client Endpoints

- `GET /clients` - Get all clients (both individual and company)
- `GET /clients/:uuid` - Get specific client by UUID
- `DELETE /clients/:uuid` - Delete client
- `PUT /clients/:uuid/activate` - Activate client
- `PUT /clients/:uuid/deactivate` - Deactivate client

### Individual Client Endpoints

- `GET /clients/individual/all` - Get all individual clients
- `GET /clients/individual/:uuid` - Get specific individual client
- `POST /clients/individual` - Create individual client
- `PUT /clients/individual/:uuid` - Update individual client

### Company Client Endpoints

- `GET /clients/company/all` - Get all company clients
- `GET /clients/company/:uuid` - Get specific company client
- `POST /clients/company` - Create company client
- `PUT /clients/company/:uuid` - Update company client

## Data Models

### Individual Client Structure
```typescript
{
  uuid: string;
  contact_email: string;
  client_type_id: number;
  client_status_id: number;
  client_since?: Date;
  tb_client_individual: {
    individual_tax_id: string; // CPF
    first_name: string;
    last_name: string;
    birthdate: Date;
    user_id?: number;
    tb_user?: UserDto;
  };
}
```

### Company Client Structure
```typescript
{
  uuid: string;
  contact_email: string;
  client_type_id: number;
  client_status_id: number;
  client_since?: Date;
  tb_client_company: {
    company_tax_id: string; // CNPJ
    legal_name: string;
    trade_name: string;
    company_size_id: number;
    tb_company_size: CompanySizeDto;
  };
}
```

## DTOs

### CreateIndividualClientDto
- `client_type_id: number` - Client type ID (required)
- `client_status_id: number` - Client status ID (required)
- `client_since?: string` - Date when client became a client (optional)
- `contact_email: string` - Contact email (required)
- `individual_tax_id: string` - CPF (required)
- `user_id?: number` - Associated user ID (optional)
- `first_name: string` - First name (required)
- `last_name: string` - Last name (required)
- `birthdate: string` - Birth date (required)

### CreateCompanyClientDto
- `client_type_id: number` - Client type ID (required)
- `client_status_id: number` - Client status ID (required)
- `client_since?: string` - Date when client became a client (optional)
- `contact_email: string` - Contact email (required)
- `company_tax_id: string` - CNPJ (required)
- `company_size_id: number` - Company size ID (required)
- `legal_name: string` - Legal name (required)
- `trade_name: string` - Trade name (required)

### UpdateClientDto
All fields are optional for partial updates. Supports both individual and company client fields.

### ClientResponseDto
Includes type discrimination helpers:
- `isIndividual: boolean` - Whether this is an individual client
- `isCompany: boolean` - Whether this is a company client
- `clientType: 'individual' | 'company'` - Client type

## Database Operations

### Transaction Safety
All create operations use database transactions to ensure data integrity:
1. Create base client record
2. Create specific client record (individual or company)
3. Return complete client with all relations

### Relations Included
- `tb_client_type` - Client type information
- `tb_client_status` - Client status information
- `tb_client_individual` - Individual client details (if applicable)
- `tb_client_company` - Company client details (if applicable)
- `tb_user` - Associated user (for individual clients)
- `tb_company_size` - Company size (for company clients)

## Example Usage

### Creating an Individual Client
```typescript
const individualClient = await this.clientService.createIndividualClient({
  client_type_id: 1,
  client_status_id: 1,
  contact_email: 'john.doe@example.com',
  individual_tax_id: '12345678901',
  first_name: 'John',
  last_name: 'Doe',
  birthdate: '1990-01-01',
  user_id: 1 // optional
});
```

### Creating a Company Client
```typescript
const companyClient = await this.clientService.createCompanyClient({
  client_type_id: 2,
  client_status_id: 1,
  contact_email: 'contact@company.com',
  company_tax_id: '12345678000199',
  company_size_id: 1,
  legal_name: 'Company Legal Name LTDA',
  trade_name: 'Company Trade Name'
});
```

### Getting All Individual Clients
```typescript
const individualClients = await this.clientService.findIndividualClients();
```

### Getting All Company Clients
```typescript
const companyClients = await this.clientService.findCompanyClients();
```

### Type Discrimination
```typescript
const client = await this.clientService.findOne('client-uuid');

if (client.isIndividual) {
  console.log('Individual client:', client.tb_client_individual.first_name);
} else if (client.isCompany) {
  console.log('Company client:', client.tb_client_company.legal_name);
}

// Or use the helper
console.log('Client type:', client.clientType); // 'individual' or 'company'
```

## Error Handling

- `NotFoundException` - When client is not found
- Proper validation errors for invalid data
- Transaction rollback on database errors

## Dependencies

- `@nestjs/common` - NestJS core functionality
- `class-transformer` - DTO transformation
- `class-validator` - DTO validation
- `@nestjs/swagger` - API documentation 
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateIndividualClientDto } from './dto/create-individual-client.dto';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Generic client endpoints
  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'List of all clients', type: [ClientResponseDto] })
  async findAll(): Promise<ClientResponseDto[]> {
    return this.clientService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get client by UUID' })
  @ApiParam({ name: 'uuid', description: 'Client UUID' })
  @ApiResponse({ status: 200, description: 'Client found', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(@Param('uuid') uuid: string): Promise<ClientResponseDto> {
    return this.clientService.findOne(uuid);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete client' })
  @ApiParam({ name: 'uuid', description: 'Client UUID' })
  @ApiResponse({ status: 204, description: 'Client deleted successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return this.clientService.delete(uuid);
  }

  // Individual client endpoints
  @Get('individual/all')
  @ApiOperation({ summary: 'Get all individual clients' })
  @ApiResponse({ status: 200, description: 'List of individual clients', type: [ClientResponseDto] })
  async findIndividualClients(): Promise<ClientResponseDto[]> {
    return this.clientService.findIndividualClients();
  }

  @Get('individual/:uuid')
  @ApiOperation({ summary: 'Get individual client by UUID' })
  @ApiParam({ name: 'uuid', description: 'Individual client UUID' })
  @ApiResponse({ status: 200, description: 'Individual client found', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Individual client not found' })
  async findIndividualClient(@Param('uuid') uuid: string): Promise<ClientResponseDto> {
    return this.clientService.findIndividualClient(uuid);
  }

  @Post('individual')
  @ApiOperation({ summary: 'Create individual client' })
  @ApiResponse({ status: 201, description: 'Individual client created', type: ClientResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createIndividualClient(@Body() data: CreateIndividualClientDto): Promise<ClientResponseDto> {
    return this.clientService.createIndividualClient(data);
  }

  @Put('individual/:uuid')
  @ApiOperation({ summary: 'Update individual client' })
  @ApiParam({ name: 'uuid', description: 'Individual client UUID' })
  @ApiResponse({ status: 200, description: 'Individual client updated', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Individual client not found' })
  async updateIndividualClient(
    @Param('uuid') uuid: string,
    @Body() data: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    return this.clientService.updateIndividualClient(uuid, data);
  }

  // Company client endpoints
  @Get('company/all')
  @ApiOperation({ summary: 'Get all company clients' })
  @ApiResponse({ status: 200, description: 'List of company clients', type: [ClientResponseDto] })
  async findCompanyClients(): Promise<ClientResponseDto[]> {
    return this.clientService.findCompanyClients();
  }

  @Get('company/:uuid')
  @ApiOperation({ summary: 'Get company client by UUID' })
  @ApiParam({ name: 'uuid', description: 'Company client UUID' })
  @ApiResponse({ status: 200, description: 'Company client found', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Company client not found' })
  async findCompanyClient(@Param('uuid') uuid: string): Promise<ClientResponseDto> {
    return this.clientService.findCompanyClient(uuid);
  }

  @Post('company')
  @ApiOperation({ summary: 'Create company client' })
  @ApiResponse({ status: 201, description: 'Company client created', type: ClientResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCompanyClient(@Body() data: CreateCompanyClientDto): Promise<ClientResponseDto> {
    return this.clientService.createCompanyClient(data);
  }

  @Put('company/:uuid')
  @ApiOperation({ summary: 'Update company client' })
  @ApiParam({ name: 'uuid', description: 'Company client UUID' })
  @ApiResponse({ status: 200, description: 'Company client updated', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Company client not found' })
  async updateCompanyClient(
    @Param('uuid') uuid: string,
    @Body() data: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    return this.clientService.updateCompanyClient(uuid, data);
  }

  // Status management endpoints
  @Put(':uuid/activate')
  @ApiOperation({ summary: 'Activate client' })
  @ApiParam({ name: 'uuid', description: 'Client UUID' })
  @ApiResponse({ status: 200, description: 'Client activated', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async activateClient(@Param('uuid') uuid: string): Promise<ClientResponseDto> {
    return this.clientService.activateClient(uuid);
  }

  @Put(':uuid/deactivate')
  @ApiOperation({ summary: 'Deactivate client' })
  @ApiParam({ name: 'uuid', description: 'Client UUID' })
  @ApiResponse({ status: 200, description: 'Client deactivated', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async deactivateClient(@Param('uuid') uuid: string): Promise<ClientResponseDto> {
    return this.clientService.deactivateClient(uuid);
  }
} 
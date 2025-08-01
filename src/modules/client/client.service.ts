import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateIndividualClientDto } from './dto/create-individual-client.dto';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  // Individual Client Operations
  async createIndividualClient(data: CreateIndividualClientDto): Promise<ClientResponseDto> {
    return this.clientRepository.createIndividualClient(data);
  }

  async updateIndividualClient(uuid: string, data: UpdateClientDto): Promise<ClientResponseDto> {
    return this.clientRepository.updateIndividualClient(uuid, data);
  }

  // Company Client Operations
  async createCompanyClient(data: CreateCompanyClientDto): Promise<ClientResponseDto> {
    return this.clientRepository.createCompanyClient(data);
  }

  async updateCompanyClient(uuid: string, data: UpdateClientDto): Promise<ClientResponseDto> {
    return this.clientRepository.updateCompanyClient(uuid, data);
  }

  // Generic Client Operations
  async findAll(): Promise<ClientResponseDto[]> {
    return this.clientRepository.findAll();
  }

  async findOne(uuid: string): Promise<ClientResponseDto> {
    return this.clientRepository.findOne(uuid);
  }

  async findByEmail(email: string): Promise<ClientResponseDto | null> {
    return this.clientRepository.findByEmail(email);
  }

  async delete(uuid: string): Promise<void> {
    return this.clientRepository.delete(uuid);
  }

  // Individual Client Specific
  async findIndividualClients(): Promise<ClientResponseDto[]> {
    return this.clientRepository.findIndividualClients();
  }

  async findIndividualClient(uuid: string): Promise<ClientResponseDto> {
    return this.clientRepository.findIndividualClient(uuid);
  }

  // Company Client Specific
  async findCompanyClients(): Promise<ClientResponseDto[]> {
    return this.clientRepository.findCompanyClients();
  }

  async findCompanyClient(uuid: string): Promise<ClientResponseDto> {
    return this.clientRepository.findCompanyClient(uuid);
  }

  // Status Operations
  async activateClient(uuid: string): Promise<ClientResponseDto> {
    return this.clientRepository.activateClient(uuid);
  }

  async deactivateClient(uuid: string): Promise<ClientResponseDto> {
    return this.clientRepository.deactivateClient(uuid);
  }
} 
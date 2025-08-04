import { Injectable, Logger } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateIndividualClientDto } from './dto/create-individual-client.dto';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly emailService: EmailService,
  ) {}

  // Individual Client Operations
  async createIndividualClient(data: CreateIndividualClientDto): Promise<ClientResponseDto> {
    const client = await this.clientRepository.createIndividualClient(data);

    if (data.user_id) {
        try {
            // Get client name for email
            const clientName = `${data.first_name} ${data.last_name}`;

            await this.emailService.sendPasswordResetEmail(
              data.contact_email,
              'TOKEN',
              'FRONTEND URL',
            );

            this.logger.log(`Password reset email sent to ${data.contact_email} for individual client`);
          } catch (error) {
            this.logger.error(`Failed to send password reset email to ${data.contact_email}:`, error);
            // Don't throw error here to avoid breaking the client creation
          }
    }
      return client;
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
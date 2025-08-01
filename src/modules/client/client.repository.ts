import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';
import { CreateIndividualClientDto } from './dto/create-individual-client.dto';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientRepository {
  constructor(private readonly persistence: PersistenceService) {}

  async createIndividualClient(data: CreateIndividualClientDto): Promise<ClientResponseDto> {
    const client = await this.persistence.$transaction(async (prisma) => {
      // Create the base client record
      const baseClient = await prisma.tb_client.create({
        data: {
          client_type_id: data.client_type_id,
          client_status_id: data.client_status_id,
          client_since: data.client_since,
          contact_email: data.contact_email,
        },
      });

      // Create the individual client record
      const individualClient = await prisma.tb_client_individual.create({
        data: {
          id: baseClient.id,
          individual_tax_id: data.individual_tax_id,
          user_id: data.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          birthdate: data.birthdate,
        },
      });

      // Return the complete client with relations
      return prisma.tb_client.findUnique({
        where: { id: baseClient.id },
        include: {
          tb_client_type: true,
          tb_client_status: true,
          tb_client_individual: {
            include: {
              tb_user: true,
            },
          },
        },
      });
    });

    return plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true });
  }

  async createCompanyClient(data: CreateCompanyClientDto): Promise<ClientResponseDto> {
    const client = await this.persistence.$transaction(async (prisma) => {
      // Create the base client record
      const baseClient = await prisma.tb_client.create({
        data: {
          client_type_id: data.client_type_id,
          client_status_id: data.client_status_id,
          client_since: data.client_since,
          contact_email: data.contact_email,
        },
      });

      // Create the company client record
      const companyClient = await prisma.tb_client_company.create({
        data: {
          id: baseClient.id,
          company_tax_id: data.company_tax_id,
          company_size_id: data.company_size_id,
          legal_name: data.legal_name,
          trade_name: data.trade_name,
        },
      });

      // Return the complete client with relations
      return prisma.tb_client.findUnique({
        where: { id: baseClient.id },
        include: {
          tb_client_type: true,
          tb_client_status: true,
          tb_client_company: {
            include: {
              tb_company_size: true,
            },
          },
        },
      });
    });

    return plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.persistence.tb_client.findMany({
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    return clients.map((client) => plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true }));
  }

  async findOne(uuid: string): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findUnique({
      where: { uuid },
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    if (!client) throw new NotFoundException('Client not found');

    return plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true });
  }

  async findByEmail(email: string): Promise<ClientResponseDto | null> {
    const client = await this.persistence.tb_client.findFirst({
      where: { contact_email: email },
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    if (!client) return null;

    return plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true });
  }

  async findIndividualClients(): Promise<ClientResponseDto[]> {
    const clients = await this.persistence.tb_client.findMany({
      where: {
        tb_client_individual: {
          isNot: null,
        },
      },
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
      },
    });

    return clients.map((client) => plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true }));
  }

  async findIndividualClient(uuid: string): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findFirst({
      where: {
        uuid,
        tb_client_individual: {
          isNot: null,
        },
      },
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
      },
    });

    if (!client) throw new NotFoundException('Individual client not found');

    return plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true });
  }

  async findCompanyClients(): Promise<ClientResponseDto[]> {
    const clients = await this.persistence.tb_client.findMany({
      where: {
        tb_client_company: {
          isNot: null,
        },
      },
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    return clients.map((client) => plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true }));
  }

  async findCompanyClient(uuid: string): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findFirst({
      where: {
        uuid,
        tb_client_company: {
          isNot: null,
        },
      },
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    if (!client) throw new NotFoundException('Company client not found');

    return plainToInstance(ClientResponseDto, client, { excludeExtraneousValues: true });
  }

  async updateIndividualClient(uuid: string, data: UpdateClientDto): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findUnique({ where: { uuid } });
    if (!client) throw new NotFoundException('Client not found');

    const updated = await this.persistence.$transaction(async (prisma) => {
      // Update base client data
      const updateData: any = {};
      if (data.client_type_id) updateData.client_type_id = data.client_type_id;
      if (data.client_status_id) updateData.client_status_id = data.client_status_id;
      if (data.client_since) updateData.client_since = data.client_since;
      if (data.contact_email) updateData.contact_email = data.contact_email;

      await prisma.tb_client.update({
        where: { uuid },
        data: updateData,
      });

      // Update individual client data
      if (data.individual_tax_id || data.first_name || data.last_name || data.birthdate || data.user_id) {
        const individualUpdateData: any = {};
        if (data.individual_tax_id) individualUpdateData.individual_tax_id = data.individual_tax_id;
        if (data.first_name) individualUpdateData.first_name = data.first_name;
        if (data.last_name) individualUpdateData.last_name = data.last_name;
        if (data.birthdate) individualUpdateData.birthdate = data.birthdate;
        if (data.user_id !== undefined) individualUpdateData.user_id = data.user_id;

        await prisma.tb_client_individual.update({
          where: { id: client.id },
          data: individualUpdateData,
        });
      }

      // Return updated client with relations
      return prisma.tb_client.findUnique({
        where: { uuid },
        include: {
          tb_client_type: true,
          tb_client_status: true,
          tb_client_individual: {
            include: {
              tb_user: true,
            },
          },
        },
      });
    });

    return plainToInstance(ClientResponseDto, updated, { excludeExtraneousValues: true });
  }

  async updateCompanyClient(uuid: string, data: UpdateClientDto): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findUnique({ where: { uuid } });
    if (!client) throw new NotFoundException('Client not found');

    const updated = await this.persistence.$transaction(async (prisma) => {
      // Update base client data
      const updateData: any = {};
      if (data.client_type_id) updateData.client_type_id = data.client_type_id;
      if (data.client_status_id) updateData.client_status_id = data.client_status_id;
      if (data.client_since) updateData.client_since = data.client_since;
      if (data.contact_email) updateData.contact_email = data.contact_email;

      await prisma.tb_client.update({
        where: { uuid },
        data: updateData,
      });

      // Update company client data
      if (data.company_tax_id || data.legal_name || data.trade_name || data.company_size_id) {
        const companyUpdateData: any = {};
        if (data.company_tax_id) companyUpdateData.company_tax_id = data.company_tax_id;
        if (data.legal_name) companyUpdateData.legal_name = data.legal_name;
        if (data.trade_name) companyUpdateData.trade_name = data.trade_name;
        if (data.company_size_id) companyUpdateData.company_size_id = data.company_size_id;

        await prisma.tb_client_company.update({
          where: { id: client.id },
          data: companyUpdateData,
        });
      }

      // Return updated client with relations
      return prisma.tb_client.findUnique({
        where: { uuid },
        include: {
          tb_client_type: true,
          tb_client_status: true,
          tb_client_company: {
            include: {
              tb_company_size: true,
            },
          },
        },
      });
    });

    return plainToInstance(ClientResponseDto, updated, { excludeExtraneousValues: true });
  }

  async delete(uuid: string): Promise<void> {
    try {
      await this.persistence.tb_client.delete({ where: { uuid } });
    } catch (e) {
      throw new NotFoundException('Client not found');
    }
  }

  async activateClient(uuid: string): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findUnique({ where: { uuid } });
    if (!client) throw new NotFoundException('Client not found');

    const updated = await this.persistence.tb_client.update({
      where: { uuid },
      data: { client_status_id: 1 }, // Assuming 1 is active status
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    return plainToInstance(ClientResponseDto, updated, { excludeExtraneousValues: true });
  }

  async deactivateClient(uuid: string): Promise<ClientResponseDto> {
    const client = await this.persistence.tb_client.findUnique({ where: { uuid } });
    if (!client) throw new NotFoundException('Client not found');

    const updated = await this.persistence.tb_client.update({
      where: { uuid },
      data: { client_status_id: 2 }, // Assuming 2 is inactive status
      include: {
        tb_client_type: true,
        tb_client_status: true,
        tb_client_individual: {
          include: {
            tb_user: true,
          },
        },
        tb_client_company: {
          include: {
            tb_company_size: true,
          },
        },
      },
    });

    return plainToInstance(ClientResponseDto, updated, { excludeExtraneousValues: true });
  }
} 
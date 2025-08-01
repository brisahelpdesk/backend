import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { ClientRepository } from './client.repository';

@Module({
  imports: [PersistenceModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService], // Export the service so other modules can use it
})
export class ClientModule {} 
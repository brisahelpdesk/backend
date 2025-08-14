import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { OfferingController } from './offering.controller';
import { OfferingService } from './offering.service';
import { OfferingRepository } from './offering.repository';
import { OfferingTypeRepository } from './offering-type/offering-type.repository';

@Module({
    imports: [PersistenceModule],
    controllers: [OfferingController],
    providers: [OfferingService, OfferingRepository, OfferingTypeRepository],
})
export class OfferingModule {} 
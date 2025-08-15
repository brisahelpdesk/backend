import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { OfferingController } from './offering.controller';
import { OfferingService } from './offering.service';
import { OfferingRepository } from './offering.repository';
import { OfferingCategoryRepository } from './offering-category/offering-category.repository';
import { OfferingCategoryController } from './offering-category/offering-category.controller';
import { OfferingCategoryService } from './offering-category/offering-category.service';

@Module({
    imports: [PersistenceModule],
    controllers: [OfferingController, OfferingCategoryController],
    providers: [OfferingService, OfferingRepository, OfferingCategoryRepository, OfferingCategoryService],
})
export class OfferingModule {} 
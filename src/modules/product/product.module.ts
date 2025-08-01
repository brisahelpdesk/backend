import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { ProductRepository } from './product.repository';

@Module({
    imports: [PersistenceModule],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})
export class ProductModule {}

import { ProductEntity } from './product.entity';
import { tb_catalog_item } from 'src/generated/prisma/index';

export class ProductPrismaMapper {
    static toDomain(raw: tb_catalog_item): ProductEntity {
        return new ProductEntity(
            raw.uuid,
            Number(raw.catalog_item_type_id),
            raw.internal_code ?? '',
            raw.name,
            raw.is_physical,
            raw.is_active,
            raw.created_at,
            raw.updated_at,
            raw.description ?? '',
        );
   }
}
import { tb_offering_category } from 'src/generated/prisma/index';
import { OfferingCategory } from './offering-category.entity';
import { OfferingCategoryResponseDto } from './dto/offering-category-response.dto';

export class OfferingCategoryPrismaMapper {
    static toDomain(raw: tb_offering_category): OfferingCategory {
        return new OfferingCategory(
            raw.uuid,
            raw.name,
            raw.created_at,
            raw.updated_at,
            raw.description ?? undefined,
        );
    }

    static toResponseDto(entity: OfferingCategory): OfferingCategoryResponseDto {
        return {
            uuid: entity.uuid,
            name: entity.name,
            description: entity.description,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
        };
    }
} 
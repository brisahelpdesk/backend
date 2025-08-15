import { tb_offering, tb_offering_category } from 'src/generated/prisma/index';
import { Offering } from './offering.entity';
import { OfferingCategory } from './offering-category/offering-category.entity';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { OfferingResponseDto } from './dto/offering-response.dto';

export class OfferingPrismaMapper {
    static toDomain(raw: tb_offering & { tb_offering_category: tb_offering_category }): Offering {
        const category = new OfferingCategory(
            raw.tb_offering_category.uuid,
            raw.tb_offering_category.name,
            raw.tb_offering_category.created_at,
            raw.tb_offering_category.updated_at,
            raw.tb_offering_category.description ?? undefined,
        );

        return new Offering(
            raw.uuid,
            category,
            raw.internal_code ?? '',
            raw.name,
            raw.is_physical,
            raw.is_active,
            raw.created_at,
            raw.updated_at,
            raw.description ?? undefined,
        );
    }

    static toResponseDto(entity: Offering): OfferingResponseDto {
        return {
            uuid: entity.uuid,
            offering_category_uuid: entity.category.uuid,
            offering_category_name: entity.category.name,
            internal_code: entity.internalCode,
            name: entity.name,
            is_physical: entity.isPhysical,
            is_active: entity.isActive,
            description: entity.description,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
        };
    }

    static createDtoToDomain(dto: CreateOfferingDto, categoryEntity: OfferingCategory): Offering {
        return new Offering(
            '',
            categoryEntity,
            dto.internal_code ?? '',
            dto.name,
            dto.is_physical,
            dto.is_active ?? true,
            new Date(),
            new Date(),
            dto.description,
        );
    };
}
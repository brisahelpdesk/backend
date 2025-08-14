import { tb_offering, tb_offering_type } from 'src/generated/prisma/index';
import { Offering } from './offering.entity';
import { OfferingType } from './offering-type/offering-type.entity';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { OfferingResponseDto } from './dto/offering-response.dto';

export class OfferingPrismaMapper {
    static toDomain(raw: tb_offering & { tb_offering_type: tb_offering_type }): Offering {
        const type = new OfferingType(
            raw.tb_offering_type.uuid,
            raw.tb_offering_type.name,
            raw.tb_offering_type.created_at,
            raw.tb_offering_type.updated_at,
            raw.tb_offering_type.description ?? undefined,
        );

        return new Offering(
            raw.uuid,
            type,
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
            offering_type_uuid: entity.type.uuid,
            offering_type_name: entity.type.name,
            internal_code: entity.internalCode,
            name: entity.name,
            is_physical: entity.isPhysical,
            is_active: entity.isActive,
            description: entity.description,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
        };
    }

    static createDtoToDomain(dto: CreateOfferingDto, typeEntity: OfferingType): Offering {
        return new Offering(
            '',
            typeEntity,
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
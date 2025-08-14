import { tb_offering_type } from 'src/generated/prisma/index';
import { OfferingType } from './offering-type.entity';

export class OfferingTypePrismaMapper {
    static toDomain(raw: tb_offering_type): OfferingType {
        return new OfferingType(
            raw.uuid,
            raw.name,
            raw.created_at,
            raw.updated_at,
            raw.description ?? undefined,
        );
    }
} 
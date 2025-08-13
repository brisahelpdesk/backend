import { tb_offering, tb_offering_type } from 'src/generated/prisma/index';
import { Offering } from './offering.entity';
import { OfferingType } from './offering-type/offering-type.entity';

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
}
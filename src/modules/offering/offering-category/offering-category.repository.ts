import { Injectable } from '@nestjs/common';
import { PersistenceService } from '../../persistence/persistence.service';
import { IBaseRepository } from '../../../interfaces/base-repository.interface';
import { OfferingCategory } from './offering-category.entity';
import { OfferingCategoryPrismaMapper } from './offering-category.mapper';

@Injectable()
export class OfferingCategoryRepository implements IBaseRepository<OfferingCategory> {
    constructor(private readonly persistence: PersistenceService) {}

    async create(data: OfferingCategory): Promise<OfferingCategory> {
        const created = await this.persistence.tb_offering_category.create({
            data: {
                name: data.name,
                description: data.description,
                created_at: data.createdAt,
                updated_at: data.updatedAt,
            },
        });

        return OfferingCategoryPrismaMapper.toDomain(created);
    }

    async findAll(): Promise<OfferingCategory[]> {
        const rows = await this.persistence.tb_offering_category.findMany({
            orderBy: { created_at: 'desc' },
        });
        return rows.map(OfferingCategoryPrismaMapper.toDomain);
    }

    async findByUUID(uuid: string): Promise<OfferingCategory | null> {
        const row = await this.persistence.tb_offering_category.findUnique({
            where: { uuid },
        });
        return row ? OfferingCategoryPrismaMapper.toDomain(row) : null;
    }

    async update(uuid: string, data: Partial<OfferingCategory>): Promise<OfferingCategory> {
        const updated = await this.persistence.tb_offering_category.update({
            where: { uuid },
            data: {
                name: data.name,
                description: data.description,
                updated_at: data.updatedAt ?? new Date(),
            },
        });
        return OfferingCategoryPrismaMapper.toDomain(updated);
    }

    async delete(uuid: string): Promise<OfferingCategory> {
        const deleted = await this.persistence.tb_offering_category.delete({
            where: { uuid },
        });
        return OfferingCategoryPrismaMapper.toDomain(deleted);
    }
} 
import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferingRepository } from './offering.repository';
import { OfferingCategoryRepository } from './offering-category/offering-category.repository';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { UpdateOfferingDto } from './dto/update-offering.dto';
import { OfferingResponseDto } from './dto/offering-response.dto';
import { Offering } from './offering.entity';
import { OfferingCategory } from './offering-category/offering-category.entity';
import { OfferingPrismaMapper } from './offering.mapper';
import { ListOfferingsQueryDto } from './dto/list-offerings.query.dto';

@Injectable()
export class OfferingService {
    constructor(
        private readonly offeringRepository: OfferingRepository,
        private readonly offeringCategoryRepository: OfferingCategoryRepository,
    ) {}

    async create(data: CreateOfferingDto): Promise<OfferingResponseDto> {
        const category = await this.offeringCategoryRepository.findByUUID(
            data.offering_category_uuid,
        );
        if (!category) {
            throw new NotFoundException('Offering category not found');
        }

        const entity = OfferingPrismaMapper.createDtoToDomain(data, category);

        const created = await this.offeringRepository.create(entity);
        return OfferingPrismaMapper.toResponseDto(created);
    }

    async findAll(query?: ListOfferingsQueryDto): Promise<OfferingResponseDto[]> {
        const filters = {
            name: query?.name,
            isActive:
                query?.is_active !== undefined
                    ? query.is_active === 'true'
                    : undefined,
            isPhysical:
                query?.is_physical !== undefined
                    ? query.is_physical === 'true'
                    : undefined,
        } as {
            name?: string;
            isActive?: boolean;
            isPhysical?: boolean;
        };

        const rows = await this.offeringRepository.findAllFiltered(filters);
        return rows.map((offering) => OfferingPrismaMapper.toResponseDto(offering));
    }

    async findOne(uuid: string): Promise<OfferingResponseDto> {
        const row = await this.offeringRepository.findByUUID(uuid);
        if (!row) {
            throw new NotFoundException('Offering not found');
        }
        return OfferingPrismaMapper.toResponseDto(row);
    }

    async update(uuid: string, data: UpdateOfferingDto): Promise<OfferingResponseDto> {
        let category: OfferingCategory | undefined = undefined;
        if (data.offering_category_uuid) {
            const foundCategory = await this.offeringCategoryRepository.findByUUID(
                data.offering_category_uuid,
            );
            if (!foundCategory) {
                throw new NotFoundException('Offering category not found');
            }
            category = new OfferingCategory(
                foundCategory.uuid,
                foundCategory.name,
                foundCategory.createdAt,
                foundCategory.updatedAt,
                foundCategory.description,
            );
        }

        const updated = await this.offeringRepository.update(uuid, {
            category,
            internalCode: data.internal_code,
            name: data.name,
            isPhysical: data.is_physical,
            isActive: data.is_active,
            description: data.description,
            updatedAt: new Date(),
        } as Partial<Offering>);

        return OfferingPrismaMapper.toResponseDto(updated);
    }

    async delete(uuid: string): Promise<void> {
        await this.offeringRepository.delete(uuid);
    }
} 
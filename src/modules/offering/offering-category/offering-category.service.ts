import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferingCategoryRepository } from './offering-category.repository';
import { CreateOfferingCategoryDto } from './dto/create-offering-category.dto';
import { UpdateOfferingCategoryDto } from './dto/update-offering-category.dto';
import { OfferingCategoryResponseDto } from './dto/offering-category-response.dto';
import { OfferingCategory } from './offering-category.entity';
import { OfferingCategoryPrismaMapper } from './offering-category.mapper';

@Injectable()
export class OfferingCategoryService {
    constructor(
        private readonly offeringCategoryRepository: OfferingCategoryRepository,
    ) {}

    async create(data: CreateOfferingCategoryDto): Promise<OfferingCategoryResponseDto> {
        const entity = new OfferingCategory(
            '',
            data.name,
            new Date(),
            new Date(),
            data.description,
        );

        const created = await this.offeringCategoryRepository.create(entity);
        return OfferingCategoryPrismaMapper.toResponseDto(created);
    }

    async findAll(): Promise<OfferingCategoryResponseDto[]> {
        const rows = await this.offeringCategoryRepository.findAll();
        return rows.map((category) => OfferingCategoryPrismaMapper.toResponseDto(category));
    }

    async findOne(uuid: string): Promise<OfferingCategoryResponseDto> {
        const row = await this.offeringCategoryRepository.findByUUID(uuid);
        if (!row) {
            throw new NotFoundException('Offering category not found');
        }
        return OfferingCategoryPrismaMapper.toResponseDto(row);
    }

    async update(uuid: string, data: UpdateOfferingCategoryDto): Promise<OfferingCategoryResponseDto> {
        const updated = await this.offeringCategoryRepository.update(uuid, {
            name: data.name,
            description: data.description,
            updatedAt: new Date(),
        } as Partial<OfferingCategory>);

        return OfferingCategoryPrismaMapper.toResponseDto(updated);
    }

    async delete(uuid: string): Promise<void> {
        await this.offeringCategoryRepository.delete(uuid);
    }
} 
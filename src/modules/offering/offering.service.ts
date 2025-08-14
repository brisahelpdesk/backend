import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferingRepository } from './offering.repository';
import { OfferingTypeRepository } from './offering-type/offering-type.repository';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { UpdateOfferingDto } from './dto/update-offering.dto';
import { OfferingResponseDto } from './dto/offering-response.dto';
import { Offering } from './offering.entity';
import { OfferingType } from './offering-type/offering-type.entity';
import { OfferingPrismaMapper } from './offering.mapper';
import { ListOfferingsQueryDto } from './dto/list-offerings.query.dto';

@Injectable()
export class OfferingService {
    constructor(
        private readonly offeringRepository: OfferingRepository,
        private readonly offeringTypeRepository: OfferingTypeRepository,
    ) {}

    async create(data: CreateOfferingDto): Promise<OfferingResponseDto> {
        const type = await this.offeringTypeRepository.findByUUID(
            data.offering_type_uuid,
        );
        if (!type) {
            throw new NotFoundException('Offering type not found');
        }

        const entity = OfferingPrismaMapper.createDtoToDomain(data, type);

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
        let type: OfferingType | undefined = undefined;
        if (data.offering_type_uuid) {
            const foundType = await this.offeringTypeRepository.findByUUID(
                data.offering_type_uuid,
            );
            if (!foundType) {
                throw new NotFoundException('Offering type not found');
            }
            type = new OfferingType(
                foundType.uuid,
                foundType.name,
                foundType.created_at,
                foundType.updated_at,
                foundType.description,
            );
        }

        const updated = await this.offeringRepository.update(uuid, {
            type,
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
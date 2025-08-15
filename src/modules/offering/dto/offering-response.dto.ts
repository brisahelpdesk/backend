import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OfferingResponseDto {
    @ApiProperty({ description: 'Offering UUID' })
    @Expose()
    uuid: string;

    @ApiProperty({ description: 'Offering category UUID' })
    @Expose()
    offering_category_uuid: string;

    @ApiProperty({ description: 'Category of the offering' })
    @Expose()
    offering_category_name: string;

    @ApiProperty({ description: 'Internal code for the offering', required: false })
    @Expose()
    internal_code?: string;

    @ApiProperty({ description: 'Offering name' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Is this offering physical?' })
    @Expose()
    is_physical: boolean;

    @ApiProperty({ description: 'Whether the offering is active' })
    @Expose()
    is_active: boolean;

    @ApiProperty({ description: 'Offering description', required: false })
    @Expose()
    description?: string;

    @ApiProperty({ description: 'Creation date' })
    @Expose()
    created_at: Date;

    @ApiProperty({ description: 'Last update date' })
    @Expose()
    updated_at: Date;
} 
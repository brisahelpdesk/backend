import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OfferingTypeResponseDto {
    @ApiProperty({ description: 'Offering type UUID' })
    @Expose()
    uuid: string;

    @ApiProperty({ description: 'Offering type name' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Offering type description', required: false })
    @Expose()
    description?: string;

    @ApiProperty({ description: 'Creation date' })
    @Expose()
    created_at: Date;

    @ApiProperty({ description: 'Last update date' })
    @Expose()
    updated_at: Date;
} 
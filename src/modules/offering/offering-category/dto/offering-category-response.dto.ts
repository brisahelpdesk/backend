import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OfferingCategoryResponseDto {
    @ApiProperty({ description: 'Offering category UUID' })
    @Expose()
    uuid: string;

    @ApiProperty({ description: 'Offering category name' })
    @Expose()
    name: string;

    @ApiPropertyOptional({ description: 'Offering category description' })
    @Expose()
    description?: string;

    @ApiProperty({ description: 'Creation date' })
    @Expose()
    created_at: Date;

    @ApiProperty({ description: 'Last update date' })
    @Expose()
    updated_at: Date;
} 
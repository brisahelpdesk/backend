import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferingCategoryDto {
    @ApiProperty({ description: 'Offering category name' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: 'Offering category description' })
    @IsOptional()
    @IsString()
    description?: string;
} 
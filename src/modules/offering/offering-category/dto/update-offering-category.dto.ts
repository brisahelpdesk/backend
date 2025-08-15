import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfferingCategoryDto {
    @ApiPropertyOptional({ description: 'Offering category name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Offering category description' })
    @IsOptional()
    @IsString()
    description?: string;
} 
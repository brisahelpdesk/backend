import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfferingTypeDto {
    @ApiPropertyOptional({ description: 'Offering type name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Offering type description' })
    @IsOptional()
    @IsString()
    description?: string;
} 
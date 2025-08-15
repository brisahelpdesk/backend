import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfferingDto {
    @ApiPropertyOptional({ description: 'Offering category UUID' })
    @IsOptional()
    @IsUUID()
    offering_category_uuid?: string;

    @ApiPropertyOptional({ description: 'Internal code for the offering' })
    @IsOptional()
    @IsString()
    internal_code?: string;

    @ApiPropertyOptional({ description: 'Offering name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Whether the offering is active' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({ description: 'Offering description' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Is this offering physical?' })
    @IsOptional()
    @IsBoolean()
    is_physical?: boolean;
} 
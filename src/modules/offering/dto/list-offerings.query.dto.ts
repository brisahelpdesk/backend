import { IsOptional, IsString, IsBooleanString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListOfferingsQueryDto {
    @ApiPropertyOptional({ description: 'Filter by offering name (case-insensitive substring match)' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Filter by active status (true/false)' })
    @IsOptional()
    @IsBooleanString()
    is_active?: string;

    @ApiPropertyOptional({ description: 'Filter by physical type (true/false)' })
    @IsOptional()
    @IsBooleanString()
    is_physical?: string;
} 
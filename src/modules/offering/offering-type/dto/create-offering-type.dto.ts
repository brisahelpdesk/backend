import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferingTypeDto {
    @ApiProperty({ description: 'Offering type name' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: 'Offering type description' })
    @IsOptional()
    @IsString()
    description?: string;
} 
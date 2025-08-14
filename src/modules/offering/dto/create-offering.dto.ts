import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferingDto {
    @ApiProperty({ description: 'Offering type UUID' })
    @IsUUID()
    offering_type_uuid: string;

    @ApiPropertyOptional({ description: 'Internal code for the offering' })
    @IsOptional()
    @IsString()
    internal_code?: string;

    @ApiProperty({ description: 'Offering name' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Is this offering physical?' })
    @IsBoolean()
    is_physical: boolean;

    @ApiPropertyOptional({ description: 'Whether the offering is active' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({ description: 'Offering description' })
    @IsOptional()
    @IsString()
    description?: string;

}

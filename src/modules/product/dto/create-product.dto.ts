import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Catalog item type ID' })
  @IsNumber()
  catalog_item_type_id: number;

  @ApiPropertyOptional({ description: 'Internal code for the catalog item' })
  @IsOptional()
  @IsString()
  internal_code?: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Whether the product is active' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Is this a physical product?' })
  @IsBoolean()
  is_physical_product: boolean;
} 
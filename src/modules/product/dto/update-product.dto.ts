import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Catalog item type ID' })
  @IsOptional()
  @IsNumber()
  catalog_item_type_id?: number;

  @ApiPropertyOptional({ description: 'Internal code for the catalog item' })
  @IsOptional()
  @IsString()
  internal_code?: string;

  @ApiPropertyOptional({ description: 'Product name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Whether the product is active' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Is this a physical product?' })
  @IsOptional()
  @IsBoolean()
  is_physical_product?: boolean;
} 
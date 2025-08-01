import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
    // tb_product fields
    @ApiProperty({ description: 'Product UUID' })
    @Expose()
    uuid: string;

    @ApiProperty({ description: 'Is this a physical product?' })
    @Expose()
    is_physical_product: boolean;

    // tb_catalog_item fields
    @ApiProperty({ description: 'Catalog item UUID' })
    @Expose()
    catalog_item_uuid: string;

    @ApiProperty({ description: 'Catalog item type ID' })
    @Expose()
    catalog_item_type_id: number;

    @ApiProperty({
        description: 'Internal code for the catalog item',
        required: false,
    })
    @Expose()
    internal_code?: string;

    @ApiProperty({ description: 'Product name' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Whether the product is active' })
    @Expose()
    is_active: boolean;

    @ApiProperty({ description: 'Product description', required: false })
    @Expose()
    description?: string;

    @ApiProperty({ description: 'Catalog item creation date' })
    @Expose()
    created_at: Date;

    @ApiProperty({ description: 'Catalog item last update date' })
    @Expose()
    updated_at: Date;
}

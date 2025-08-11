import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductRepository {
    constructor(private readonly persistence: PersistenceService) {}

    async create(data: CreateProductDto): Promise<ProductResponseDto> {
        const product = await this.persistence.$transaction(async (prisma) => {
            const catalogItem = await prisma.tb_catalog_item.create({
                data: {
                    catalog_item_type_id: data.catalog_item_type_id,
                    internal_code: data.internal_code,
                    name: data.name,
                    is_active: data.is_active ?? true,
                    description: data.description,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });
            return await prisma.tb_product.create({
                data: {
                    catalog_item_id: catalogItem.id,
                    is_physical_product: data.is_physical_product,
                },
                include: { tb_catalog_item: true },
            });
        });
        return plainToInstance(ProductResponseDto, product, {
            excludeExtraneousValues: true,
        });
    }

    async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.persistence.tb_product.findMany({
            include: { tb_catalog_item: true },
        });
        return products.map((p) =>
            plainToInstance(ProductResponseDto, p, {
                excludeExtraneousValues: true,
            }),
        );
    }

    async findOne(uuid: string): Promise<ProductResponseDto> {
        const product = await this.persistence.tb_product.findUnique({
            where: { uuid },
            include: { tb_catalog_item: true },
        });
        if (!product) throw new NotFoundException('ProductEntity not found');
        return plainToInstance(ProductResponseDto, product, {
            excludeExtraneousValues: true,
        });
    }

    async update(
        uuid: string,
        data: UpdateProductDto,
    ): Promise<ProductResponseDto> {
        const product = await this.persistence.tb_product.findUnique({
            where: { uuid },
        });
        if (!product) throw new NotFoundException('ProductEntity not found');
        const updated = await this.persistence.tb_product.update({
            where: { uuid },
            data: {
                is_physical_product: data.is_physical_product,
                tb_catalog_item:
                    data.name ||
                    data.description ||
                    data.is_active !== undefined ||
                    data.catalog_item_type_id ||
                    data.internal_code
                        ? {
                              update: {
                                  ...(data.name && { name: data.name }),
                                  ...(data.description && {
                                      description: data.description,
                                  }),
                                  ...(data.is_active !== undefined && {
                                      is_active: data.is_active,
                                  }),
                                  ...(data.catalog_item_type_id && {
                                      catalog_item_type_id:
                                          data.catalog_item_type_id,
                                  }),
                                  ...(data.internal_code && {
                                      internal_code: data.internal_code,
                                  }),
                              },
                          }
                        : undefined,
            },
            include: { tb_catalog_item: true },
        });
        return plainToInstance(ProductResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async delete(uuid: string): Promise<void> {
        try {
            await this.persistence.tb_product.delete({ where: { uuid } });
        } catch (e) {
            throw new NotFoundException('ProductEntity not found');
        }
    }
}

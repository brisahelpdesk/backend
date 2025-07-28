import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Creates a new product and its respective catalog item.
   * @param data Data for product creation
   * @returns The created product
   */
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product successfully created', type: ProductResponseDto })
  async create(@Body() data: CreateProductDto): Promise<ProductResponseDto> {
    return this.productService.create(data);
  }

  /**
   * Lists all registered products.
   * @returns List of products
   */
  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [ProductResponseDto] })
  async findAll(): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  /**
   * Retrieves a product by its UUID.
   * @param id Product UUID
   * @returns The found product
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by UUID' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }

  /**
   * Updates an existing product.
   * @param id Product UUID
   * @param data Data for update
   * @returns The updated product
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(@Param('id') id: string, @Body() data: UpdateProductDto): Promise<ProductResponseDto> {
    return this.productService.update(id, data);
  }

  /**
   * Removes a product by its UUID.
   * @param id Product UUID
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a product by UUID' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @ApiResponse({ status: 204, description: 'Product successfully removed' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
} 
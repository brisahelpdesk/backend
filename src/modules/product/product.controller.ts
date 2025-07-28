import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: any) {
    return this.productService.create(data);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
} 
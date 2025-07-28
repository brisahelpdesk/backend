import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: any): Promise<any> {
    return this.productRepository.create(data);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<any> {
    return this.productRepository.findOne(id);
  }

  async update(id: string, data: any): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return this.productRepository.delete(id);
  }
} 
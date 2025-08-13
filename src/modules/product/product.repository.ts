import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable()
export class ProductRepository {
    constructor(private readonly persistence: PersistenceService) {}

}

import { OfferingCategory } from './offering-category/offering-category.entity';

export class Offering {
    constructor(
        public uuid: string,
        public category: OfferingCategory,
        public internalCode: string,
        public name: string,
        public isPhysical: boolean,
        public isActive: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public description?: string,
    ) {}
}
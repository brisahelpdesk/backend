export class OfferingCategory {
    constructor(
        public uuid: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public description?: string,
    ) {}
} 
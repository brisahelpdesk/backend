export class ProductEntity {
    constructor(
        public uuid: string,
        public type: number,
        public internalCode: string,
        public name: string,
        public isPhysical: boolean,
        public isActive: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public description?: string,
    ) {}
}

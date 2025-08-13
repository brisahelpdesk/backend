import { OfferingType } from './offering-type/offering-type.entity';

export class Offering {
    constructor(
        public uuid: string,
        public type: OfferingType,
        public internalCode: string,
        public name: string,
        public isPhysical: boolean,
        public isActive: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public description?: string,
    ) {}
}
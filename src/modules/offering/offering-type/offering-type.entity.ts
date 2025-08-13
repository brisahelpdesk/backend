export class OfferingType {
    constructor(
        public uuid: string,
        public name: string,
        public created_at: Date,
        public updated_at: Date,
        public description?: string,
    ) {}
}
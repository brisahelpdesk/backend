import { User } from '../user.entity';

export class Employee {
    constructor(
        public uuid: string,
        public user: User,
        public firstName: string,
        public lastName: string,
        public cpf: string,
        public email: string,
        public createdAt: Date,
        public updatedAt: Date,
        public internalCode?: string,
    ) {}
} 
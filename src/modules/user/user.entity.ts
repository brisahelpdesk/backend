export class User {
    constructor(
        public uuid: string,
        public username: string,
        public passwordHash: string,
        public isPasswordChanged: boolean,
        public isActive: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
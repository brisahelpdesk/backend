import { Injectable } from '@nestjs/common';
import { User } from '@prisma-generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(user: User): Promise<User> {
        return this.prismaService.user.create({ data: user });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prismaService.user.findUnique({ where: { email } });
    }
}

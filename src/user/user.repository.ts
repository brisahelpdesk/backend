import { Injectable } from "@nestjs/common";
import { User } from "@prisma-generated/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.prismaService.user.findUnique(
            {where: {email}
        });
    }
}
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppModule } from "../app/app.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [AppModule, PrismaModule],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserRepository]
})
export class UserModule {}

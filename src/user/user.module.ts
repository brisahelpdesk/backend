import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserRepository],
})
export class UserModule {}

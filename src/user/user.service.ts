import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma-generated/client';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
}

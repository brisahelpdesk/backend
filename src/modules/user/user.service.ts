import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(data: CreateUserDto): Promise<UserResponseDto> {
        return this.userRepository.create(data);
    }

    async findAll(): Promise<UserResponseDto[]> {
        return this.userRepository.findAll();
    }

    async findOne(uuid: string): Promise<UserResponseDto> {
        return this.userRepository.findOne(uuid);
    }

    async findByEmail(email: string): Promise<UserResponseDto | null> {
        return this.userRepository.findByEmail(email);
    }

    async update(uuid: string, data: UpdateUserDto): Promise<UserResponseDto> {
        return this.userRepository.update(uuid, data);
    }

    async delete(uuid: string): Promise<void> {
        return this.userRepository.delete(uuid);
    }

    async activateUser(uuid: string): Promise<UserResponseDto> {
        return this.userRepository.activateUser(uuid);
    }

    async deactivateUser(uuid: string): Promise<UserResponseDto> {
        return this.userRepository.deactivateUser(uuid);
    }

    async verifyEmail(uuid: string): Promise<UserResponseDto> {
        return this.userRepository.verifyEmail(uuid);
    }

    async changePassword(
        uuid: string,
        newPassword: string,
    ): Promise<UserResponseDto> {
        return this.userRepository.changePassword(uuid, newPassword);
    }
}

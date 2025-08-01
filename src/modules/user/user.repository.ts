import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { tb_user } from 'src/generated/prisma';

@Injectable()
export class UserRepository {
    constructor(private readonly persistence: PersistenceService) {}

    async create(data: CreateUserDto): Promise<UserResponseDto> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.persistence.tb_user.create({
            data: {
                email: data.email,
                user_type_id: data.user_type_id,
                security_question_id: data.security_question_id,
                security_answer: data.security_answer
                    ? await bcrypt.hash(data.security_answer, 10)
                    : null,
                password: hashedPassword,
                is_active: data.is_active ?? false,
                is_email_verified: data.is_email_verified ?? false,
                is_password_changed: data.is_password_changed ?? false,
                is_temp_pwd_active: data.is_temp_pwd_active ?? true,
            },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.persistence.tb_user.findMany({
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return users.map((user) =>
            plainToInstance(UserResponseDto, user, {
                excludeExtraneousValues: true,
            }),
        );
    }

    async findOne(uuid: string): Promise<UserResponseDto> {
        const user = await this.persistence.tb_user.findUnique({
            where: { uuid },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        if (!user) throw new NotFoundException('User not found');

        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async findByEmail(email: string): Promise<tb_user | null> {
        const user = await this.persistence.tb_user.findUnique({
            where: { email },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        if (!user) return null;

        return user;
    }

    async update(uuid: string, data: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.persistence.tb_user.findUnique({
            where: { uuid },
        });
        if (!user) throw new NotFoundException('User not found');

        const updateData: any = {};

        if (data.email) updateData.email = data.email;
        if (data.user_type_id) updateData.user_type_id = data.user_type_id;
        if (data.security_question_id)
            updateData.security_question_id = data.security_question_id;
        if (data.security_answer)
            updateData.security_answer = await bcrypt.hash(
                data.security_answer,
                10,
            );
        if (data.password)
            updateData.password = await bcrypt.hash(data.password, 10);
        if (data.is_active !== undefined) updateData.is_active = data.is_active;
        if (data.is_email_verified !== undefined)
            updateData.is_email_verified = data.is_email_verified;
        if (data.is_password_changed !== undefined)
            updateData.is_password_changed = data.is_password_changed;
        if (data.is_temp_pwd_active !== undefined)
            updateData.is_temp_pwd_active = data.is_temp_pwd_active;

        const updated = await this.persistence.tb_user.update({
            where: { uuid },
            data: updateData,
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return plainToInstance(UserResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async delete(uuid: string): Promise<void> {
        try {
            await this.persistence.tb_user.delete({ where: { uuid } });
        } catch (e) {
            throw new NotFoundException('User not found');
        }
    }

    async activateUser(uuid: string): Promise<UserResponseDto> {
        const user = await this.persistence.tb_user.findUnique({
            where: { uuid },
        });
        if (!user) throw new NotFoundException('User not found');

        const updated = await this.persistence.tb_user.update({
            where: { uuid },
            data: { is_active: true },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return plainToInstance(UserResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async deactivateUser(uuid: string): Promise<UserResponseDto> {
        const user = await this.persistence.tb_user.findUnique({
            where: { uuid },
        });
        if (!user) throw new NotFoundException('User not found');

        const updated = await this.persistence.tb_user.update({
            where: { uuid },
            data: { is_active: false },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return plainToInstance(UserResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async verifyEmail(uuid: string): Promise<UserResponseDto> {
        const user = await this.persistence.tb_user.findUnique({
            where: { uuid },
        });
        if (!user) throw new NotFoundException('User not found');

        const updated = await this.persistence.tb_user.update({
            where: { uuid },
            data: { is_email_verified: true },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return plainToInstance(UserResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async changePassword(
        uuid: string,
        newPassword: string,
    ): Promise<UserResponseDto> {
        const user = await this.persistence.tb_user.findUnique({
            where: { uuid },
        });
        if (!user) throw new NotFoundException('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updated = await this.persistence.tb_user.update({
            where: { uuid },
            data: {
                password: hashedPassword,
                is_password_changed: true,
                is_temp_pwd_active: false,
            },
            include: {
                tb_user_type: true,
                tb_security_question: true,
            },
        });

        return plainToInstance(UserResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }
}

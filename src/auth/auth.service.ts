import { Injectable } from '@nestjs/common';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { UserRepository } from '../user/user.repository';
import { User } from '@prisma-generated/client';
import { InvalidCredentialsException } from './exception/invalid-credentials.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async login(userLoginDto: UserLoginDto) {
        const { username, password } = userLoginDto;
        const user: User = await this.validateUsername(username);
        if(await this.validatePassword(password, user.password)) {
            //generate JWT
            return "JWT"
        }
        throw new InvalidCredentialsException();
    }

    private async validateUsername(username: string): Promise<User> {
        const user: User | null = await this.userRepository.findByEmail(username);
        if (!user) {
            throw new InvalidCredentialsException();
        }
        return user;
    }

    private async validatePassword(plainPassword: string, hashCodedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashCodedPassword);
    }
}

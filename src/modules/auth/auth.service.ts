import { Injectable } from '@nestjs/common';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { UserRepository } from '../user/user.repository';
import { User } from '@prisma-generated/client';
import { InvalidCredentialsException } from './exception/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../common/hash/hash.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
    ) {}

    async login(userLoginDto: UserLoginDto): Promise<string> {
        const { username, password } = userLoginDto;
        const user: User = await this.validateUsername(username);
        if (await this.validatePassword(password, user.password)) {
            return this.generateJwt(user);
        }
        throw new InvalidCredentialsException();
    }

    private async validateUsername(username: string): Promise<User> {
        const user: User | null =
            await this.userRepository.findByEmail(username);
        if (!user) {
            throw new InvalidCredentialsException();
        }
        return user;
    }

    private async validatePassword(
        plainPassword: string,
        hashCodedPassword: string,
    ): Promise<boolean> {
        return this.hashService.compare(plainPassword, hashCodedPassword);
    }

    private async generateJwt(user: User): Promise<string> {
        const payload = {
            email: user.email,
            roles: [],
        };
        return this.jwtService.signAsync(payload, { subject: user.uuid });
    }
}

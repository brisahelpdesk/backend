import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashModule } from '../common/hash/hash.module';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    privateKey: configService.get<string>('JWT_PRIVATE_KEY'),
                    publicKey: configService.get<string>('JWT_PUBLIC_KEY'),
                    signOptions: {
                        algorithm: 'RS256',
                        issuer: 'brisa-helpdesk-be',
                        expiresIn: '1d',
                    },
                };
            },
        }),
        HashModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}

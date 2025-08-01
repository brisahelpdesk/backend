import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule], // Import UserModule to use UserService
    providers: [AuthService],
    exports: [AuthService], // Export AuthService so other modules can use it
})
export class AuthModule {}

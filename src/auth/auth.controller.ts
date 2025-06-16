import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signIn')
    login(@Body() userLoginDto: UserLoginDto) {
      return this.authService.login(userLoginDto);
    }
}

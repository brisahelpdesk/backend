import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  /**
   * User login endpoint
   */
  @Post('signIn')
    async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
      return this.authService.login(userLoginDto);
    }
}

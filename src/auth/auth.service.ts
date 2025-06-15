import { Injectable } from '@nestjs/common';
import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class AuthService {

    login(userLoginDto: UserLoginDto) {
        //find user by email or else throw invalid credentials exception
        //validate password or else throw invalid credentials exception
        //generate token and return it
    }

    
}

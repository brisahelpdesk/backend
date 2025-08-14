// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { UserRepository } from '../user/user.repository';
// import * as bcrypt from 'bcrypt';
// import { tb_user } from 'src/generated/prisma';
//
// @Injectable()
// export class AuthService {
//     constructor(
//         private readonly userService: UserService,
//         private readonly userRepository: UserRepository,
//     ) {}
//
//     async validateUser(email: string, password: string): Promise<tb_user> {
//         const user = await this.userRepository.findByEmail(email);
//
//         if (!user) {
//             throw new UnauthorizedException('Invalid credentials');
//         }
//
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//
//         if (!isPasswordValid) {
//             throw new UnauthorizedException('Invalid credentials');
//         }
//
//         if (!user.is_active) {
//             throw new UnauthorizedException('User account is not active');
//         }
//
//         return user;
//     }
//
//     async createUser(userData: any): Promise<any> {
//         return this.userService.create(userData);
//     }
//
//     async getUserById(uuid: string): Promise<any> {
//         return this.userService.findOne(uuid);
//     }
//
//     async updateUser(uuid: string, userData: any): Promise<any> {
//         return this.userService.update(uuid, userData);
//     }
//
//     async activateUser(uuid: string): Promise<any> {
//         return this.userService.activateUser(uuid);
//     }
//
//     async deactivateUser(uuid: string): Promise<any> {
//         return this.userService.deactivateUser(uuid);
//     }
//
//     async verifyUserEmail(uuid: string): Promise<any> {
//         return this.userService.verifyEmail(uuid);
//     }
//
//     async changeUserPassword(uuid: string, newPassword: string): Promise<any> {
//         return this.userService.changePassword(uuid, newPassword);
//     }
// }

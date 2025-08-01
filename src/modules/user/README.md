# User Module

This module provides CRUD operations for user management. It's designed to be used as a service-only module that can be imported by other modules.

## Features

- Complete CRUD operations for users
- Password hashing with bcrypt
- User activation/deactivation
- Email verification
- Password change functionality
- Security question handling

## Usage in Other Modules

### 1. Import the UserModule

```typescript
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  // ... other module configuration
})
export class YourModule {}
```

### 2. Inject UserService

```typescript
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class YourService {
  constructor(private readonly userService: UserService) {}

  async someMethod() {
    // Use user service methods
    const user = await this.userService.findOne('user-uuid');
    const users = await this.userService.findAll();
    // ... etc
  }
}
```

## Available Methods

### UserService Methods

- `create(data: CreateUserDto): Promise<UserResponseDto>` - Create a new user
- `findAll(): Promise<UserResponseDto[]>` - Get all users
- `findOne(uuid: string): Promise<UserResponseDto>` - Get user by UUID
- `findByEmail(email: string): Promise<UserResponseDto | null>` - Get user by email
- `update(uuid: string, data: UpdateUserDto): Promise<UserResponseDto>` - Update user
- `delete(uuid: string): Promise<void>` - Delete user
- `activateUser(uuid: string): Promise<UserResponseDto>` - Activate user account
- `deactivateUser(uuid: string): Promise<UserResponseDto>` - Deactivate user account
- `verifyEmail(uuid: string): Promise<UserResponseDto>` - Mark email as verified
- `changePassword(uuid: string, newPassword: string): Promise<UserResponseDto>` - Change user password

## DTOs

### CreateUserDto
- `email: string` - User email (required)
- `user_type_id: number` - User type ID (required)
- `security_question_id: number` - Security question ID (required)
- `security_answer?: string` - Security question answer (optional)
- `password: string` - User password (required)
- `is_active?: boolean` - Whether user is active (optional, default: false)
- `is_email_verified?: boolean` - Whether email is verified (optional, default: false)
- `is_password_changed?: boolean` - Whether password has been changed (optional, default: false)
- `is_temp_pwd_active?: boolean` - Whether temporary password is active (optional, default: true)

### UpdateUserDto
All fields are optional for partial updates.

### UserResponseDto
Excludes sensitive information like passwords and security answers.

## Security Features

- Passwords are automatically hashed using bcrypt with salt rounds of 10
- Security question answers are also hashed
- Response DTOs exclude sensitive information
- Proper error handling with NotFoundException

## Example Usage

```typescript
// In your service
async createNewUser(userData: CreateUserDto) {
  return this.userService.create(userData);
}

async authenticateUser(email: string, password: string) {
  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('User not found');
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid password');
  }
  
  return user;
}

async activateUserAccount(uuid: string) {
  return this.userService.activateUser(uuid);
}
```

## Dependencies

- `@nestjs/common` - NestJS core functionality
- `bcrypt` - Password hashing
- `class-transformer` - DTO transformation
- `class-validator` - DTO validation
- `@nestjs/swagger` - API documentation 
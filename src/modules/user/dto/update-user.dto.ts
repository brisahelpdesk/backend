import {
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsEmail,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'User email address' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'User type ID' })
    @IsOptional()
    @IsNumber()
    user_type_id?: number;

    @ApiPropertyOptional({ description: 'Security question ID' })
    @IsOptional()
    @IsNumber()
    security_question_id?: number;

    @ApiPropertyOptional({ description: 'Security question answer' })
    @IsOptional()
    @IsString()
    security_answer?: string;

    @ApiPropertyOptional({ description: 'User password' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ description: 'Whether the user is active' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({ description: 'Whether the email is verified' })
    @IsOptional()
    @IsBoolean()
    is_email_verified?: boolean;

    @ApiPropertyOptional({
        description: 'Whether the password has been changed',
    })
    @IsOptional()
    @IsBoolean()
    is_password_changed?: boolean;

    @ApiPropertyOptional({
        description: 'Whether temporary password is active',
    })
    @IsOptional()
    @IsBoolean()
    is_temp_pwd_active?: boolean;
}

import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ description: 'User UUID' })
    @Expose()
    uuid: string;

    @ApiProperty({ description: 'User email address' })
    @Expose()
    email: string;

    @ApiProperty({ description: 'User type ID' })
    @Expose()
    user_type_id: number;

    @ApiProperty({ description: 'Security question ID' })
    @Expose()
    security_question_id: number;

    @ApiProperty({ description: 'Whether the user is active' })
    @Expose()
    is_active: boolean;

    @ApiProperty({ description: 'Whether the email is verified' })
    @Expose()
    is_email_verified: boolean;

    @ApiProperty({ description: 'Whether the password has been changed' })
    @Expose()
    is_password_changed: boolean;

    @ApiProperty({ description: 'Whether temporary password is active' })
    @Expose()
    is_temp_pwd_active: boolean;

    @ApiProperty({ description: 'User creation date' })
    @Expose()
    @Transform(({ value }) => value.toISOString())
    created_at: Date;

    @ApiProperty({ description: 'User last update date' })
    @Expose()
    @Transform(({ value }) => value.toISOString())
    updated_at: Date;

    @ApiProperty({ description: 'User type information' })
    @Expose()
    tb_user_type?: {
        uuid: string;
        type: string;
    };

    @ApiProperty({ description: 'Security question information' })
    @Expose()
    tb_security_question?: {
        uuid: string;
        question_text: string;
    };
}

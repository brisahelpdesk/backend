export interface AuthModule {
    /**
     * Authenticates user with email and password.
     * @throws {InvalidCredentialsException} If credentials are invalid
     * @throws {UserNotFoundException} If user does not exist
     * @throws {UserNotActiveException} If user account is disabled
     */
    login(
        email: string,
        password: string,
    ): Promise<{
        token: string;
        refreshToken: string;
        expiresIn: number;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;

    /**
     * Performs two-factor authentication (2FA).
     * @throws {InvalidCodeException} If verification code is invalid
     * @throws {CodeExpiredException} If verification code has expired
     */
    verify2FA(
        userId: string,
        code: string,
    ): Promise<{
        verified: boolean;
        token: string;
        refreshToken: string;
    }>;

    /**
     * Forces password change and security question setup on first access.
     * @throws {UserNotFoundException} If user does not exist
     * @throws {WeakPasswordException} If new password doesn't meet security requirements
     */
    firstAccess(
        userId: string,
        data: {
            newPassword: string;
            securityQuestion: string;
            securityAnswer: string;
        },
    ): Promise<{
        success: boolean;
        requiresPasswordChange: boolean;
    }>;

    /**
     * Recovers password using security question.
     * @throws {UserNotFoundException} If user does not exist
     * @throws {InvalidAnswerException} If security answer is incorrect
     * @throws {WeakPasswordException} If new password doesn't meet security requirements
     */
    recoverPassword(
        email: string,
        data: {
            securityAnswer: string;
            newPassword: string;
        },
    ): Promise<{
        success: boolean;
        requiresPasswordChange: boolean;
    }>;

    /**
     * Generates and renews session tokens (JWT).
     * @throws {InvalidTokenException} If refresh token is invalid
     * @throws {TokenExpiredException} If refresh token has expired
     */
    refreshToken(token: string): Promise<{
        token: string;
        refreshToken: string;
        expiresIn: number;
    }>;

    /**
     * Validates permissions according to user role.
     * @throws {UnauthorizedException} If user lacks required permissions
     * @throws {UserNotFoundException} If user does not exist
     */
    validatePermissions(
        userId: string,
        requiredRole: 'ADMIN' | 'SUPERVISOR' | 'AGENT' | 'CLIENT',
    ): Promise<{
        hasPermission: boolean;
        userRole: string;
    }>;
}

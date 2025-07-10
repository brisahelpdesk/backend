export interface AuthModule {
  /**
   * Autentica usuário com e-mail e senha.
   */
  login(email: string, password: string): Promise<{ token: string; refreshToken: string }>;

  /**
   * Realiza autenticação em dois fatores (2FA).
   */
  verify2FA(userId: string, code: string): Promise<boolean>;

  /**
   * Força troca de senha e configuração de pergunta de segurança no primeiro acesso.
   */
  firstAccess(userId: string, newPassword: string, securityQuestion: string, securityAnswer: string): Promise<void>;

  /**
   * Recupera senha via pergunta de segurança.
   */
  recoverPassword(email: string, securityAnswer: string, newPassword: string): Promise<void>;

  /**
   * Gera e renova tokens de sessão (JWT).
   */
  refreshToken(token: string): Promise<{ token: string; refreshToken: string }>;

  /**
   * Valida permissões de acordo com o perfil do usuário.
   */
  validatePermissions(userId: string, requiredRole: string): Promise<boolean>;
} 
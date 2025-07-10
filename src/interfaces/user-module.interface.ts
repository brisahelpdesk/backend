export interface UserModule {
  /**
   * Cria um novo usuário com perfil e permissões.
   */
  createUser(data: {
    name: string;
    email: string;
    phone?: string;
    role: 'ADMIN' | 'SUPERVISOR' | 'AGENT' | 'CLIENT';
    password: string;
    active?: boolean;
  }): Promise<string>; // retorna userId

  /**
   * Atualiza informações pessoais do usuário.
   */
  updateUser(userId: string, data: Partial<Omit<Parameters<UserModule['createUser']>[0], 'password'>>): Promise<void>;

  /**
   * Ativa ou desativa uma conta de usuário.
   */
  setActive(userId: string, active: boolean): Promise<void>;

  /**
   * Define ou altera o perfil do usuário.
   */
  setRole(userId: string, role: 'ADMIN' | 'SUPERVISOR' | 'AGENT' | 'CLIENT'): Promise<void>;

  /**
   * Busca usuário por e-mail ou id.
   */
  getUser(identifier: { id?: string; email?: string }): Promise<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    active: boolean;
  } | null>;
} 
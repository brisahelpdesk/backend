export interface UserModule {
  /**
   * Creates a new user with profile and permissions.
   * @throws {EmailAlreadyExistsException} If email is already registered
   * @throws {InvalidRoleException} If provided role is invalid
   * @throws {WeakPasswordException} If password doesn't meet security requirements
   */
  createUser(data: {
    name: string;
    email: string;
    phone?: string;
    role: 'ADMIN' | 'SUPERVISOR' | 'AGENT' | 'CLIENT';
    password: string;
    active?: boolean;
    department?: string;
  }): Promise<{
    id: string;
    email: string;
    role: string;
    requiresPasswordChange: boolean;
  }>;

  /**
   * Updates user's personal information.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {EmailAlreadyExistsException} If new email is already registered
   */
  updateUser(userId: string, data: Partial<{
    name: string;
    email: string;
    phone: string;
    department: string;
    active: boolean;
  }>): Promise<{
    id: string;
    updatedFields: string[];
  }>;

  /**
   * Activates or deactivates a user account.
   * @throws {UserNotFoundException} If user does not exist
   */
  setActive(userId: string, active: boolean): Promise<{
    id: string;
    active: boolean;
    updatedAt: Date;
  }>;

  /**
   * Sets or changes user's role.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {InvalidRoleException} If provided role is invalid
   */
  setRole(userId: string, role: 'ADMIN' | 'SUPERVISOR' | 'AGENT' | 'CLIENT'): Promise<{
    id: string;
    previousRole: string;
    newRole: string;
    updatedAt: Date;
  }>;

  /**
   * Finds user by email or id.
   * @throws {UserNotFoundException} If user does not exist
   */
  getUser(identifier: { id?: string; email?: string }): Promise<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    active: boolean;
    department?: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  /**
   * Lists users based on filters.
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  listUsers(filter?: {
    role?: string;
    active?: boolean;
    department?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    users: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      active: boolean;
      department?: string;
    }>;
    total: number;
    page: number;
    limit: number;
  }>;
} 
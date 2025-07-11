export interface AuditModule {
  /**
   * Logs a critical action in the system.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {InvalidActionTypeException} If action type is invalid
   */
  logAction(data: {
    userId: string;
    actionType: 'LOGIN' | 'LOGOUT' | 'UPDATE' | 'DELETE' | 'PERMISSION_CHANGE' | 'ADMIN_ACTION' | 'FAILED_AUTH' | string;
    context: string;
    contextId?: string;
    timestamp?: Date;
    details?: any;
  }): Promise<{ logged: boolean; logId: string; loggedAt: Date }>;

  /**
   * Retrieves logs based on filters.
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  getLogs(filter: {
    userId?: string;
    actionType?: string;
    context?: string;
    dateRange?: { from: Date; to: Date };
    page?: number;
    limit?: number;
  }): Promise<{
    logs: Array<{
      id: string;
      userId: string;
      actionType: string;
      context: string;
      contextId?: string;
      timestamp: Date;
      details?: any;
    }>;
    total: number;
    page: number;
    limit: number;
  }>;
}
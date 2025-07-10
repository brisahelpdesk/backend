export interface AuditModule {
  /**
   * Registra ação crítica no sistema.
   */
  logAction(data: {
    userId: string;
    actionType: 'LOGIN' | 'LOGOUT' | 'UPDATE' | 'DELETE' | 'PERMISSION_CHANGE' | 'ADMIN_ACTION' | 'FAILED_AUTH' | string;
    context: string;
    contextId?: string;
    timestamp?: Date;
    details?: any;
  }): Promise<void>;

  /**
   * Busca logs por filtro.
   */
  getLogs(filter: {
    userId?: string;
    actionType?: string;
    context?: string;
    dateRange?: { from: Date; to: Date };
  }): Promise<any[]>;
} 
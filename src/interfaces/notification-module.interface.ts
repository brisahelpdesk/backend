export interface NotificationModule {
  /**
   * Envia notificação por e-mail ou outro canal.
   */
  sendNotification(data: {
    userId: string;
    type: 'EMAIL' | 'WEBHOOK';
    subject: string;
    message: string;
    templateId?: string;
  }): Promise<void>;

  /**
   * Gerencia preferências de notificação do usuário.
   */
  setUserPreferences(userId: string, preferences: any): Promise<void>;

  /**
   * Emite alertas e lembretes.
   */
  sendAlert(userId: string, alertType: string, message: string): Promise<void>;
} 
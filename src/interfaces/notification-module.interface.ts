export interface NotificationModule {
  /**
   * Sends a notification by email or other channel.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {NotificationChannelException} If notification channel fails
   */
  sendNotification(data: {
    userId: string;
    type: 'EMAIL' | 'WEBHOOK';
    subject: string;
    message: string;
    templateId?: string;
  }): Promise<{ sent: boolean; channel: string; sentAt: Date }>;

  /**
   * Manages user notification preferences.
   * @throws {UserNotFoundException} If user does not exist
   */
  setUserPreferences(userId: string, preferences: any): Promise<{ updated: boolean }>;

  /**
   * Sends alerts and reminders.
   * @throws {UserNotFoundException} If user does not exist
   */
  sendAlert(userId: string, alertType: string, message: string): Promise<{ sent: boolean; alertType: string; sentAt: Date }>;
} 
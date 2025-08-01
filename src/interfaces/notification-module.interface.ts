export interface NotificationModule {
    /**
     * Sends a notification by email or other channel.
     * @throws {NotificationChannelException} If notification channel fails
     */
    sendNotification(): Promise<{
        sent: boolean;
        channel: string;
        sentAt: Date;
    }>;

    /**
     * Sends alerts and reminders.
     */
    sendAlert(): Promise<{ sent: boolean; alertType: string; sentAt: Date }>;
}

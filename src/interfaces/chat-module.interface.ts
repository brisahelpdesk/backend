export interface ChatModule {
    /**
     * Creates a chat room.
     */
    createChatRoom(): Promise<{
        chatRoomId: string;
        createdAt: Date;
    }>;

    /**
     * Sends a real-time message in a chat room.
     * @throws {ChatRoomNotFoundException} If chat room does not exist
     * @throws {UserNotFoundException} If sender does not exist
     */
    sendMessage(
        chatRoomId: string,
        data: {
            senderId: string;
            message: string;
            attachments?: string[];
        },
    ): Promise<{
        messageId: string;
        sentAt: Date;
    }>;

    /**
     * Retrieves chat message history.
     * @throws {ChatRoomNotFoundException} If chat room does not exist
     */
    getChatHistory(chatRoomId: string): Promise<
        Array<{
            id: string;
            senderId: string;
            message: string;
            attachments?: string[];
            sentAt: Date;
        }>
    >;

    /**
     * Notifies users about new messages.
     * @throws {ChatRoomNotFoundException} If chat room does not exist
     * @throws {UserNotFoundException} If user does not exist
     */
    notifyNewMessage(
        chatRoomId: string,
        userId: string,
    ): Promise<{ notified: boolean }>;
}

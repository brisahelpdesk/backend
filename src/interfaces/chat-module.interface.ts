export interface ChatModule {
  /**
   * Cria sala de chat para um chamado.
   */
  createChatRoom(ticketId: string): Promise<string>; // retorna chatRoomId

  /**
   * Envia mensagem em tempo real.
   */
  sendMessage(chatRoomId: string, data: {
    senderId: string;
    message: string;
    attachments?: string[];
  }): Promise<void>;

  /**
   * Busca histórico de mensagens do chat.
   */
  getChatHistory(chatRoomId: string): Promise<any[]>;

  /**
   * Notifica usuários sobre novas mensagens.
   */
  notifyNewMessage(chatRoomId: string, userId: string): Promise<void>;
} 
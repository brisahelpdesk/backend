export interface TicketModule {
  /**
   * Abre um novo chamado.
   */
  openTicket(data: {
    clientId: string;
    subject: string;
    description: string;
    productId?: string;
    attachments?: string[]; // URLs ou IDs dos arquivos
  }): Promise<string>; // retorna ticketId

  /**
   * Registra uma interação (mensagem) em um chamado.
   */
  addInteraction(ticketId: string, data: {
    authorId: string;
    message: string;
    attachments?: string[];
  }): Promise<void>;

  /**
   * Atualiza o status do chamado.
   */
  updateStatus(ticketId: string, status: 'NEW' | 'IN_PROGRESS' | 'WAITING_CLIENT' | 'CLOSED' | 'CANCELLED'): Promise<void>;

  /**
   * Reatribui o técnico responsável pelo chamado.
   */
  reassignTechnician(ticketId: string, technicianId: string): Promise<void>;

  /**
   * Busca detalhes completos do chamado.
   */
  getTicket(ticketId: string): Promise<any>;

  /**
   * Lista chamados por filtro.
   */
  listTickets(filter: {
    clientId?: string;
    technicianId?: string;
    status?: string;
    dateRange?: { from: Date; to: Date };
  }): Promise<any[]>;
} 
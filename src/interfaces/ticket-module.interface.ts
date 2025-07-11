export interface TicketModule {
  /**
   * Opens a new ticket.
   * @throws {ClientNotFoundException} If client does not exist
   * @throws {ProductNotFoundException} If product does not exist and was provided
   * @throws {SlaNotFoundException} If SLA does not exist and was provided
   */
  openTicket(data: {
    requesterId: string;
    productId?: string;
    slaId: string;
    subject: string;
    description: string;
    attachments?: string[]; // File URLs or IDs
  }): Promise<{
    ticketId: string;
    number: string; // Ticket reference number
    createdAt: Date;
  }>;

  /**
   * Updates ticket status.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {InvalidStatusTransitionException} If status transition is not allowed
   */
  updateStatus(
    ticketId: string, 
    status: 'NEW' | 'IN_PROGRESS' | 'WAITING_CLIENT' | 'CLOSED' | 'CANCELLED'
  ): Promise<{
    previousStatus: string;
    currentStatus: string;
    updatedAt: Date;
  }>;

  /**
   * Reassigns the technician responsible for the ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {TechnicianNotFoundException} If technician does not exist
   */
  reassignTechnician(ticketId: string, technicianId: string): Promise<{
    previousTechnicianId?: string;
    newTechnicianId: string;
    updatedAt: Date;
  }>;

  /**
   * Retrieves complete ticket details.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  getTicket(ticketId: string): Promise<{
    id: string;
    number: string;
    subject: string;
    description: string;
    status: string;
    clientId: string;
    technicianId?: string;
    productId?: string;
    createdAt: Date;
    updatedAt: Date;
    interactions: Array<{
      id: string;
      authorId: string;
      message: string;
      attachments?: string[];
      createdAt: Date;
    }>;
  }>;

  /**
   * Lists tickets based on filters.
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  listTickets(filter: {
    clientId?: string;
    technicianId?: string;
    status?: string;
    dateRange?: { from: Date; to: Date };
    page?: number;
    limit?: number;
  }): Promise<{
    tickets: Array<{
      id: string;
      number: string;
      subject: string;
      status: string;
      clientId: string;
      technicianId?: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
    total: number;
    page: number;
    limit: number;
  }>;
} 
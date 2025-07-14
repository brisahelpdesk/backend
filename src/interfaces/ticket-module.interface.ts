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

  /**
   * Applies SLA rules when opening a ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {ContractNotFoundException} If contract does not exist
   * @throws {InvalidPriorityException} If priority is invalid
   */
  applySla(ticketId: string, contractId: string, ticketType: string, priority: string): Promise<{
    appliedRule: {
      priority: string;
      responseTime: number;
      resolutionTime: number;
    };
    deadlines: {
      responseDeadline: Date;
      resolutionDeadline: Date;
    };
  }>;

  /**
   * Calculates remaining time for response/resolution.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {SlaNotFoundException} If no SLA is applied to the ticket
   */
  getRemainingTime(ticketId: string): Promise<{
    response: {
      remaining: number;
      unit: 'minutes' | 'hours';
      deadline: Date;
    };
    resolution: {
      remaining: number;
      unit: 'minutes' | 'hours';
      deadline: Date;
    };
  } | null>;

  /**
   * Identifies SLA violations.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  checkViolation(ticketId: string): Promise<{
    hasViolation: boolean;
    type?: 'RESPONSE' | 'RESOLUTION';
    exceededBy?: {
      time: number;
      unit: 'minutes' | 'hours';
    };
  }>;

  /**
   * Displays ticket's SLA information.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  getSlaInfo(ticketId: string): Promise<{
    rule: {
      priority: string;
      responseTime: number;
      resolutionTime: number;
    };
    deadlines: {
      responseDeadline: Date;
      resolutionDeadline: Date;
    };
    status: {
      responseViolated: boolean;
      resolutionViolated: boolean;
      remainingResponse?: number;
      remainingResolution?: number;
    };
  }>;

  /**
   * Generates alerts for critical tickets.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  alertIfCritical(ticketId: string): Promise<{
    isCritical: boolean;
    reason?: string;
    remainingTime?: {
      time: number;
      unit: 'minutes' | 'hours';
    };
  }>;

  /**
   * Starts a timer for a ticket interaction.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {UserNotFoundException} If user does not exist
   */
    startTimer(ticketId: string, userId: string): Promise<{ timerId: string; startedAt: Date }>;

  /**
   * Retrieves interaction times for a ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  getInteractionTimes(ticketId: string): Promise<Array<{
    userId: string;
    duration: number;
    timerId: string;
    startedAt: Date;
    stoppedAt: Date;
  }>>;

  /**
   * Calculates total time spent on a ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
    getTotalTime(ticketId: string): Promise<{ totalDuration: number }>;
  
  /**
   * Creates a chat room for a ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  createChatRoom(ticketId: string): Promise<{
    chatRoomId: string;
    createdAt: Date;
  }>;
} 
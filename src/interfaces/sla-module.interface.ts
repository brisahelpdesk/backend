/**
 * Data Transfer Object for creating/updating an SLA.
 */
export interface SlaDto {
  name: string;
  description?: string;
  responseTime: number;
  resolutionTime: number;
  priority: string;
}

/**
 * SLA Entity Interface.
 */
export interface Sla {
  id: string;
  name: string;
  description?: string;
  responseTime: number;
  resolutionTime: number;
  priority: string;
}

export interface SlaModule {
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
   * Creates a new SLA rule.
   * @param data SlaDto with SLA details
   * @returns The created SLA
   */
  createSla(data: SlaDto): Promise<Sla>;

  /**
   * Retrieves an SLA by its ID.
   * @param id SLA identifier
   * @returns The SLA or null if not found
   */
  getSlaById(id: string): Promise<Sla | null>;

  /**
   * Lists all SLAs.
   * @returns Array of SLAs
   */
  listSlas(): Promise<Sla[]>;

  /**
   * Updates an existing SLA.
   * @param id SLA identifier
   * @param data Partial SlaDto with fields to update
   * @returns The updated SLA
   */
  updateSla(id: string, data: Partial<SlaDto>): Promise<Sla>;

  /**
   * Deletes an SLA by its ID.
   * @param id SLA identifier
   * @returns void
   */
  deleteSla(id: string): Promise<void>;
} 
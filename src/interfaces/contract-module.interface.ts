export interface ContractModule {
  /**
   * Creates or updates a contract for a client.
   * @throws {ClientNotFoundException} If client does not exist
   * @throws {ProductNotFoundException} If any product in coveredProducts does not exist
   * @throws {InvalidDateRangeException} If endDate is before startDate
   */
  upsertContract(data: {
    id?: string;
    clientId: string;
    startDate: Date;
    endDate: Date;
    active?: boolean;
    coveredProducts?: string[];
    allowedTicketTypes?: string[];
    slaRules?: {
      priority: string;
      responseTime: number;
      resolutionTime: number;
    }[];
  }): Promise<{
    id: string;
    clientId: string;
    active: boolean;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    updatedAt: Date;
  }>;

  /**
   * Activates, deactivates or closes a contract.
   * @throws {ContractNotFoundException} If contract does not exist
   * @throws {InvalidStatusTransitionException} If status transition is not allowed
   */
  setStatus(contractId: string, status: 'ACTIVE' | 'INACTIVE' | 'CLOSED'): Promise<{
    id: string;
    previousStatus: string;
    currentStatus: string;
    updatedAt: Date;
  }>;

  /**
   * Validates if a ticket is within contract scope.
   * @throws {ContractNotFoundException} If contract does not exist
   * @throws {ProductNotFoundException} If product does not exist
   */
  validateTicketScope(contractId: string, ticketType: string, productId: string): Promise<{
    isValid: boolean;
    reason?: string;
    slaRule?: {
      priority: string;
      responseTime: number;
      resolutionTime: number;
    };
  }>;

  /**
   * Finds contract by client or id.
   * @throws {ContractNotFoundException} If contract does not exist
   */
  getContract(identifier: { id?: string; clientId?: string }): Promise<{
    id: string;
    clientId: string;
    startDate: Date;
    endDate: Date;
    active: boolean;
    coveredProducts: Array<{
      id: string;
      name: string;
    }>;
    allowedTicketTypes: string[];
    slaRules: Array<{
      priority: string;
      responseTime: number;
      resolutionTime: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
  }>;

  /**
   * Lists contracts based on filters.
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  listContracts(filter?: {
    clientId?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
    productId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    contracts: Array<{
      id: string;
      clientId: string;
      status: string;
      startDate: Date;
      endDate: Date;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>;
    total: number;
    page: number;
    limit: number;
  }>;
} 
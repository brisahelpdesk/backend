export interface ContractModule {
  /**
   * Cria ou edita um contrato para um cliente.
   */
  upsertContract(data: {
    id?: string;
    clientId: string;
    startDate: Date;
    endDate: Date;
    active?: boolean;
    coveredProducts?: string[];
    allowedTicketTypes?: string[];
    slaRules?: any;
  }): Promise<string>; // retorna contractId

  /**
   * Ativa, desativa ou encerra um contrato.
   */
  setStatus(contractId: string, status: 'ACTIVE' | 'INACTIVE' | 'CLOSED'): Promise<void>;

  /**
   * Valida se um chamado está dentro do escopo contratual.
   */
  validateTicketScope(contractId: string, ticketType: string, productId: string): Promise<boolean>;

  /**
   * Busca contrato por cliente ou id.
   */
  getContract(identifier: { id?: string; clientId?: string }): Promise<any>;
} 
export interface AssignmentModule {
  /**
   * Atribui automaticamente um técnico a um chamado.
   */
  autoAssign(ticketId: string): Promise<{ technicianId: string }>;

  /**
   * Permite reatribuição manual do técnico.
   */
  manualReassign(ticketId: string, technicianId: string): Promise<void>;

  /**
   * Lista técnicos elegíveis para um chamado.
   */
  listEligibleTechnicians(ticketId: string): Promise<{ id: string; name: string; workload: number }[]>;
} 
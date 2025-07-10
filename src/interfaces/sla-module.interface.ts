export interface SlaModule {
  /**
   * Aplica regras de SLA ao abrir um chamado.
   */
  applySla(ticketId: string, contractId: string, ticketType: string, priority: string): Promise<void>;

  /**
   * Calcula o tempo restante para atendimento/resolução.
   */
  getRemainingTime(ticketId: string): Promise<{ remaining: number; unit: 'minutes' | 'hours' } | null>;

  /**
   * Identifica violações de SLA.
   */
  checkViolation(ticketId: string): Promise<boolean>;

  /**
   * Exibe informações de SLA do chamado.
   */
  getSlaInfo(ticketId: string): Promise<any>;

  /**
   * Gera alertas ou destaques visuais para chamados críticos.
   */
  alertIfCritical(ticketId: string): Promise<void>;
} 
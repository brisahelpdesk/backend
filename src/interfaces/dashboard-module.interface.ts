export interface DashboardModule {
  /**
   * Exibe indicadores operacionais (KPIs).
   */
  getKpis(filter?: {
    period?: { from: Date; to: Date };
    technicianId?: string;
    clientId?: string;
    status?: string;
    ticketType?: string;
  }): Promise<any>;

  /**
   * Atualiza dados em tempo real.
   */
  subscribeToRealtimeUpdates(userId: string, callback: (data: any) => void): void;

  /**
   * Suporte a múltiplos tipos de gráfico.
   */
  getChartData(type: 'bar' | 'line' | 'pie' | 'counter', filter?: any): Promise<any>;
} 
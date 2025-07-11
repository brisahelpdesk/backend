export interface DashboardModule {
  /**
   * Retrieves operational indicators (KPIs).
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  getKpis(filter?: {
    period?: { from: Date; to: Date };
    technicianId?: string;
    clientId?: string;
    status?: string;
    ticketType?: string;
  }): Promise<{
    kpis: Array<{
      name: string;
      value: number;
      unit?: string;
    }>;
    generatedAt: Date;
  }>;

  /**
   * Subscribes to real-time dashboard updates.
   * @throws {UserNotFoundException} If user does not exist
   */
  subscribeToRealtimeUpdates(userId: string, callback: (data: any) => void): void;

  /**
   * Retrieves chart data for different chart types.
   * @throws {InvalidChartTypeException} If chart type is invalid
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  getChartData(type: 'bar' | 'line' | 'pie' | 'counter', filter?: any): Promise<{
    type: string;
    data: any;
    generatedAt: Date;
  }>;
} 
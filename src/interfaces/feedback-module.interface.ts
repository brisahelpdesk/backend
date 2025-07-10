export interface FeedbackModule {
  /**
   * Avalia atendimento de chamado.
   */
  rateTicket(ticketId: string, userId: string, rating: number, comment?: string): Promise<void>;

  /**
   * Avalia artigo da base de conhecimento.
   */
  rateArticle(articleId: string, userId: string, rating: number, comment?: string): Promise<void>;

  /**
   * Coleta comentários abertos.
   */
  addComment(context: 'TICKET' | 'ARTICLE', contextId: string, userId: string, comment: string): Promise<void>;

  /**
   * Gera métricas de satisfação (CSAT, etc).
   */
  getSatisfactionMetrics(filter?: { period?: { from: Date; to: Date }; clientId?: string }): Promise<any>;
} 
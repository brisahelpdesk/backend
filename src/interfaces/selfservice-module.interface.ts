export interface SelfServiceModule {
  /**
   * Sugere artigos automaticamente ao usuário.
   */
  suggestArticlesForUser(userId: string, keywords: string[]): Promise<any[]>;

  /**
   * Registra interação do usuário com artigo.
   */
  logArticleInteraction(userId: string, articleId: string): Promise<void>;

  /**
   * Gera chamado automático de autoatendimento.
   */
  createSelfServiceTicket(userId: string, articleId: string): Promise<string>; // retorna ticketId

  /**
   * Finaliza ou converte chamado de autoatendimento.
   */
  resolveOrConvertTicket(ticketId: string, resolved: boolean): Promise<void>;

  /**
   * Permite avaliação do artigo pelo usuário.
   */
  rateArticle(articleId: string, userId: string, rating: number): Promise<void>;

  /**
   * Alimenta relatórios e dashboards com dados de autoatendimento.
   */
  getSelfServiceStats(): Promise<any>;
} 
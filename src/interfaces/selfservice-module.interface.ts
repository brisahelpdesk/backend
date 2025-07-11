export interface SelfServiceModule {
  /**
   * Suggests articles automatically to the user.
   * @throws {UserNotFoundException} If user does not exist
   */
  suggestArticlesForUser(userId: string, keywords: string[]): Promise<Array<{
    id: string;
    title: string;
    summary: string;
    keywords: string[];
    published: boolean;
  }>>;

  /**
   * Logs user interaction with an article.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {ArticleNotFoundException} If article does not exist
   */
  logArticleInteraction(userId: string, articleId: string): Promise<{ logged: boolean; loggedAt: Date }>;

  /**
   * Creates a self-service ticket automatically.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {ArticleNotFoundException} If article does not exist
   */
  createSelfServiceTicket(userId: string, articleId: string): Promise<{ ticketId: string; createdAt: Date }>;

  /**
   * Resolves or converts a self-service ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  resolveOrConvertTicket(ticketId: string, resolved: boolean): Promise<{ updated: boolean; updatedAt: Date }>;

  /**
   * Allows user to rate an article.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {ArticleNotFoundException} If article does not exist
   */
  rateArticle(articleId: string, userId: string, rating: number): Promise<{ rated: boolean; rating: number; ratedAt: Date }>;

  /**
   * Provides self-service statistics for reports and dashboards.
   */
  getSelfServiceStats(): Promise<{
    totalInteractions: number;
    totalTickets: number;
    resolvedBySelfService: number;
    convertedToManual: number;
    ratings: Array<{ articleId: string; averageRating: number }>;
  }>;
} 
export interface FeedbackModule {
  /**
   * Rates a ticket after it is closed.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {UserNotFoundException} If user does not exist
   */
  rateTicket(ticketId: string, userId: string, rating: number, comment?: string): Promise<{ 
    rated: boolean; 
    rating: number; 
    ratedAt: Date 
  }>;

  /**
   * Rates a knowledge base article.
   * @throws {ArticleNotFoundException} If article does not exist
   * @throws {UserNotFoundException} If user does not exist
   */
  rateArticle(articleId: string, userId: string, rating: number, comment?: string): Promise<{ 
    rated: boolean; 
    rating: number; 
    ratedAt: Date 
  }>;

  /**
   * Adds open comments to a ticket or article.
   * @throws {UserNotFoundException} If user does not exist
   * @throws {TicketNotFoundException} If context is TICKET and ticket does not exist
   * @throws {ArticleNotFoundException} If context is ARTICLE and article does not exist
   */
  addComment(context: 'TICKET' | 'ARTICLE', contextId: string, userId: string, comment: string): Promise<{ 
    added: boolean; 
    commentId: string; 
    addedAt: Date 
  }>;

  /**
   * Generates satisfaction metrics (CSAT, etc).
   * @throws {InvalidFilterException} If filter parameters are invalid
   */
  getSatisfactionMetrics(filter?: { period?: { from: Date; to: Date }; clientId?: string }): Promise<{
    csat: number;
    nps?: number;
    totalResponses: number;
    breakdown: Array<{
      rating: number;
      count: number;
    }>;
    comments: Array<{
      id: string;
      context: 'TICKET' | 'ARTICLE';
      contextId: string;
      userId: string;
      comment: string;
      createdAt: Date;
    }>;
  }>;
} 
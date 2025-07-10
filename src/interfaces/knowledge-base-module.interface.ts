export interface KnowledgeBaseModule {
  /**
   * Cria ou edita artigo da base de conhecimento.
   */
  upsertArticle(data: {
    id?: string;
    title: string;
    content: string;
    keywords?: string[];
    categoryId?: string;
    authorId: string;
    status?: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'DISABLED';
    attachments?: string[];
  }): Promise<string>; // retorna articleId

  /**
   * Publica ou desativa artigo.
   */
  setArticleStatus(articleId: string, status: 'PUBLISHED' | 'DISABLED'): Promise<void>;

  /**
   * Avalia artigo.
   */
  rateArticle(articleId: string, userId: string, rating: number, comment?: string): Promise<void>;

  /**
   * Sugere artigos por palavras-chave.
   */
  suggestArticles(keywords: string[]): Promise<any[]>;

  /**
   * Busca artigo por id.
   */
  getArticle(articleId: string): Promise<any>;
} 
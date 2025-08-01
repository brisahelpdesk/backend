export interface KnowledgeBaseModule {
    /**
     * Creates or updates a knowledge base article.
     * @throws {ArticleNotFoundException} If article does not exist when updating
     * @throws {DuplicateArticleException} If article title already exists
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
    }): Promise<{
        articleId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;

    /**
     * Publishes or disables an article.
     * @throws {ArticleNotFoundException} If article does not exist
     */
    setArticleStatus(
        articleId: string,
        status: 'PUBLISHED' | 'DISABLED',
    ): Promise<{ updated: boolean; updatedAt: Date }>;

    /**
     * Rates an article.
     * @throws {ArticleNotFoundException} If article does not exist
     * @throws {UserNotFoundException} If user does not exist
     */
    rateArticle(
        articleId: string,
        userId: string,
        rating: number,
        comment?: string,
    ): Promise<{ rated: boolean; rating: number; ratedAt: Date }>;

    /**
     * Suggests articles by keywords.
     */
    suggestArticles(keywords: string[]): Promise<
        Array<{
            id: string;
            title: string;
            summary: string;
            keywords: string[];
            published: boolean;
        }>
    >;

    /**
     * Retrieves an article by id.
     * @throws {ArticleNotFoundException} If article does not exist
     */
    getArticle(articleId: string): Promise<{
        id: string;
        title: string;
        content: string;
        keywords: string[];
        categoryId?: string;
        authorId: string;
        status: string;
        attachments?: string[];
        createdAt: Date;
        updatedAt: Date;
        ratings: Array<{
            userId: string;
            rating: number;
            comment?: string;
            ratedAt: Date;
        }>;
    }>;
}

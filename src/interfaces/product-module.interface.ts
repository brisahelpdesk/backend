export interface ProductModule {
    /**
     * Creates or updates a product or service.
     * @throws {ProductNotFoundException} If product does not exist when updating
     * @throws {DuplicateProductException} If product name already exists
     */
    upsertProduct(data: {
        id?: string;
        name: string;
        description?: string;
        category?: string;
        price?: number;
        active?: boolean;
    }): Promise<{
        id: string;
        name: string;
        active: boolean;
        createdAt?: Date;
        updatedAt: Date;
    }>;

    /**
     * Activates or deactivates a product/service.
     * @throws {ProductNotFoundException} If product does not exist
     */
    setActive(
        productId: string,
        active: boolean,
    ): Promise<{
        id: string;
        active: boolean;
        updatedAt: Date;
    }>;

    /**
     * Associates product with contract.
     * @throws {ProductNotFoundException} If product does not exist
     * @throws {ContractNotFoundException} If contract does not exist
     * @throws {DuplicateAssociationException} If association already exists
     */
    associateToContract(
        productId: string,
        contractId: string,
    ): Promise<{
        productId: string;
        contractId: string;
        createdAt: Date;
    }>;

    /**
     * Associates product with user/client.
     * @throws {ProductNotFoundException} If product does not exist
     * @throws {UserNotFoundException} If user does not exist
     * @throws {DuplicateAssociationException} If association already exists
     */
    associateToUser(
        productId: string,
        userId: string,
    ): Promise<{
        productId: string;
        userId: string;
        createdAt: Date;
    }>;

    /**
     * Lists products based on filters.
     * @throws {InvalidFilterException} If filter parameters are invalid
     */
    listProducts(filter?: {
        active?: boolean;
        userId?: string;
        contractId?: string;
        category?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        products: Array<{
            id: string;
            name: string;
            description?: string;
            category?: string;
            price?: number;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        }>;
        total: number;
        page: number;
        limit: number;
    }>;
}

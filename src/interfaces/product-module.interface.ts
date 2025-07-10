export interface ProductModule {
  /**
   * Cria ou edita um produto ou serviço.
   */
  upsertProduct(data: {
    id?: string;
    name: string;
    description?: string;
    active?: boolean;
  }): Promise<string>; // retorna productId

  /**
   * Ativa ou desativa um produto/serviço.
   */
  setActive(productId: string, active: boolean): Promise<void>;

  /**
   * Associa produto a contrato.
   */
  associateToContract(productId: string, contractId: string): Promise<void>;

  /**
   * Associa produto a usuário/cliente.
   */
  associateToUser(productId: string, userId: string): Promise<void>;

  /**
   * Lista produtos por filtro.
   */
  listProducts(filter?: { active?: boolean; userId?: string; contractId?: string }): Promise<any[]>;
} 
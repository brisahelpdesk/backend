/**
 * Data Transfer Object for creating/updating an SLA.
 */
export interface SlaDto {
  name: string;
  description?: string;
  responseTime: number;
  resolutionTime: number;
  priority: string;
}

/**
 * SLA Entity Interface.
 */
export interface Sla {
  id: string;
  name: string;
  description?: string;
  responseTime: number;
  resolutionTime: number;
  priority: string;
}

export interface SlaModule {
  /**
   * Creates a new SLA rule.
   * @param data SlaDto with SLA details
   * @returns The created SLA
   */
  createSla(data: SlaDto): Promise<Sla>;

  /**
   * Retrieves an SLA by its ID.
   * @param id SLA identifier
   * @returns The SLA or null if not found
   */
  getSlaById(id: string): Promise<Sla | null>;

  /**
   * Lists all SLAs.
   * @returns Array of SLAs
   */
  listSlas(): Promise<Sla[]>;

  /**
   * Updates an existing SLA.
   * @param id SLA identifier
   * @param data Partial SlaDto with fields to update
   * @returns The updated SLA
   */
  updateSla(id: string, data: Partial<SlaDto>): Promise<Sla>;

  /**
   * Deletes an SLA by its ID.
   * @param id SLA identifier
   * @returns void
   */
  deleteSla(id: string): Promise<void>;
} 
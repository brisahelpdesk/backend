export interface AssignmentModule {
    /**
     * Automatically assigns a technician to a ticket.
     * @throws {TicketNotFoundException} If ticket does not exist
     * @throws {NoEligibleTechniciansException} If no eligible technicians are available
     */
    autoAssign(ticketId: string): Promise<{
        technicianId: string;
        technicianName: string;
    }>;

    /**
     * Allows manual reassignment of a technician.
     * @throws {TicketNotFoundException} If ticket does not exist
     * @throws {TechnicianNotFoundException} If technician does not exist
     * @throws {InvalidAssignmentException} If technician cannot be assigned to the ticket
     */
    manualReassign(ticketId: string, technicianId: string): Promise<void>;

    /**
     * Lists eligible technicians for a ticket.
     * @throws {TicketNotFoundException} If ticket does not exist
     */
    listEligibleTechnicians(ticketId: string): Promise<
        {
            id: string;
            name: string;
            workload: number;
            specialties?: string[]; // technician's areas of expertise
            currentAssignments?: number; // current number of assigned tickets
        }[]
    >;
}

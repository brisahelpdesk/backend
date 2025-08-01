export interface ReportModule {
    /**
     * Gera relatório em PDF ou Excel.
     */
    generateReport(
        format: 'PDF' | 'EXCEL',
        filter: {
            period?: { from: Date; to: Date };
            clientId?: string;
            technicianId?: string;
            ticketType?: string;
            status?: string;
            sla?: boolean;
        },
    ): Promise<{ url: string }>; // URL para download

    /**
     * Lista relatórios disponíveis para download.
     */
    listAvailableReports(
        userId: string,
    ): Promise<{ id: string; name: string; url: string; createdAt: Date }[]>;

    /**
     * Remove relatório do storage.
     */
    deleteReport(reportId: string): Promise<void>;
}

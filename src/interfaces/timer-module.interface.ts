export interface TimerModule {
  /**
   * Inicia temporizador para uma interação.
   */
  startTimer(ticketId: string, userId: string): Promise<string>; // retorna timerId

  /**
   * Pausa temporizador.
   */
  pauseTimer(timerId: string): Promise<void>;

  /**
   * Retoma temporizador pausado.
   */
  resumeTimer(timerId: string): Promise<void>;

  /**
   * Finaliza temporizador.
   */
  stopTimer(timerId: string): Promise<void>;

  /**
   * Exibe tempo por interação.
   */
  getInteractionTimes(ticketId: string): Promise<{ userId: string; duration: number }[]>;

  /**
   * Calcula tempo total por chamado.
   */
  getTotalTime(ticketId: string): Promise<number>;
} 
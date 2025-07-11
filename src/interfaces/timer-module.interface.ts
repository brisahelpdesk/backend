export interface TimerModule {
  /**
   * Starts a timer for a ticket interaction.
   * @throws {TicketNotFoundException} If ticket does not exist
   * @throws {UserNotFoundException} If user does not exist
   */
  startTimer(ticketId: string, userId: string): Promise<{ timerId: string; startedAt: Date }>;

  /**
   * Pauses a timer.
   * @throws {TimerNotFoundException} If timer does not exist
   * @throws {InvalidTimerStateException} If timer cannot be paused
   */
  pauseTimer(timerId: string): Promise<{ paused: boolean; pausedAt: Date }>;

  /**
   * Resumes a paused timer.
   * @throws {TimerNotFoundException} If timer does not exist
   * @throws {InvalidTimerStateException} If timer cannot be resumed
   */
  resumeTimer(timerId: string): Promise<{ resumed: boolean; resumedAt: Date }>;

  /**
   * Stops a timer.
   * @throws {TimerNotFoundException} If timer does not exist
   * @throws {InvalidTimerStateException} If timer cannot be stopped
   */
  stopTimer(timerId: string): Promise<{ stopped: boolean; stoppedAt: Date; duration: number }>;

  /**
   * Retrieves interaction times for a ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  getInteractionTimes(ticketId: string): Promise<Array<{
    userId: string;
    duration: number;
    timerId: string;
    startedAt: Date;
    stoppedAt: Date;
  }>>;

  /**
   * Calculates total time spent on a ticket.
   * @throws {TicketNotFoundException} If ticket does not exist
   */
  getTotalTime(ticketId: string): Promise<{ totalDuration: number }>;
} 
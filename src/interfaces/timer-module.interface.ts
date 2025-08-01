export interface TimerModule {
    /**
     * Starts a timer.
     */
    startTimer(): Promise<{ timerId: string; startedAt: Date }>;

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
    resumeTimer(
        timerId: string,
    ): Promise<{ resumed: boolean; resumedAt: Date }>;

    /**
     * Stops a timer.
     * @throws {TimerNotFoundException} If timer does not exist
     * @throws {InvalidTimerStateException} If timer cannot be stopped
     */
    stopTimer(
        timerId: string,
    ): Promise<{ stopped: boolean; stoppedAt: Date; duration: number }>;
}

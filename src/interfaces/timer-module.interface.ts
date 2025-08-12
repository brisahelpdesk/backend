import { TimerResponseDto } from "src/modules/timer/dto/timer-response.dto";

export interface TimerModule {
    /**
     * Starts a timer.
     */
    startTimer(): Promise<TimerResponseDto>;

    /**
     * Pauses a timer.
     * @throws {TimerNotFoundException} If timer does not exist
     * @throws {InvalidTimerStateException} If timer cannot be paused
     */
    pauseTimer(timerId: string): Promise<TimerResponseDto>;

    /**
     * Resumes a paused timer.
     * @throws {TimerNotFoundException} If timer does not exist
     * @throws {InvalidTimerStateException} If timer cannot be resumed
     */
    resumeTimer(
        timerId: string,
    ): Promise<TimerResponseDto>;

    /**
     * Stops a timer.
     * @throws {TimerNotFoundException} If timer does not exist
     * @throws {InvalidTimerStateException} If timer cannot be stopped
     */
    stopTimer(
        timerId: string,
    ): Promise<TimerResponseDto>;
}

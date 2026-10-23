// Step 1: CLOSED <-> OPEN 상태만 다루는 기본 Circuit Breaker
// TODO 표시된 부분을 채워 넣으세요. 상태 전이 로직 외의 것은 신경 쓰지 마세요.

const CircuitState = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
} as const;

export type CircuitState = (typeof CircuitState)[keyof typeof CircuitState];

export interface CircuitBreakerOptions {
  /** 이 횟수만큼 연속 실패하면 OPEN 상태로 전환 */
  windowSize?: number;
  minimumCalls?: number;
  failureRateThreshold?: number;
  resetTimeoutMs?: number;
}

type WindowRes = "success" | "failure";

export class CircuitBreaker {
  private readonly options: CircuitBreakerOptions;
  private state: CircuitState = "CLOSED";
  private halfOpenTrialInFlight: boolean = false;
  private windowArr: WindowRes[] = [];
  private timestamp: number = 0;

  constructor(options: CircuitBreakerOptions) {
    this.options = {
      resetTimeoutMs: options.resetTimeoutMs ?? 10000,
      failureRateThreshold: options.failureRateThreshold ?? 0.5,
      minimumCalls: options.minimumCalls ?? 10,
      windowSize: options.windowSize ?? 10,
    };
  }

  isHalfOpenTrialInFlight(): boolean {
    return this.halfOpenTrialInFlight;
  }

  setHalfOpenTrialInFlight(inFlight: boolean): void {
    this.halfOpenTrialInFlight = inFlight;
  }

  recordTimestamp(): void {
    this.timestamp = Date.now();
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getState(): CircuitState {
    return this.state;
  }

  setState(state: CircuitState): void {
    this.state = state;
  }

  resetWindowCount(): void {
    this.windowArr = [];
  }

  incrementWindowCount(ws: WindowRes): void {
    if (this.windowArr.length >= (this.options.windowSize ?? 10)) {
      this.windowArr.shift();
    }
    this.windowArr.push(ws);
  }

  getWindowCount(): number {
    return this.windowArr.length;
  }

  isFailureRateExceeded(threshold: number): boolean {
    const failureCount = this.windowArr.filter((ws) => ws === "failure").length;
    const totalCount = this.windowArr.length;
    return totalCount > 0 && failureCount / totalCount >= threshold;
  }

  /**
   * fn을 실행합니다.
   * - CLOSED 상태: fn을 실행한다. 성공하면 실패 카운트를 리셋한다.
   *   실패하면 실패 카운트를 올리고, 임계치를 넘으면 OPEN으로 전환한다.
   *   실패 시 에러를 그대로 던진다(rethrow).
   * - OPEN 상태: fn을 실행하지 않고 즉시 에러를 던진다 (예: new Error("Circuit is OPEN")).
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    const initialState = this.getState();
    if (initialState === CircuitState.OPEN) {
      if (
        Date.now() - this.getTimestamp() >
        (this.options.resetTimeoutMs ?? 10000)
      ) {
        this.setState(CircuitState.HALF_OPEN);
        this.setHalfOpenTrialInFlight(true);
      } else {
        throw new Error("Circuit is OPEN");
      }
    } else if (initialState === CircuitState.HALF_OPEN) {
      if (this.isHalfOpenTrialInFlight()) {
        throw new Error("Half-open trial already in flight");
      }
      this.resetWindowCount();
      this.setHalfOpenTrialInFlight(true);
    }

    try {
      const result = await fn();

      if (
        initialState === CircuitState.OPEN ||
        initialState === CircuitState.HALF_OPEN
      ) {
        this.resetWindowCount();
      } else {
        this.incrementWindowCount("success");
      }

      this.setState(CircuitState.CLOSED);
      this.setHalfOpenTrialInFlight(false);
      return result;
    } catch (error) {
      const state = this.getState();
      if (state === CircuitState.HALF_OPEN) {
        this.setState(CircuitState.OPEN);
        this.recordTimestamp();
      } else {
        this.incrementWindowCount("failure");

        const isMinimumCallsReached =
          this.getWindowCount() >= (this.options.minimumCalls ?? 10);

        if (
          isMinimumCallsReached &&
          this.isFailureRateExceeded(this.options.failureRateThreshold ?? 0.5)
        ) {
          this.setState(CircuitState.OPEN);
          this.recordTimestamp();
        }
      }

      this.setHalfOpenTrialInFlight(false);
      throw error;
    }
  }
}

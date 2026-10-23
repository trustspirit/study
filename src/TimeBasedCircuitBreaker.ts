const FAILURE_THRESHOLD = 3; // Example threshold
const WINDOW_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export const CircuitState = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
} as const;

export type CircuitState = (typeof CircuitState)[keyof typeof CircuitState];

export interface Request {
  serviceId: string;
  path: string;
}

export interface Response<T> {
  status: number;
  body: T;
}

export interface HttpClient {
  execute<T>(request: Request): Promise<Response<T>>;
}

type FailureRecord = {
  failed: boolean;
  windowStart: number;
};

export class TimeBasedCircuitBreaker {
  private status: CircuitState;
  private failureCount: FailureRecord[];
  private halfOpenTrialInProgress: boolean;
  private openTimestamp: number | null = null;

  constructor(private readonly httpClient: HttpClient) {
    this.status = CircuitState.CLOSED;
    this.failureCount = [];
    this.halfOpenTrialInProgress = false;
  }

  private recordFailure(): void {
    const now = Date.now();
    this.failureCount.push({ failed: true, windowStart: now });

    if (this.failureCount.length > FAILURE_THRESHOLD) {
      this.failureCount.shift();
    }
  }

  private resetFailureCount(): void {
    this.openTimestamp = null;
    this.failureCount = [];
  }

  private isFailureThresholdReached(): boolean {
    const now = Date.now();
    // Filter failures within the window
    const recentFailures = this.failureCount.filter(
      (record) => record.failed && now - record.windowStart <= WINDOW_DURATION,
    );
    return recentFailures.length >= FAILURE_THRESHOLD;
  }

  private setToOpen(): void {
    if (
      this.status === CircuitState.HALF_OPEN ||
      this.isFailureThresholdReached()
    ) {
      this.status = CircuitState.OPEN;
      this.openTimestamp = Date.now();
      this.halfOpenTrialInProgress = false;
    }
  }

  async execute<T>(request: Request): Promise<Response<T>> {
    // TODO: Implement a per-service circuit breaker.
    // - Open a circuit after 3 failures within 10 minutes.
    // - Reject calls while OPEN for 5 minutes.
    // - Then allow exactly one HALF_OPEN trial call.
    // - Treat non-2xx responses and thrown errors as failures.

    if (this.status === CircuitState.OPEN) {
      const now = Date.now();
      if (this.openTimestamp && now - this.openTimestamp < 5 * 60 * 1000) {
        throw new Error("Circuit is open");
      } else {
        this.status = CircuitState.HALF_OPEN;
      }
      this.openTimestamp = null;
    }

    if (this.status === CircuitState.HALF_OPEN) {
      // Allow only one request in HALF_OPEN state
      if (this.halfOpenTrialInProgress) {
        throw new Error(
          "Circuit is half-open and trial request is in progress",
        );
      }
      this.halfOpenTrialInProgress = true;
    }
    try {
      const response = await this.httpClient.execute<T>(request);

      if (response.status < 200 || response.status >= 300) {
        this.recordFailure();
        this.setToOpen();
      } else if (this.status === CircuitState.HALF_OPEN) {
        this.status = CircuitState.CLOSED;
        this.resetFailureCount();
        this.halfOpenTrialInProgress = false;
      }
      return response;
    } catch (error) {
      // Handle the error, possibly marking the circuit as failed.
      this.recordFailure();
      this.setToOpen();

      throw error;
    }
  }
}

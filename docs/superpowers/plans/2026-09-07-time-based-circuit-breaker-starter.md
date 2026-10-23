# Time-Based Circuit Breaker Starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a strict TypeScript starter skeleton for a per-service time-based circuit breaker interview exercise.

**Architecture:** Keep the existing `src/CircuitBreaker.ts` counting-based example unchanged. Add a separate `TimeBasedCircuitBreaker` that owns a map of independently mutable service states. Declare the state, clock, configuration, public execution API, and private helper boundaries, but leave all behavior as explicit TODOs for the candidate to implement.

**Tech Stack:** TypeScript 5, Node.js, ts-node, strict compiler settings.

---

## File structure

- Create: `src/TimeBasedCircuitBreaker.ts` — interview starter skeleton for per-service circuit breaking.
- Create: `src/TimeBasedCircuitBreaker.test.ts` — commented acceptance scenarios for the candidate; no executable assertions while methods deliberately throw.
- No changes: `src/CircuitBreaker.ts` — retain the existing counting-based training example.

### Task 1: Add the interview starter skeleton

**Files:**

- Create: `src/TimeBasedCircuitBreaker.ts`

- [ ] **Step 1: Create the starter module with the following exact content**

```ts
export const CircuitState = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
} as const;

export type CircuitState = (typeof CircuitState)[keyof typeof CircuitState];

export interface CircuitBreakerOptions {
  failureThreshold: number;
  failureWindowMs: number;
  resetTimeoutMs: number;
}

export interface Clock {
  now(): number;
}

export interface ServiceCircuitState {
  state: CircuitState;
  failureTimestamps: number[];
  openedAt: number | null;
  halfOpenTrialInFlight: boolean;
}

export class CircuitOpenError extends Error {
  constructor(serviceId: string) {
    super(`Circuit is OPEN for service: ${serviceId}`);
    this.name = "CircuitOpenError";
  }
}

export class HalfOpenTrialInFlightError extends Error {
  constructor(serviceId: string) {
    super(`Half-open trial already in flight for service: ${serviceId}`);
    this.name = "HalfOpenTrialInFlightError";
  }
}

export class TimeBasedCircuitBreaker {
  private readonly states = new Map<string, ServiceCircuitState>();

  constructor(
    private readonly options: CircuitBreakerOptions,
    private readonly clock: Clock = { now: () => Date.now() },
  ) {}

  async execute<T>(
    serviceId: string,
    request: () => Promise<T>,
    isFailure: (response: T) => boolean,
  ): Promise<T> {
    // TODO: obtain the service state, prune expired failures, and decide whether
    // this call is allowed. OPEN calls are blocked until resetTimeoutMs elapses.
    // After that point, allow exactly one HALF_OPEN trial call.
    // TODO: invoke request. Treat a thrown error or isFailure(response) === true
    // as a failure. A successful HALF_OPEN trial closes the circuit and clears
    // failure history; a failed trial reopens the circuit.
    throw new Error("Not implemented");
  }

  getState(serviceId: string): CircuitState {
    return this.getOrCreateState(serviceId).state;
  }

  private getOrCreateState(serviceId: string): ServiceCircuitState {
    // TODO: create CLOSED state with empty failureTimestamps, null openedAt,
    // and halfOpenTrialInFlight false when this service has no state yet.
    throw new Error("Not implemented");
  }

  private pruneExpiredFailures(state: ServiceCircuitState, now: number): void {
    // TODO: retain failures where now - timestamp <= failureWindowMs.
  }

  private recordFailure(state: ServiceCircuitState, now: number): void {
    // TODO: prune, append now, and OPEN at failureThreshold failures.
    // When opening, set openedAt to now and clear halfOpenTrialInFlight.
  }

  private close(state: ServiceCircuitState): void {
    // TODO: set CLOSED, clear failureTimestamps, set openedAt to null, and clear
    // halfOpenTrialInFlight.
  }

  private reopen(state: ServiceCircuitState, now: number): void {
    // TODO: set OPEN, set openedAt to now, and clear halfOpenTrialInFlight.
  }
}
```

- [ ] **Step 2: Compile the starter module**

Run: `npx tsc --noEmit`

Expected: exit code 0. The `throw new Error("Not implemented")` statements are valid starter placeholders, and strict TypeScript compilation succeeds.

### Task 2: Document acceptance scenarios without making the TODO skeleton fail at runtime

**Files:**

- Create: `src/TimeBasedCircuitBreaker.test.ts`

- [ ] **Step 1: Add commented scenarios with the following exact content**

```ts
import { TimeBasedCircuitBreaker } from "./TimeBasedCircuitBreaker";

// Candidate acceptance scenarios after implementing TimeBasedCircuitBreaker:
//
// 1. Three failed calls to "service-b" within 10 minutes set it to OPEN.
// 2. An OPEN "service-b" rejects without invoking request.
// 3. "service-c" remains CLOSED after "service-b" opens.
// 4. At exactly resetTimeoutMs after opening, exactly one request may become the
//    HALF_OPEN trial; concurrent requests are rejected.
// 5. A successful HALF_OPEN trial closes the circuit and clears failures.
// 6. A failed HALF_OPEN trial returns the circuit to OPEN and resets openedAt.
// 7. A failure with now - timestamp === failureWindowMs is included in the window.
//
// Use an injected Clock such as:
// const clock = { now: () => currentTime };
// let currentTime = 0;
// const breaker = new TimeBasedCircuitBreaker(
//   { failureThreshold: 3, failureWindowMs: 600_000, resetTimeoutMs: 300_000 },
//   clock,
// );
void TimeBasedCircuitBreaker;
```

- [ ] **Step 2: Compile all source files**

Run: `npx tsc --noEmit`

Expected: exit code 0.

### Task 3: Review starter scope

**Files:**

- Review: `src/TimeBasedCircuitBreaker.ts`
- Review: `src/TimeBasedCircuitBreaker.test.ts`

- [ ] **Step 1: Verify requirements against the skeleton**

Confirm the module declares:

- a `Map` keyed by service ID, so Service B and Service C have independent state;
- chronological `failureTimestamps` for time-based threshold evaluation;
- `openedAt` for the five-minute open duration;
- `halfOpenTrialInFlight` for the single-trial rule;
- injected `Clock` to make boundary tests deterministic;
- TODO methods that leave the implementation exercise to the candidate.

- [ ] **Step 2: Run the final compilation check**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 3: Commit if Git is initialized later**

Run: `git add src/TimeBasedCircuitBreaker.ts src/TimeBasedCircuitBreaker.test.ts docs/superpowers/specs/2026-09-07-time-based-circuit-breaker-design.md docs/superpowers/plans/2026-09-07-time-based-circuit-breaker-starter.md && git commit -m "chore: add time-based circuit breaker starter"

Expected: a commit containing the starter skeleton, acceptance-scenario notes, design, and plan. Skip this step in the current workspace because it is not a Git repository.

## Self-review

- **Spec coverage:** Task 1 declares every required circuit state and per-service state field. The TODO descriptions specify the 3-failure time window, 5-minute opening duration via configurable timeouts, exactly one half-open trial, close/reset behavior, and thrown/non-2xx failure classification. Task 2 documents deterministic acceptance scenarios.
- **Placeholders:** All TODOs are intentional in the produced interview skeleton, not plan omissions. The plan itself contains complete source content and commands.
- **Type consistency:** `ServiceCircuitState`, `Clock`, `CircuitBreakerOptions`, and `TimeBasedCircuitBreaker` use the same names and signatures in both tasks.

# Time-Based Circuit Breaker Starter Design

## Goal

Provide an interview-practice TypeScript starter file for a per-service, time-based circuit breaker. It must contain interfaces, state definitions, and TODO method bodies but no functional circuit-breaker implementation.

## Requirements

- Each service has an independent circuit state.
- Three failures within a configurable time window open that service circuit.
- An open circuit rejects calls until its configurable reset timeout elapses.
- Exactly one half-open trial call may run at a time.
- A successful half-open trial closes the circuit and clears its failure history.
- A failed half-open trial reopens the circuit and restarts the reset timeout.
- A non-2xx HTTP response and a thrown request error count as failures; this is represented through a caller-supplied failure predicate.
- Time is read through an injected `Clock`, enabling deterministic tests without real delays.

## Structure

Create `src/TimeBasedCircuitBreaker.ts` without modifying the existing counting-based `CircuitBreaker.ts` example.

- `CircuitState`: `CLOSED`, `OPEN`, and `HALF_OPEN`.
- `CircuitBreakerOptions`: `failureThreshold`, `failureWindowMs`, and `resetTimeoutMs`.
- `Clock`: supplies `now(): number`.
- `ServiceCircuitState`: stores `state`, chronological `failureTimestamps`, `openedAt`, and `halfOpenTrialInFlight`.
- `TimeBasedCircuitBreaker`: owns `Map<string, ServiceCircuitState>` and exposes `execute` plus private helper TODOs for state lookup, expiration, failure recording, and state transition.

## Intentional Scope

This is a starter skeleton for the candidate to implement during the mock interview. Concurrency protection beyond the JavaScript event-loop-level `halfOpenTrialInFlight` flag, persistence across processes, retries, metrics, and request timeouts are out of scope.

## Validation

The starter file must compile under the repository's strict TypeScript configuration. Functional behavior tests are deferred until the candidate implements the TODO methods.

import { CircuitBreaker } from "./CircuitBreaker";

async function main() {
  const breaker = new CircuitBreaker({
    windowSize: 5,
    minimumCalls: 3,
    failureRateThreshold: 0.5,
    resetTimeoutMs: 100,
  });

  const succeed = async () => "ok";
  const fail = async () => {
    throw new Error("boom");
  };

  const call = async (label: string, fn: () => Promise<string>) => {
    try {
      const result = await breaker.execute(fn);
      console.log(
        `${label}: success -> ${result} (state=${breaker.getState()})`,
      );
    } catch (err) {
      console.log(
        `${label}: failed -> ${(err as Error).message} (state=${breaker.getState()})`,
      );
    }
  };

  await call("1 success", succeed);
  await call("2 failure", fail);
  await call("3 success", succeed);
  await call("4 failure -> OPEN", fail);
  await call("5 blocked", succeed);

  await new Promise((resolve) => setTimeout(resolve, 150));
  await call("6 HALF_OPEN success -> CLOSED", succeed);
  await call("7 post-recovery failure", fail);
}

main();

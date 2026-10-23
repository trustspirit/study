let failed = 0;
let total = 0;

export function expectEqual(
  name: string,
  actual: unknown,
  expected: unknown,
): void {
  total++;
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  if (!ok)
    console.log(
      `  expected: ${JSON.stringify(expected)}\n  actual  : ${JSON.stringify(actual)}`,
    );
}

export function done(): never {
  console.log(
    failed === 0 ? `\n모두 통과 (${total})` : `\n${failed}/${total}개 실패`,
  );
  process.exit(failed === 0 ? 0 : 1);
}

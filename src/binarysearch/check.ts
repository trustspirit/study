import { binarySearch, lowerBound } from "./solution";

let failed = 0;
const run = (name: string, actual: unknown, expected: unknown) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  if (!ok)
    console.log(
      `  expected: ${JSON.stringify(expected)}\n  actual  : ${JSON.stringify(actual)}`,
    );
};

const bs: { nums: number[]; target: number; expected: number }[] = [
  { nums: [], target: 1, expected: -1 },
  { nums: [5], target: 5, expected: 0 },
  { nums: [5], target: 3, expected: -1 },
  { nums: [1, 3, 5, 7, 9], target: 1, expected: 0 },
  { nums: [1, 3, 5, 7, 9], target: 9, expected: 4 },
  { nums: [1, 3, 5, 7, 9], target: 5, expected: 2 },
  { nums: [1, 3, 5, 7, 9], target: 4, expected: -1 },
  { nums: [1, 3, 5, 7, 9], target: 0, expected: -1 },
  { nums: [1, 3, 5, 7, 9], target: 10, expected: -1 },
  { nums: [-5, -2, 0, 3], target: -2, expected: 1 },
];
bs.forEach(({ nums, target, expected }, i) =>
  run(
    `binarySearch #${i + 1} (target=${target})`,
    binarySearch(nums, 0, nums.length - 1, target),
    expected,
  ),
);

// 중복 값이 있으면 어느 인덱스든 target 값을 가리키면 정답
const dup = [1, 2, 2, 2, 3];
const idx = binarySearch(dup, 0, dup.length - 1, 2);
run("binarySearch 중복 값", dup[idx] === 2, true);

// 큰 배열
const big = Array.from({ length: 1_000_000 }, (_, i) => i * 2);
run(
  "binarySearch 큰 배열(존재)",
  binarySearch(big, 0, big.length - 1, 777_776),
  388_888,
);
run(
  "binarySearch 큰 배열(없음)",
  binarySearch(big, 0, big.length - 1, 777_777),
  -1,
);

const lb: { nums: number[]; target: number; expected: number }[] = [
  { nums: [], target: 1, expected: 0 },
  { nums: [1, 2, 2, 2, 3], target: 2, expected: 1 },
  { nums: [1, 3, 5], target: 4, expected: 2 },
  { nums: [1, 3, 5], target: 0, expected: 0 },
  { nums: [1, 3, 5], target: 6, expected: 3 },
];
lb.forEach(({ nums, target, expected }, i) =>
  run(
    `lowerBound #${i + 1} (target=${target})`,
    lowerBound(nums, target),
    expected,
  ),
);

console.log(failed === 0 ? "\n모두 통과" : `\n${failed}개 실패`);
process.exit(failed === 0 ? 0 : 1);

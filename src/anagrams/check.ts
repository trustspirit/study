import { removeAnagrams } from "./solution";

const cases: { input: string[]; expected: string[] }[] = [
  { input: ["code", "doce", "ecdo", "framer", "frame"], expected: ["code", "frame", "framer"] },
  { input: ["poke", "pkoe", "okpe", "ekop"], expected: ["poke"] },
  { input: [], expected: [] },
  { input: ["a"], expected: ["a"] },
  { input: ["b", "a", "b", "a"], expected: ["a", "b"] },
  { input: ["abc", "abd", "bca", "dab"], expected: ["abc", "abd"] },
  { input: ["aab", "aba", "abb"], expected: ["aab", "abb"] },
  { input: Array.from({ length: 1000 }, () => "z".repeat(1000)), expected: ["z".repeat(1000)] },
];

let failed = 0;
cases.forEach(({ input, expected }, i) => {
  const actual = removeAnagrams([...input]);
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"} #${i + 1}`);
  if (!ok && input.length < 20) {
    console.log("  input   :", JSON.stringify(input));
    console.log("  expected:", JSON.stringify(expected));
    console.log("  actual  :", JSON.stringify(actual));
  }
});
console.log(failed === 0 ? "\n모두 통과" : `\n${failed}개 실패`);
process.exit(failed === 0 ? 0 : 1);

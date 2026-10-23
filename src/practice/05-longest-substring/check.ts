import { expectEqual, done } from "../runner";
import { lengthOfLongestSubstring } from "./solution";

const cases: [string, number][] = [
  ["abcabcbb", 3],
  ["bbbbb", 1],
  ["pwwkew", 3],
  ["", 0],
  ["abba", 2],
  ["dvdf", 3],
  ["a", 1],
];
cases.forEach(([s, e]) =>
  expectEqual(`"${s}"`, lengthOfLongestSubstring(s), e),
);
done();

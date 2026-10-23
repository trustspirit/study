import { expectEqual, done } from "../runner";
import { isValid } from "./solution";

const cases: [string, boolean][] = [
  ["()", true],
  ["()[]{}", true],
  ["(]", false],
  ["([)]", false],
  ["{[]}", true],
  ["", true],
  ["(", false],
  [")", false],
  ["((()))", true],
  ["(()", false],
];
cases.forEach(([s, e]) => expectEqual(`"${s}"`, isValid(s), e));
done();

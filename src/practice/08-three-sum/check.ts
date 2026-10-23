import { expectEqual, done } from "../runner";
import { threeSum } from "./solution";

const norm = (g: number[][]) =>
  g
    .map((t) => [...t].sort((a, b) => a - b))
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

expectEqual("기본", norm(threeSum([-1, 0, 1, 2, -1, -4])), [
  [-1, -1, 2],
  [-1, 0, 1],
]);
expectEqual("없음", norm(threeSum([0, 1, 1])), []);
expectEqual("0 세 개", norm(threeSum([0, 0, 0])), [[0, 0, 0]]);
expectEqual("0 네 개(중복 제거)", norm(threeSum([0, 0, 0, 0])), [[0, 0, 0]]);
expectEqual("같은 값 두 번", norm(threeSum([-2, 0, 1, 1, 2])), [
  [-2, 0, 2],
  [-2, 1, 1],
]);
expectEqual("빈 배열", norm(threeSum([])), []);
done();

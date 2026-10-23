import { expectEqual, done } from "../runner";
import { subarraySum } from "./solution";

expectEqual("기본", subarraySum([1, 1, 1], 2), 2);
expectEqual("[1,2,3], 3", subarraySum([1, 2, 3], 3), 2);
expectEqual("음수/0", subarraySum([1, -1, 0], 0), 3);
expectEqual("없음", subarraySum([1], 0), 0);
expectEqual("복합", subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7), 4);
expectEqual(
  "큰 입력",
  subarraySum(
    Array.from({ length: 100000 }, () => 1),
    2,
  ),
  99999,
);
done();

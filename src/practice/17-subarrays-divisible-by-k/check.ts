import { expectEqual, done } from "../runner";
import { subarraysDivByK } from "./solution";

expectEqual("기본", subarraysDivByK([4, 5, 0, -2, -3, 1], 5), 7);
expectEqual("음수 나머지", subarraysDivByK([-1, 2, 9], 2), 2);
expectEqual("모두 0", subarraysDivByK([0, 0, 0], 5), 6);
expectEqual("없음", subarraysDivByK([1, 1], 3), 0);
expectEqual("한 원소", subarraysDivByK([5], 5), 1);
expectEqual("음수인 배수", subarraysDivByK([-5], 5), 1);
expectEqual("k=1", subarraysDivByK([1, -2, 3], 1), 6);
expectEqual("빈 배열", subarraysDivByK([], 7), 0);
expectEqual("32비트 초과 결과", subarraysDivByK(Array<number>(100000).fill(0), 3), 5000050000);
done();
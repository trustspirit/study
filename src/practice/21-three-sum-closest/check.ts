import { expectEqual, done } from "../runner";
import { threeSumClosest } from "./solution";

expectEqual("기본", threeSumClosest([-1, 2, 1, -4], 1), 2);
expectEqual("0 세 개", threeSumClosest([0, 0, 0], 1), 0);
expectEqual("정확한 합", threeSumClosest([-2, 0, 1, 3], 2), 2);
expectEqual("세 원소뿐", threeSumClosest([5, -2, 7], -100), 10);
expectEqual("동점이면 작은 합", threeSumClosest([0, 2, 4, 6], 7), 6);
expectEqual("중복 값", threeSumClosest([1, 1, 1, 0], 100), 3);
expectEqual("음수 target", threeSumClosest([-5, -2, -1, 4], -7), -8);
expectEqual("내림차순 입력", threeSumClosest([8, 6, 4, 2], 11), 12);
expectEqual("큰 입력", threeSumClosest(Array<number>(1000).fill(100), -10000), 300);
done();
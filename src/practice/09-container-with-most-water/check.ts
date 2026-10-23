import { expectEqual, done } from "../runner";
import { maxArea } from "./solution";

expectEqual("기본", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
expectEqual("[1,1]", maxArea([1, 1]), 1);
expectEqual("[4,3,2,1,4]", maxArea([4, 3, 2, 1, 4]), 16);
expectEqual("[1,2,1]", maxArea([1, 2, 1]), 2);
expectEqual("큰 입력", maxArea(Array.from({ length: 100000 }, () => 1)), 99999);
done();

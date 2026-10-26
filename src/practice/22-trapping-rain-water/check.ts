import { expectEqual, done } from "../runner";
import { trap } from "./solution";

expectEqual("문제 예시", trap([3, 0, 2, 0, 4]), 7);
expectEqual("여러 웅덩이", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
expectEqual("큰 웅덩이", trap([4, 2, 0, 3, 2, 5]), 9);
expectEqual("오름차순", trap([1, 2, 3, 4]), 0);
expectEqual("내림차순", trap([4, 3, 2, 1]), 0);
expectEqual("평평함", trap([2, 2, 2]), 0);
expectEqual("벽이 두 개뿐", trap([2, 0, 2]), 2);
expectEqual("빈 입력", trap([]), 0);
expectEqual("한 칸", trap([9]), 0);
expectEqual("32비트 초과 결과", trap([100000, ...Array<number>(99998).fill(0), 100000]), 9999800000);
done();
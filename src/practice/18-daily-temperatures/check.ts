import { expectEqual, done } from "../runner";
import { dailyTemperatures } from "./solution";

expectEqual("기본", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0]);
expectEqual("계속 상승", dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
expectEqual("계속 하락", dailyTemperatures([60, 50, 40]), [0, 0, 0]);
expectEqual("같은 기온", dailyTemperatures([30, 30, 30]), [0, 0, 0]);
expectEqual("같은 기온을 건너뜀", dailyTemperatures([30, 30, 31]), [2, 1, 0]);
expectEqual("여러 날을 한 번에 해결", dailyTemperatures([50, 40, 30, 60]), [3, 2, 1, 0]);
expectEqual("하나", dailyTemperatures([0]), [0]);
expectEqual("빈 배열", dailyTemperatures([]), []);
const largeResult = dailyTemperatures(Array<number>(100000).fill(30));
expectEqual("큰 입력: 길이", largeResult.length, 100000);
expectEqual("큰 입력: 값", largeResult.length === 100000 && largeResult.every((n) => n === 0), true);
done();
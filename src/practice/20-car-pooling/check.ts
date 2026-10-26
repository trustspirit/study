import { expectEqual, done } from "../runner";
import { carPooling } from "./solution";

expectEqual("정원 초과", carPooling([[2, 1, 5], [3, 3, 7]], 4), false);
expectEqual("정원과 같음", carPooling([[2, 1, 5], [3, 3, 7]], 5), true);
expectEqual("하차 후 승차", carPooling([[3, 5, 7], [2, 1, 5]], 3), true);
expectEqual("동시 승차", carPooling([[2, 1, 5], [3, 1, 7]], 4), false);
expectEqual("승객이 없음", carPooling([], 1), true);
expectEqual("한 운송부터 정원 초과", carPooling([[6, 0, 1]], 5), false);
expectEqual("정렬 안 된 입력", carPooling([[3, 8, 10], [2, 1, 5], [2, 4, 9]], 5), true);
expectEqual("넓은 위치 범위", carPooling([[1, 0, 1000000000], [1, 999999999, 1000000000]], 1), false);
expectEqual("경계에서 여러 하차와 승차", carPooling([[2, 1, 5], [3, 2, 5], [5, 5, 8]], 5), true);
done();
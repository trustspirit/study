import { expectEqual, done } from "../runner";
import { topKFrequent } from "./solution";

const s = (a: number[]) => [...a].sort((x, y) => x - y);

expectEqual("기본", s(topKFrequent([1, 1, 1, 2, 2, 3], 2)), [1, 2]);
expectEqual("원소 1개", s(topKFrequent([1], 1)), [1]);
expectEqual("k=2", s(topKFrequent([4, 4, 4, 5, 5, 6, 6, 6, 6, 7], 2)), [4, 6]);
expectEqual("음수 포함", s(topKFrequent([-1, -1, 2, 2, 2, 3], 1)), [2]);
expectEqual("k=전체 종류 수", s(topKFrequent([1, 2, 3], 3)), [1, 2, 3]);
done();

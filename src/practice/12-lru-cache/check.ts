import { expectEqual, done } from "../runner";
import { LRUCache } from "./solution";

const a = new LRUCache(2);
a.put(1, 1);
a.put(2, 2);
expectEqual("get(1)", a.get(1), 1);
a.put(3, 3); // 2 제거
expectEqual("get(2) 제거됨", a.get(2), -1);
a.put(4, 4); // 1 제거
expectEqual("get(1) 제거됨", a.get(1), -1);
expectEqual("get(3)", a.get(3), 3);
expectEqual("get(4)", a.get(4), 4);

const b = new LRUCache(2);
b.put(1, 1);
b.put(2, 2);
b.put(1, 10); // 갱신 + 최근 사용
b.put(3, 3); // 2 제거
expectEqual("갱신된 값", b.get(1), 10);
expectEqual("갱신 시 순서 반영", b.get(2), -1);

const c = new LRUCache(1);
c.put(1, 1);
c.put(2, 2);
expectEqual("용량 1: 이전 키 제거", c.get(1), -1);
expectEqual("용량 1: 새 키", c.get(2), 2);
done();

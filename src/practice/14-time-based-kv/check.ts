import { expectEqual, done } from "../runner";
import { TimeMap } from "./solution";

const m = new TimeMap();
m.set("foo", "bar", 1);
expectEqual("정확히 일치", m.get("foo", 1), "bar");
expectEqual("이후 시각", m.get("foo", 3), "bar");
m.set("foo", "bar2", 4);
expectEqual("새 값", m.get("foo", 4), "bar2");
expectEqual("새 값 이후", m.get("foo", 5), "bar2");
expectEqual("이전 값", m.get("foo", 3), "bar");
expectEqual("첫 시각보다 이전", m.get("foo", 0), "");
expectEqual("없는 key", m.get("none", 1), "");

const big = new TimeMap();
for (let i = 1; i <= 100000; i++) big.set("k", String(i), i);
expectEqual("큰 입력", big.get("k", 77777), "77777");
done();

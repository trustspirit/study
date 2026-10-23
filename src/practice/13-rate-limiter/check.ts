import { expectEqual, done } from "../runner";
import { RateLimiter } from "./solution";

const r = new RateLimiter(3, 1000);
expectEqual("u@0", r.allow("u", 0), true);
expectEqual("u@100", r.allow("u", 100), true);
expectEqual("u@200", r.allow("u", 200), true);
expectEqual("u@300 초과", r.allow("u", 300), false);
expectEqual("v@300 다른 사용자", r.allow("v", 300), true);
expectEqual("u@1000 (0은 윈도우 밖)", r.allow("u", 1000), true);
expectEqual("u@1050 초과", r.allow("u", 1050), false);
expectEqual("u@1100 (100은 윈도우 밖)", r.allow("u", 1100), true);
expectEqual("u@5000 윈도우 리셋", r.allow("u", 5000), true);

const one = new RateLimiter(1, 10);
expectEqual("limit=1 첫 요청", one.allow("x", 0), true);
expectEqual("limit=1 즉시 재요청", one.allow("x", 9), false);
expectEqual("limit=1 윈도우 경계", one.allow("x", 10), true);
done();

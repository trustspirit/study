import { expectEqual, done } from "../runner";
import { characterReplacement } from "./solution";

expectEqual("기본", characterReplacement("AABABBA", 1), 4);
expectEqual("전체를 같은 문자로", characterReplacement("ABAB", 2), 4);
expectEqual("교체 불가", characterReplacement("AABBB", 0), 3);
expectEqual("모두 같은 문자", characterReplacement("AAAA", 2), 4);
expectEqual("모두 다른 문자", characterReplacement("ABCDE", 1), 2);
expectEqual("중간의 긴 구간", characterReplacement("BAAAB", 1), 4);
expectEqual("한 글자", characterReplacement("Z", 0), 1);
expectEqual("빈 문자열", characterReplacement("", 0), 0);
expectEqual("k가 길이와 같음", characterReplacement("ABCD", 4), 4);
expectEqual("큰 입력", characterReplacement("AB".repeat(50000), 1), 3);
done();
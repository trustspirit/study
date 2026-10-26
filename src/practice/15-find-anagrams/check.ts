import { expectEqual, done } from "../runner";
import { findAnagrams } from "./solution";

expectEqual("기본", findAnagrams("cbaebabacd", "abc"), [0, 6]);
expectEqual("겹치는 구간", findAnagrams("abab", "ab"), [0, 1, 2]);
expectEqual("문자별 개수", findAnagrams("aaab", "aab"), [1]);
expectEqual("차이의 합만 0이면 불일치", findAnagrams("aa", "ab"), []);
expectEqual("패턴 밖 문자가 빠진 뒤 일치", findAnagrams("xdfwe", "we"), [3]);
expectEqual("모두 같은 문자", findAnagrams("aaaa", "aa"), [0, 1, 2]);
expectEqual("일치 없음", findAnagrams("abc", "dd"), []);
expectEqual("p가 더 김", findAnagrams("ab", "abc"), []);
expectEqual("빈 s", findAnagrams("", "a"), []);
expectEqual("같은 길이", findAnagrams("bca", "abc"), [0]);
expectEqual("한 글자", findAnagrams("abaca", "a"), [0, 2, 4]);
expectEqual("큰 입력: 결과 개수", findAnagrams("a".repeat(30000), "aa").length, 29999);
done();
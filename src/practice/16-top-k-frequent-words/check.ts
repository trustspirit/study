import { expectEqual, done } from "../runner";
import { topKFrequentWords } from "./solution";

expectEqual("기본", topKFrequentWords(["i", "love", "coding", "i", "love", "shop"], 2), ["i", "love"]);
expectEqual("빈도 우선", topKFrequentWords(["z", "z", "z", "a", "a", "b"], 2), ["z", "a"]);
expectEqual("입력 순서와 다른 동점 순서", topKFrequentWords(["banana", "apple", "cherry"], 2), ["apple", "banana"]);
expectEqual("접두어 동점", topKFrequentWords(["abc", "ab", "a"], 3), ["a", "ab", "abc"]);
expectEqual("경계에서 동점", topKFrequentWords(["b", "a", "b", "a", "c", "c"], 2), ["a", "b"]);
expectEqual("하나", topKFrequentWords(["order"], 1), ["order"]);
expectEqual("k=0", topKFrequentWords(["order", "order"], 0), []);
expectEqual("빈 입력", topKFrequentWords([], 0), []);
expectEqual("큰 입력", topKFrequentWords([...Array<string>(50000).fill("stock"), "coupon"], 1), ["stock"]);
done();
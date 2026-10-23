import { expectEqual, done } from "../runner";
import { groupAnagrams } from "./solution";

const norm = (g: string[][]) =>
  g
    .map((x) => [...x].sort())
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

expectEqual(
  "기본",
  norm(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])),
  [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
);
expectEqual("빈 배열", norm(groupAnagrams([])), []);
expectEqual("빈 문자열", norm(groupAnagrams([""])), [[""]]);
expectEqual("한 글자", norm(groupAnagrams(["a"])), [["a"]]);
expectEqual("모두 다름", norm(groupAnagrams(["ab", "cd"])), [["ab"], ["cd"]]);
expectEqual("중복 문자열", norm(groupAnagrams(["a", "a"])), [["a", "a"]]);
done();

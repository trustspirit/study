// [해시맵] Group Anagrams
// 문자열 배열을 애너그램끼리 묶어 반환. 그룹/그룹 내 순서는 상관없음.
// 입력: ["eat","tea","tan","ate","nat","bat"] -> [["eat","tea","ate"],["tan","nat"],["bat"]]
export function groupAnagrams(strs: string[]): string[][] {
  // sort each strings and generate string map
  const map: Map<string, string[]> = new Map();

  // create map and grouping the origial to the map

  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (!map.has(str)) {
      map.set(str, []);
    }
    map.get(sorted)!.push(str);
  }

  const result: string[][] = [];

  for (const key of map.keys()) {
    result.push(map.get(key)!);
  }

  return result;
}

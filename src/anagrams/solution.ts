// 문제: 이전 문자열의 애너그램인 문자열을 제거(첫 등장만 유지)한 뒤 오름차순 정렬하여 반환
export function removeAnagrams(text: string[]): string[] {
  const seen = new Set<string>();
  const res: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const sorted = text[i].split("").sort().join("");
    if (!seen.has(sorted)) {
      seen.add(sorted);
      res.push(text[i]);
    }
  }

  res.sort();

  return res;
}

// 입력 형식: 첫 줄 n, 다음 n줄에 문자열
// 실행: npx ts-node src/anagrams/solution.ts < input.txt
if (require.main === module) {
  const lines = require("fs")
    .readFileSync(0, "utf8")
    .split("\n")
    .map((l: string) => l.trim());
  const n = parseInt(lines[0] || "0", 10);
  const text = lines.slice(1, 1 + n);
  console.log(JSON.stringify(removeAnagrams(text)));
}

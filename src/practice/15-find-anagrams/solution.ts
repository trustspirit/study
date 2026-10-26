// [30분 연습] 모든 애너그램 위치 찾기
// 문자열 s에서 p의 애너그램인 연속 부분 문자열의 시작 인덱스를 오름차순으로 반환하세요.
// 서로 겹치는 구간도 포함하며, 문자의 등장 횟수까지 같아야 합니다.
// 예: s="cbaebabacd", p="abc" -> [0, 6]
// 제약: 0 <= s.length <= 30000, 1 <= p.length <= 30000, 소문자 a-z만 포함.
// p가 s보다 길면 []. 목표 시간 O(s.length + p.length).
export function findAnagrams(s: string, p: string): number[] {
  if (p.length > s.length) return [];

  // 양수는 부족한 개수, 음수는 초과한 개수입니다.
  const remainingCounts = new Map<string, number>();

  for (const char of p) {
    remainingCounts.set(char, (remainingCounts.get(char) ?? 0) + 1);
  }

  for (let i = 0; i < p.length; i++) {
    const char = s[i];
    remainingCounts.set(char, (remainingCounts.get(char) ?? 0) - 1);
  }

  const result: number[] = [];
  for (let start = 0; start <= s.length - p.length; start++) {
    if ([...remainingCounts.values()].every((count) => count === 0)) {
      result.push(start);
    }

    const next = start + p.length;
    if (next < s.length) {
      const leavingChar = s[start];
      const enteringChar = s[next];
      remainingCounts.set(
        leavingChar,
        (remainingCounts.get(leavingChar) ?? 0) + 1,
      );
      remainingCounts.set(
        enteringChar,
        (remainingCounts.get(enteringChar) ?? 0) - 1,
      );
    }
  }

  return result;
}

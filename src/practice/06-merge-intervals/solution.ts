// [구간/정렬] Merge Intervals
// 겹치는 구간을 병합해 시작 시각 오름차순으로 반환. 입력은 정렬되어 있지 않을 수 있음.
// 끝과 시작이 같으면([1,4],[4,5]) 겹치는 것으로 본다.
// [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]
export function merge(intervals: number[][]): number[][] {
  // sorted
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];
  let current = sorted[0];

  if (!current) return [];

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];

    if (current[1] >= next[0]) {
      current = [current[0], Math.max(current[1], next[1])];
    } else {
      merged.push(current);
      current = next;
    }
  }

  merged.push(current);

  return merged;
}

// [해시맵/카운팅] Top K Frequent Elements
// 가장 많이 등장한 k개의 값을 반환. 순서는 상관없음. 정답은 유일하다고 가정.
// 입력: nums=[1,1,1,2,2,3], k=2 -> [1,2]
// 목표: O(n log n)보다 좋게 (버킷 정렬 등)
export function topKFrequent(nums: number[], k: number): number[] {
  const countMap = new Map<number, number>();

  for (const num of nums) {
    if (!countMap.has(num)) {
      countMap.set(num, 1);
    } else {
      countMap.set(num, countMap.get(num)! + 1);
    }
  }

  const bucket: number[][] = Array.from({ length: nums.length + 1 }, () => []);

  for (const [num, cnt] of countMap) {
    bucket[cnt].push(num);
  }

  const result: number[] = [];
  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...bucket[i]);
  }
  return result.slice(0, k);
}

// [해시맵/누적합] Subarray Sum Equals K
// 합이 k인 연속 부분 배열의 개수를 반환. nums에는 음수/0이 있을 수 있음.
// 입력: nums=[1,1,1], k=2 -> 2
export function subarraySum(nums: number[], k: number): number {
  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, 1);
  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;
    if (prefixSumMap.has(sum - k)) {
      count += prefixSumMap.get(sum - k)!;
    }
    prefixSumMap.set(sum, (prefixSumMap.get(sum) ?? 0) + 1);
  }

  return count;
}

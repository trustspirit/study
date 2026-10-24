// [투 포인터] 3Sum
// 합이 0인 서로 다른 세 원소의 조합을 중복 없이 반환. 순서는 상관없음.
// [-1,0,1,2,-1,-4] -> [[-1,-1,2],[-1,0,1]]
export function threeSum(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];

  for (let first = 0; first < sorted.length - 2; first++) {
    if (sorted[first] > 0) break;

    if (first > 0 && sorted[first] === sorted[first - 1]) continue;

    let second = first + 1; // forward
    let third = sorted.length - 1; // backward

    while (second < third) {
      const sum = sorted[first] + sorted[second] + sorted[third];

      if (sum === 0) {
        result.push([sorted[first], sorted[second], sorted[third]]);
        while (second < third && sorted[second] === sorted[second + 1]) second++;
        while (second < third && sorted[third] === sorted[third - 1]) third--;
        second++;
        third--;
      } else if (sum < 0) {
        second++;
      } else {
        third--;
      }
    }
  }

  return result;
}

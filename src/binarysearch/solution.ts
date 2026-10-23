// 오름차순 정렬된 arr의 [l, r] 구간(양 끝 포함)에서 x의 인덱스를 반환, 없으면 -1
export function binarySearch(
  arr: number[],
  l: number,
  r: number,
  x: number,
): number {
  const mid = Math.floor((l + r) / 2);

  if (l > r) return -1;

  if (x === arr[mid]) return mid;
  if (x < arr[mid]) return binarySearch(arr, l, mid - 1, x);
  if (x > arr[mid]) return binarySearch(arr, mid + 1, r, x);

  return -1;
}

// 보너스: target 이상인 첫 위치(lower bound)를 반환, 모두 작으면 nums.length
export function lowerBound(nums: number[], target: number): number {
  return -1;
}

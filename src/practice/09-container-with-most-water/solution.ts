// [투 포인터] Container With Most Water
// height[i]는 x=i 위치 선의 높이. 두 선과 x축으로 만들 수 있는 가장 큰 물의 양(넓이)을 반환.
// [1,8,6,2,5,4,8,3,7] -> 49
export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);

    if (maxArea < area) {
      maxArea = area;
    }

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

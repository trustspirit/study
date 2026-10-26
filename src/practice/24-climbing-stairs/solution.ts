// [DP] Climbing Stairs
// n개의 계단을 오를 때 한 번에 1칸 또는 2칸씩 올라갈 수 있다.
// 꼭대기에 도달하는 서로 다른 방법의 수를 반환한다.
// 예: n=3 -> 3 (1+1+1, 1+2, 2+1)
// 제약: 1 <= n <= 45. 목표 시간 O(n).
export function climbStairs(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;
  let a = 1,
    b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

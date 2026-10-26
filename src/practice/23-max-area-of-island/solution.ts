// [30분 연습] 가장 큰 섬의 넓이
// 직사각형 grid에서 1은 땅, 0은 물입니다. 상하좌우로 이어진 가장 큰 섬의 칸 수를 반환하세요.
// 대각선은 연결되지 않습니다. 땅이 없으면 0입니다.
// 예: [[1,1,0],[0,1,0],[0,0,1]] -> 3
// 제약: 행과 열은 각각 최대 300, grid가 []이거나 [[]]일 수도 있습니다.
// 입력 grid는 수정해도 됩니다. 목표 시간 O(행 수 * 열 수).
export function maxAreaOfIsland(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const isValid = (r: number, c: number) => r >= 0 && r < rows && c >= 0 && c < cols;

  const stack = [] as [number, number][];
  let maxArea = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 0 || visited[row][col]) continue;

      let area = 0;
      stack.push([row, col]);
      visited[row][col] = true;
      while (stack.length > 0) {
        const [r, c] = stack.pop()!;

        area++;
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;

          if (isValid(nr, nc) && grid[nr][nc] === 1 && !visited[nr][nc]) {
            stack.push([nr, nc]);
            visited[nr][nc] = true;
          }
        }
      }
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

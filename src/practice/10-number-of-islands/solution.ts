// [BFS/DFS] Number of Islands
// grid의 "1"은 땅, "0"은 물. 상하좌우로 연결된 땅 덩어리(섬)의 개수를 반환.
export function numIslands(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  let islandCount = 0;

  const visited = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false),
  );

  const moves = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // up
    [1, 0], // down
  ];

  const isValid = (row: number, col: number) => {
    return (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[0].length &&
      grid[row][col] === '1' &&
      !visited[row][col]
    );
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (visited[row][col] || grid[row][col] === '0') {
        continue;
      }

      islandCount++;

      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        // move around to check if connected
        const [curRow, curCol] = stack.pop()!;

        for (const [mr, mc] of moves) {
          const mR = curRow + mr;
          const mC = curCol + mc;
          if (isValid(mR, mC)) {
            stack.push([mR, mC]);
            visited[mR][mC] = true;
          }
        }
      }
    }
  }

  return islandCount;
}

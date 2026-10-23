import { expectEqual, done } from "../runner";
import { numIslands } from "./solution";

const g = (rows: string[]) => rows.map((r) => r.split(""));

expectEqual("섬 1개", numIslands(g(["11110", "11010", "11000", "00000"])), 1);
expectEqual("섬 3개", numIslands(g(["11000", "11000", "00100", "00011"])), 3);
expectEqual("물만", numIslands(g(["0"])), 0);
expectEqual("땅 한 칸", numIslands(g(["1"])), 1);
expectEqual("빈 grid", numIslands([]), 0);
expectEqual("대각선은 연결 아님", numIslands(g(["10", "01"])), 2);
expectEqual(
  "큰 grid(스택 오버플로 주의)",
  numIslands(Array.from({ length: 300 }, () => Array(300).fill("1"))),
  1,
);
done();

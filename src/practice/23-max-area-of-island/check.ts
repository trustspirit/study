import { expectEqual, done } from "../runner";
import { maxAreaOfIsland } from "./solution";

expectEqual("기본", maxAreaOfIsland([[1, 1, 0], [0, 1, 0], [0, 0, 1]]), 3);
expectEqual("여러 섬 중 최대", maxAreaOfIsland([[1, 0, 1, 1], [1, 0, 1, 1], [0, 0, 0, 0]]), 4);
expectEqual("대각선은 연결 아님", maxAreaOfIsland([[1, 0], [0, 1]]), 1);
expectEqual("모두 물", maxAreaOfIsland([[0, 0], [0, 0]]), 0);
expectEqual("한 칸", maxAreaOfIsland([[1]]), 1);
expectEqual("한 행", maxAreaOfIsland([[1, 1, 0, 1, 1, 1]]), 3);
expectEqual("빈 grid", maxAreaOfIsland([]), 0);
expectEqual("빈 행", maxAreaOfIsland([[]]), 0);
expectEqual("큰 섬: 재귀 깊이 주의", maxAreaOfIsland(Array.from({ length: 300 }, () => Array<number>(300).fill(1))), 90000);
done();
import { expectEqual, done } from "../runner";
import { merge } from "./solution";

expectEqual(
  "기본",
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]),
  [
    [1, 6],
    [8, 10],
    [15, 18],
  ],
);
expectEqual(
  "맞닿음",
  merge([
    [1, 4],
    [4, 5],
  ]),
  [[1, 5]],
);
expectEqual(
  "정렬 안 됨",
  merge([
    [1, 4],
    [0, 4],
  ]),
  [[0, 4]],
);
expectEqual(
  "포함",
  merge([
    [1, 4],
    [2, 3],
  ]),
  [[1, 4]],
);
expectEqual(
  "겹침 없음/역순",
  merge([
    [5, 6],
    [1, 2],
  ]),
  [
    [1, 2],
    [5, 6],
  ],
);
expectEqual("빈 배열", merge([]), []);
expectEqual(
  "하나로 합쳐짐",
  merge([
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
    [1, 10],
  ]),
  [[1, 10]],
);
done();

import { expectEqual, done } from "../runner";
import { minMeetingRooms } from "./solution";

expectEqual(
  "기본",
  minMeetingRooms([
    [0, 30],
    [5, 10],
    [15, 20],
  ]),
  2,
);
expectEqual(
  "겹침 없음",
  minMeetingRooms([
    [7, 10],
    [2, 4],
  ]),
  1,
);
expectEqual("빈 배열", minMeetingRooms([]), 0);
expectEqual(
  "맞닿음",
  minMeetingRooms([
    [1, 5],
    [5, 10],
  ]),
  1,
);
expectEqual(
  "모두 겹침",
  minMeetingRooms([
    [1, 5],
    [2, 6],
    [3, 7],
  ]),
  3,
);
expectEqual(
  "긴 회의 하나",
  minMeetingRooms([
    [1, 10],
    [2, 3],
    [4, 5],
    [6, 7],
  ]),
  2,
);
done();

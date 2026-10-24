// [구간/정렬] Meeting Rooms II
// [start, end] 회의 목록을 모두 진행하기 위해 필요한 최소 회의실 수를 반환.
// 한 회의의 end와 다른 회의의 start가 같으면 같은 방을 쓸 수 있다.
// [[0,30],[5,10],[15,20]] -> 2
export function minMeetingRooms(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
  let rooms = 0;
  let endIndex = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endIndex]) {
      rooms++;
    } else {
      endIndex++;
    }
  }

  return rooms;
}

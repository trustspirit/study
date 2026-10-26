// [30분 연습] 더 따뜻한 날까지 기다리는 일수
// 각 날짜에 대해 이후 처음으로 기온이 더 높은 날까지 며칠인지 반환하세요.
// 같은 기온은 더 따뜻한 날이 아닙니다. 이후 더 높은 날이 없으면 0입니다.
// 예: [73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]
// 제약: 0 <= temperatures.length <= 100000, 기온은 0~100인 정수.
// 결과 배열 길이는 입력과 같습니다. 목표 시간 O(n).
export function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const idx = stack.pop()!;
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}

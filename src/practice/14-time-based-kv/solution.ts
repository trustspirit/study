// [설계] Time Based Key-Value Store
// set(key, value, timestamp): 저장. 같은 key의 timestamp는 항상 증가하며 들어온다.
// get(key, timestamp): timestamp 이하 중 가장 늦은 시각의 값을 반환, 없으면 "".
// 힌트: key별 (timestamp, value) 배열 + 이진 탐색
export class TimeMap {
  set(key: string, value: string, timestamp: number): void {}

  get(key: string, timestamp: number): string {
    return "";
  }
}

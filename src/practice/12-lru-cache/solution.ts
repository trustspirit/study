// [설계] LRU Cache
// get/put 모두 평균 O(1)이어야 한다. (Map의 삽입 순서 활용 또는 해시맵 + 이중 연결 리스트)
// get(key): 있으면 값을 반환하고 "최근 사용"으로 갱신, 없으면 -1
// put(key, value): 삽입/갱신(최근 사용으로). 용량 초과 시 가장 오래 사용하지 않은 키를 제거
export class LRUCache {
  constructor(private capacity: number) {}

  get(key: number): number {
    return -1;
  }

  put(key: number, value: number): void {}
}

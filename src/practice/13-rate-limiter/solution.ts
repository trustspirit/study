// [설계] Rate Limiter (슬라이딩 윈도우 로그)
// 사용자별로 windowMs 동안 최대 limit회까지 허용한다.
// allow(userId, timestamp): 시각 t의 요청은 (t - windowMs, t] 구간에서 "허용된" 요청이 limit 미만일 때만 허용.
// 거부된 요청은 개수에 포함하지 않는다. timestamp는 사용자별로 증가(또는 같음)한다고 가정.
export class RateLimiter {
  constructor(
    private limit: number,
    private windowMs: number,
  ) {}

  allow(userId: string, timestamp: number): boolean {
    return false;
  }
}

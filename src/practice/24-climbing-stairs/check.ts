import { expectEqual, done } from '../runner';
import { climbStairs } from './solution';

expectEqual('한 계단', climbStairs(1), 1);
expectEqual('두 계단', climbStairs(2), 2);
expectEqual('세 계단', climbStairs(3), 3);
expectEqual('다섯 계단', climbStairs(5), 8);
expectEqual('열 계단', climbStairs(10), 89);
expectEqual('큰 입력', climbStairs(45), 1836311903);
done();

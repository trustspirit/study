import { expectEqual, done } from "../runner";
import { levelOrder, TreeNode } from "./solution";

// [3,9,20,null,null,15,7] 형태(LeetCode 방식)의 배열로 트리를 만든다
function build(vals: (number | null)[]): TreeNode | null {
  if (vals.length === 0 || vals[0] === null) return null;
  const root = new TreeNode(vals[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < vals.length) {
    const node = queue.shift()!;
    if (i < vals.length && vals[i] !== null)
      queue.push((node.left = new TreeNode(vals[i] as number)));
    i++;
    if (i < vals.length && vals[i] !== null)
      queue.push((node.right = new TreeNode(vals[i] as number)));
    i++;
  }
  return root;
}

expectEqual("기본", levelOrder(build([3, 9, 20, null, null, 15, 7])), [
  [3],
  [9, 20],
  [15, 7],
]);
expectEqual("노드 1개", levelOrder(build([1])), [[1]]);
expectEqual("빈 트리", levelOrder(build([])), []);
expectEqual("한쪽만 있음", levelOrder(build([1, 2, 3, 4, null, null, 5])), [
  [1],
  [2, 3],
  [4, 5],
]);
done();

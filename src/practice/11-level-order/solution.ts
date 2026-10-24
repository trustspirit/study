// [BFS] Binary Tree Level Order Traversal
// 이진 트리를 레벨 순서(위->아래, 왼->오)로 순회해 레벨별 배열로 반환.
export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

export function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  let head = 0;

  while (head < queue.length) {
    const levelEnd = queue.length;
    const level: number[] = [];

    while (head < levelEnd) {
      const node = queue[head++];
      level.push(node.val);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

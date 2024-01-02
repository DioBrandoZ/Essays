/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const ret = []

  const fn = (root, ret) => {
    if (!root) return
    const { val, left, right } = root
    fn(left, ret)
    ret.push(val)
    fn(right, ret)
  }

  fn(root, ret)

  return ret
};


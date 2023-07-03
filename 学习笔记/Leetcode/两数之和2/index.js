// 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。
// 它们的每个节点只存储一位数字。
// 将这两数相加会返回一个新的链表。

// 你可以假设除了数字 0 之外，这两个数字都不会以零开头。

// 输入：l1 = [7,2,4,3], l2 = [5,6,4]
// 输出：[7,8,0,7]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let s1 = '', s2 = ''
  while(l1) {
    s1 = `${s1}${l1.val}`
    l1 = l1.next
  }
  while(l2) {
    s2 = `${s2}${l2.val}`
    l2 = l2.next
  }

  const res = `${BigInt(s1) + BigInt(s2)}`
  const ret = new ListNode(res[0])
  let cur = ret
  
  for (let i = 1; i < res.length; i++) {
    cur.next = new ListNode(res[i])
    cur = cur.next
  }

  return ret
};
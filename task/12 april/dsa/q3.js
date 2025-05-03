/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    //   let nodes = []
    // let current = head

    // // Store nodes in array
    // while (current) {
    //     nodes.push(current)
    //     current = current.next
    // }

    // let indexToRemove = nodes.length - n

    // if (indexToRemove === 0) {
    //     // Remove head
    //     return head.next
    // }

    // // Remove the nth node
    // nodes[indexToRemove - 1].next = nodes[indexToRemove].next

    // return head


        let res = new ListNode(0, head);
    let dummy = res;

    for (let i = 0; i < n; i++) {
        head = head.next;
    }

    while (head) {
        head = head.next;
        dummy = dummy.next;
    }

    dummy.next = dummy.next.next;

    return res.next;    
    
};
// 4. **Question:** Rotate an integer array to the right by *k* positions.
    
//     **Input:** Array: `[1, 2, 3, 4, 5]`, k: `2`
    
//     **Expected Output:** `[4, 5, 1, 2, 3]`

let arr = [1, 2, 3, 4, 5]
let k = 2
let before = []
let after = []

// k = k % arr.length
// console.log(k)

for (let i = arr.length - k; i < arr.length; i++) {
    before.push(arr[i])
}
console.log(before )

for (let i = 0; i < arr.length - k; i++) {
    after.push(arr[i])
}
console.log(after )

let rotated = before.concat(after)
console.log(rotated)

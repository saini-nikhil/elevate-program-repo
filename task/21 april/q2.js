// 2. **Question:** Count how many times a given value appears in an array.
    
//     **Input:** Array: `[2, 3, 2, 4, 2]`, Value: `2`
    
//     **Expected Output:** `3`

let n = 2
let arr = [2, 3, 2, 4, 2]
let count = 0
for(let i = 0 ; i < arr.length ;i++){
    if(arr[i] == n){
        count++
    }
}
console.log(count)
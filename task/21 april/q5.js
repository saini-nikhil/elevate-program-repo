// 5. **Question:** Merge two sorted integer arrays into one sorted array.
    
//     **Input:** `[1, 3, 5]` and `[2, 4, 6]`
    
//     **Expected Output:** `[1, 2, 3, 4, 5, 6`


let arr1 = [1, 3, 5]
let arr2 = [2, 4, 6]
let res = arr1.concat(arr2)
console.log(res.sort((a,b)=> a -b))


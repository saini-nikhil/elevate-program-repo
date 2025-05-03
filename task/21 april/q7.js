// 7. Implement binary search on a sorted integer array; return the index of the target or -1 if not found.
    
//     **Input:** Array: `[1, 3, 5, 7, 9]`, Target: `7`
    
//     **Expected Output:** `3`

let arr = [1, 3, 5, 7, 9]
let target = 7
let left = 0
let right = arr.length - 1
let result = -1

while(left <= right){
    let mid = Math.floor((left + right)/2)
    if(arr[mid] == target){
        result = mid
        break
    }else if (arr[mid] < target) {
        left = mid + 1
    } else {
        right = mid - 1
    }
}
console.log(result)
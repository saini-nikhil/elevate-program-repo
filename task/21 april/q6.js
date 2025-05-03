// 6. **Question:** Find the second largest element in an integer array.
    
//     **Input:** `[7, 2, 9, 4, 9, 5]`
    
//     **Expected Output:** `7`

let arr = [7, 2, 9, 4, 9, 5]
// arr.sort((a,b) => a-b)
// console.log(arr)
// console.log(arr[arr.length -2]

// let lar = -Infinity
// let seclar = -Infinity
// for(let i = 0 ; i < arr.length ; i++){
//     if(arr[i] > lar){
//         seclar = lar 
//         lar = arr[i]
//     }else if(arr[i] > seclar && arr[i] !== lar){
//         seclar = arr[i]
//     }
// }

// console.log(seclar)

let set = new Set(arr)
let sortarr = [...set].sort((a,b) => a-b)
console.log(sortarr[sortarr.length - 2])
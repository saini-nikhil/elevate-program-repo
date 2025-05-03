// 15. **Question:** Calculate the sum of digits of a non-negative integer.
    
//     **Input:** `8472`
    
//     **Expected Output:** `21`

let n = 8472
let str = n.toString()
let res = 0
for(let i = 0 ; i < str.length; i++){
res = res + parseInt(str[i])
}

console.log(res)
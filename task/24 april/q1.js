// 1. **Question:** For each day’s temperature in an array, determine how many days you’d have to wait until a warmer day. If no warmer day comes, use 0.
    
//     **What’s happening?**
    
//     - You look forward from each index to find the next higher value.
//     - Count how many steps until that warmer temperature.
//     - If none exists, it stays 0.


t = [73, 74, 75, 71, 69, 72, 76, 73]

let res = new  Array(t.length).fill(0)

for(let i = 0 ; i < t.length ; i++){
    for(let j = i + 1 ; j < t.length ;j++){
        if(t[i] < t[j]){
            res[i] = j - i
            break
            
        }
    }
}
console.log(res)

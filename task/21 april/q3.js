// 3. **Question:** Remove all zeros from an integer array, preserving order.
    
//     **Input:** `[0, 1, 0, 2, 3, 0, 4]`
    
//     **Expected Output:** `[1, 2, 3, 4]`

arr = [0, 1, 0, 2, 3, 0, 4]
// arr.sort((a,b)=> a - b)
let res = []

for(let i = 0 ; i < arr.length ; i++){
    if(arr[i] == 0){
        continue 
    }else{
        res.push(arr[i])
        // console.log(arr[i])
    }
}
console.log(res)
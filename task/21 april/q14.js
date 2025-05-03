// 14. **Question:** Count the number of vowels in a string.
    
//     **Input:** `"implementation"`
    
//     **Expected Output:** `6`

let count = 0
let str = "implementation"
for(let i = 0 ; i <str.length ; i++){
    if(str[i] == "a" || str[i] == "e" || str[i] == "i" || str[i] == "o" || str[i] == "u"){
        count++
    }
}
console.log(count)
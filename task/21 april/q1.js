// 1. **Question:** Compute the factorial of a non-negative integer.
    
// **Input:** `5`

// **Expected Output:** `120`
let n = 5
let fact = 1
for(let i = 1 ; i <= n ;i++){
    fact *= i
}
console.log(fact)
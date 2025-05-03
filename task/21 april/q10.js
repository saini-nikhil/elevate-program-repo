// 10. **Question:** Remove all duplicate characters from a string, preserving first occurrences.
    
//     **Input:** `"programming"`
    
//     **Expected Output:** `"progamin"`

str = "programming"
    let result = ""
    for (let i = 0; i < str.length; i++) {
      let found = false
      for (let j = 0; j < i; j++) {
        if (str[i] === str[j]) {
          found = true
          break
        }
      }
      if (!found)
        result += str[i]
    }
  
  
  console.log(result)
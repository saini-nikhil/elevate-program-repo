/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(s) {
    //     let obj = {}
    // for(let i = 0 ; i < s.length ; i++){
    //     if(obj[s[i]] === undefined){
    //         obj[s[i]] = 1
    //     }else{
    //         obj[s[i]]++
    //     }
    // }
    // let str = ""
    // for(let key in obj){
        
    //     if(obj[key] == 2){
    //         continue
    //     }else{
    //         str += key
           
    //     }
    // }
    
    // return str
    
     let stack = [];
        
        for (let i = 0; i < s.length; i++) {
            let currentChar = s[i];
            
            if (stack.length > 0 && stack[stack.length - 1] === currentChar) {
                stack.pop(); 
            } else {
                stack.push(currentChar);
            }
        }
    
        return stack.join('');
    };
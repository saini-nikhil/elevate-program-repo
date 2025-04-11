/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
    // let myset = new Set()
    
    // for(let i = 0 ; i < s.length ; i++){
    //     let bag = ""
    //     for(let k = i ; k < s.length ; k++){
    //         bag+=s[k]
    //         myset.add(s[k])
           
    //     }
         
         
    // }
    // return myset.size
    
    let maxLength = 0;
    
        for (let i = 0; i < s.length; i++) {
            let seen = new Set();
            for (let j = i; j < s.length; j++) {
                if (seen.has(s[j])) {
                    break; 
                }
                seen.add(s[j]);
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    
        return maxLength;
    };
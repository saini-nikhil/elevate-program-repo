/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    //     if(nums.length == 0){
    //         return 0
    //     }
    //    nums.sort((a,b) => (a -b ))
    // // console.log(nums)
    // let count = 0
    
    // for(let i = 0 ; i < nums.length ; i++){
    //     if(nums[i] >= 0){
    //     if(nums[i]+1 ==  nums[i + 1]  ){
    //         // console.log(nums[i])
    //         count++
    //     }
    // }
    // }
    // return count + 1 
    
    
        const numSet = new Set(nums);
        let longest = 0;
    
        for (let n of numSet) {
            if (!numSet.has(n - 1)) {
                let length = 1;
    
                while (numSet.has(n + length)) {
                    length++;
                }
    
                longest = Math.max(longest, length);
            }
        }
    
        return longest;    
    
    };
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (!nums || nums.length === 0) {
        return 0;
      }
    
      let k = 1; // Initialize k to 1 (the first element is always unique)
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
          nums[k] = nums[i];
          k++;
        }
      }
      return k;
    
    
    };
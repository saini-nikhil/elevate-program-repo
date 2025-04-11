/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let obj ={}

for(let i = 0 ; i < strs.length ; i++){
    // arr.push(strs[i].split("").sort().join(""))
      let arr = strs[i].split("").sort().join("");
if (obj[arr] === undefined) {
        obj[arr] = [strs[i]]; 
    } else {
        obj[arr].push(strs[i]); 
    }
}
return Object.values(obj)
};
// 

let s1 = "listen" , s2 = "silent"

console.log(s1.split("").sort().join("") == s2.split("").sort().join(""))
let obj1 = {}
let obj2 = {}
for(let i = 0 ; i < s1.length ; i++){
    if(obj1[s1[i]] == undefined){
        obj1[s1[i]] = 1
    }else{
        obj1[s1[i]]++
    }
    if(obj2[s2[i]] == undefined){
        obj2[s2[i]] = 1
    }else{
        obj2[s2[i]]++
    }

}

function isEqual(obj1, obj2) {
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)
    // console.log(keys1);
    

    if (keys1.length !== keys2.length) return false

    for (let key of keys1) {
        console.log(obj1[key] )
        if (obj1[key] !== obj2[key]) return false
    }

    return true
}

console.log(isEqual(obj1, obj2))

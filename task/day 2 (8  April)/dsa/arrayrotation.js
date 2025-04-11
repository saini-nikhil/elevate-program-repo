
arr = [1, 2, 3, 4, 5, 6]
d = 2

let beforeR = ""
let afterR =""
let ind = 0


for(let i = 0 ; i < arr.length ; i++){
    beforeR += arr[i]+ " "
    if(arr[i] == d){
        ind = i
        
        break
    }
}
    // console.log(ind)
    
for(let i = ind+1 ; i < arr.length ; i++ ){
    afterR += arr[i]+" "
}

console.log( afterR+beforeR )
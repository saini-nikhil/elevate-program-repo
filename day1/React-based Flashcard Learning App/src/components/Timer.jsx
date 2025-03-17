import { useEffect, useState } from "react";

function Timer(){
    const [timer , setTimer]=useState(60)
    useEffect(()=>{
        const interval = setInterval(() => {
            setTimer((prev)=>prev-1)
            
        }, 1000);
        return ()=>clearInterval(interval)
    },[])

    return(
        <>
        <h1>Timer:{timer}</h1>
        </>
    )
}
export default Timer
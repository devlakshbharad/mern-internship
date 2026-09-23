//useState

import {useState} from "react"


function t2(){
    const [count,setCount]=useState(0)

    function oni(){
        setCount(count+1)

}
function ond(){
    setCount(count-1)
}
    return(<>
    <button onClick={oni}>Increase</button>
    <button onClick={ond}>Decerease</button>
    
    
    
    </>)


}
export default t2
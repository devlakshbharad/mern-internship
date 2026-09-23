//typed events

import { useState } from "react"


function t3(){

    const [name,setName]=useState("")

    function ons(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(name)

    }
    function onc(e:React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)


    }

    return(<>
    <form onSubmit={ons}>

        <input type="text" name="u1" value={name} onChange={onc}></input>
        <button type="submit">Click Here</button>
    </form>
    
    
    
    </>)


}

export default t3
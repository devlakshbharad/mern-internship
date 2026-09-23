//Component + Interface + Props

interface p1 {
    name:string,
    age:number

}

function t1({name,age}:p1){

    return(<>
    <h1>{name}</h1>
    <h1>{age}</h1>
    
    
    </>)
}
export default t1
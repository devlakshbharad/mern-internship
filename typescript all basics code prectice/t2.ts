// type in function parameters

function add(a:number,b:number):number
{
    return a+b

}
add(10,20)


// it is called optional parameter
function add1(name:string,age?:number){
    console.log(name)
    console.log(age)
}

add1("laksh",22)
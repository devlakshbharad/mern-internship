// Lists + Keys

interface User{
    name:String,
    id:number
}
const users: User[] = [
  {
    id: 1,
    name: "Laksh",
  },
  {
    id: 2,
    name: "Rahul",
  },
  {
    id: 3,
    name: "Amit",
  },
];
function t4(){

    return(<>
    {users.map((u)=>(<li key={u.id}>{u.name}</li>))}
    </>)
}

export default t4
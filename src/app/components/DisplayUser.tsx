import { useSelector } from "react-redux"


export default function DisplayUser(){
   const userData = useSelector((user:any)=> user.data);
     console.log(userData)
       return <div>

    <h1>Display User</h1>
   </div>
}
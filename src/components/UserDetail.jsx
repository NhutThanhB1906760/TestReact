import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null)
    useEffect(() => {
        console.log(userId);
        fetch(`https://reqres.in/api/users/${userId}`)
        .then(res=>res.json())
        .then(json=>setUser(json.data))
    
      
    }, [])
    
  return (
    <div>
        {user ? JSON.stringify(user) : <h1>Không tồn tại</h1>}
    </div>
  )
}

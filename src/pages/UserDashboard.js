import React, { useEffect, useState } from 'react'
import { getAllActivitiesServices } from '../services/userDashboard.services'
import { startChatServices } from '../services/chatServices' 
import { useNavigate } from 'react-router-dom'


const UserDashboard = () => {
    
    const [users, setUser] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        const getActivities = async() =>{
          try {
            const response = await getAllActivitiesServices()
            setUser(response.data)
          } catch (error) {
            console.log(error)
          }
          
        }
        getActivities()
    },[])

    const handleClick= async (user)=>{
      
      try {
        const foundChat = await startChatServices(user._id)
        navigate(`/chat/${foundChat.data._id}`)
      } catch (error) {
        
      }
      
    }

    if(!users){
      return <h3>...Loading</h3>
    }

return (
  <>
  {
    users? 
    users.map((user)=>{
      return (
      <>
        <button onClick={()=>handleClick(user)}>Chat with {user.name}</button>
      </>)
    }):<p>Cargando</p>
  }
  </>
  
    
  )
}

export default UserDashboard
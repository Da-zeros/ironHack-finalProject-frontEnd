import React from 'react'
import { useNavigate } from 'react-router-dom'

import { startChatServices } from '../services/chatServices' 

export const useStartChat = () => {
    
    const navigate = useNavigate()
    
    const handleChatClick = async ({user}) => {
      
        try {
          const foundChat = await startChatServices(user)
          navigate(`/chat/${foundChat.data._id}`)
        }catch (error) {
          console.log(error)
        }
  
      }

    return {
        handleChatClick 
    }
}



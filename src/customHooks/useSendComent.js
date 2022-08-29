import React, { useState } from 'react'

import { sendCommentService } from '../services/activities.services'

export const useSendComent = () => {
    const [comment, setComment] = useState()
    
    const [ delActivityId, setDelActivityId] = useState("")

    const handleComent=(value) => {
        setComment(value)
    }

    const handleSubmit = async () => {
      
        const objComent = {
          comment,
          delActivityId
        }
  
        try {
  
          const delResponse = await  sendCommentService(objComent)
         
        } catch (error) {
          console.log(error)
        }
      }

    return {
        comment,
        handleComent,
        handleSubmit
  }
}


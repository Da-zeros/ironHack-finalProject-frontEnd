import React from 'react'
import { useState } from 'react'

import { sendCommentService } from '../../services/activities.services'

import './comentBox.css'

const ComentBox = ({ delId, comentHandler }) => {

    const [ comment, setComment ] = useState()
    
    const handleSendComment = async ( )=>{
      
      const objComent = {
        comment,
        delId
      }

      try {

        const delResponse = await  sendCommentService(objComent)
        comentHandler()
       
      } catch (error) {
        console.log(error)
      }
    }

    const handleComent=(value) => {
        setComment(value)
    }

  return (
    <div className="actDetailCont--comment">
        <div className="comment--content">
            <h4>Leave us a comment!</h4>
            <textarea value={comment} onChange={ e => handleComent(e.target.value) }></textarea>
            <button  className="btn" onClick={()=>handleSendComment()} type="submit">Send</button>
        </div>
    </div>
  )
}

export default ComentBox
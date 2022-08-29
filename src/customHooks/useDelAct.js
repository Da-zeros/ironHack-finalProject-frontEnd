import React, { useState } from 'react'

import { useGetEnrolledAct } from './useGetEnrolledAct'
import { delEnroledActivityService } from '../services/userDashboard.services'

export const useDelAct = () => {
    
    const {userEnrolledAct, setUserEnrolledAct} = useGetEnrolledAct()
    
    const [ switchComment, setSwichComment ] = useState(false)
    const [ delActivityId, setDelActivityId] = useState("")

    const handleDelClick = async ( activity )=>{
      
        try{

          const delResponse = await delEnroledActivityService( activity._id )
          
          const newActivities= userEnrolledAct.filter( (v) =>{
            return ( v._id !== activity._id)
          })
          
          setUserEnrolledAct(newActivities)
          setDelActivityId( activity._id)
          setSwichComment(!switchComment)
        }
      
        catch(err){
          console.log(err)
        }
      }

    return {
        handleDelClick,
        switchComment
    }
}


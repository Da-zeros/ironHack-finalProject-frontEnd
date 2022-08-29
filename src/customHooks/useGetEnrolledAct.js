import React, { useEffect, useState } from 'react'
import { getUserEnrolledActService } from '../services/userDashboard.services'
 export const useGetEnrolledAct = () => {
    
    const [ userEnrolledAct, setUserEnrolledAct ] = useState([])
    
    const getEnrolledAct = async () => {
      
        try {
  
          const response = await getUserEnrolledActService()
          const resData = response.data.activities
          setUserEnrolledAct(resData)
  
        } catch (err) {
          console.log(err)
        }
      } 
  
      useEffect(()=>{
        getEnrolledAct()
      },[])

    return {
        userEnrolledAct,
        setUserEnrolledAct,
  }
}

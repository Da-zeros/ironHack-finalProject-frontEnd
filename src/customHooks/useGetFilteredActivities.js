import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import { getFilteredActivity } from '../services/activities.services'


export const useGetFilteredActivities = () => {
    
    const { filter } = useContext( AuthContext )

    const [ filteredList, setFilteredList ] = useState([])
    const [ error, setError ] = useState("")

    const sendQuery = async () =>{

      try{

        const findResponse = await getFilteredActivity(filter )
        const response = findResponse.data
       
        setFilteredList(response)
      }
      catch(err){
        if(err?.response?.data?.message){
          const badRequest = err?.response?.data?.message
          setError(badRequest)
        }
       
        
      }
       
    }
      
    useEffect(()=>{
        sendQuery()
    },[])

  return {
    error,
    filteredList
  }
}


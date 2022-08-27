import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import { getFilteredActivity } from '../services/activities.services'


export const useGetFilteredActivities = () => {
    
    const { filter } = useContext( AuthContext )

    const [ filteredList, setFilteredList ] = useState([])

    const sendQuery = async () =>{

        const findResponse = await getFilteredActivity(filter )
        const response = findResponse.data
        setFilteredList(response)
      
    }
      
    useEffect(()=>{
        sendQuery()
    },[])

  return {
    filteredList
  }
}


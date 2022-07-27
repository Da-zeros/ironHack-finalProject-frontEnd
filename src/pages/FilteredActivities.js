import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AuthContext } from "./../context/auth.context";  
import { getFilteredActivity } from '../services/activities.services';


const FilteredActivities = () => {

  const { filter } = useContext(AuthContext)

  const sendQuery = async () =>{
    
    const findResponse = await getFilteredActivity(filter )
    console.log(findResponse)

  }

  useEffect(()=>{
    sendQuery()
  },[])

  return (
    <div>FilteredActivities</div>
  )
}

export default FilteredActivities
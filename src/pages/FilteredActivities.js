import React, { useContext, useEffect, useState } from 'react'
import "./styes/filteredActivities.css"
import { useSearchParams } from 'react-router-dom'
import { AuthContext } from "./../context/auth.context";  
import { getFilteredActivity } from '../services/activities.services';
import { addActivityServices } from '../services/userDashboard.services';
import Swal from 'sweetalert2';
const FilteredActivities = () => {

  const { filter } = useContext(AuthContext)

  const [ filteredList, setFilteredList ] = useState([])
  const [ activityId, setActivityId ] = useState("")
  const [ message , setMessage ] = useState(undefined)


  const sendQuery = async () =>{
    
  const findResponse = await getFilteredActivity(filter )
  const response = findResponse.data
  setFilteredList(response)
}

  useEffect(()=>{
    sendQuery()
  },[])

  const handleClick = (idValue) => {
    setActivityId(idValue)
  }

  const addActivity = async () => {
    try{
      const addResponse = await addActivityServices(activityId)
      if(addResponse){
        
        Swal.fire({
          icon: 'success',
          title: 'you sign up for an activity',
          showConfirmButton: false,
          timer: 2000
        })
      }else{
        console.log("no hay respuesta")
      }
      
    }
    catch(err){
      const responseMessage = err.response.data.message
      setMessage(responseMessage)
    }
  }


  const handleClick2 = () => {
    console.log(activityId)
    addActivity()
    
  }

  return (
    <div className="filteredContaiener">
      {
        filteredList && filteredList.map( activity =>{
          return (
            <div key={activity._id}>
              <h5>{activity.title}</h5>
              <button onClick={ e => handleClick( activity._id )}>Select Activity</button>
            </div>
            
          )
        })
      }
      <button onClick={handleClick2}>Apuntate</button>
      {message&&<span>{message}</span>}
    </div>
  )
}

export default FilteredActivities
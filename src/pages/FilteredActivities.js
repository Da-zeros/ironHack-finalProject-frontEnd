import React, { useContext, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { AuthContext } from "./../context/auth.context";  
import { getFilteredActivity } from '../services/activities.services';
import { addActivityServices } from '../services/userDashboard.services';
import Swal from 'sweetalert2';
import ActivityPreview from '../components/ActivityPreview'


const FilteredActivities = () => {

  const { filter } = useContext(AuthContext)

  const [ filteredList, setFilteredList ] = useState([])
  const [ activityId, setActivityId ] = useState("")
  const [ message , setMessage ] = useState(undefined)
  const [ activity,  setActivity ] = useState({})
  const [ switchDetail, setSwitchDetail ] = useState(false)

  const sendQuery = async () =>{
    
  const findResponse = await getFilteredActivity(filter )
  const response = findResponse.data
  setFilteredList(response)
}

  useEffect(()=>{
    sendQuery()
  },[])

  const handleClick = (value) => {
    setSwitchDetail(!switchDetail)
    setActivityId(value._id)
    setActivity(value)
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
    <div className="filteredContainer">
      <div>
        {
          filteredList && filteredList.map( activity =>{
            return (
              
                <div className="filteredContaine-cardr" key={activity._id} onClick={ e => handleClick( activity )}>
                  <h5>{activity.title}</h5>
                  <p>{activity.location}</p>
                  <button onClick={handleClick2}>Apuntate</button>
                </div>
                
            
            )
          })
        }
      </div>
      <div className='filteredContaiener-detail'>
        {switchDetail? <ActivityPreview activity={activity}/>:<h3>Touch the Card to see more info</h3>}
      </div>
      
      {message&&<span>{message}</span>}
    </div>
  )
}

export default FilteredActivities
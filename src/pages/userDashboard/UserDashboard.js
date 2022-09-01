
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/navBar/Navbar'
import ComentBox from '../../components/comentBox/ComentBox'
import ActivityPreview from '../../components/activityPreview/ActivityPreview'

import { useSwitchState } from '../../customHooks/useSwitchState'
import { useStartChat } from '../../customHooks/useStartChat'

import { getAllActivitiesServices, getUserEnrolledActService , delEnroledActivityService } from '../../services/userDashboard.services'
import { sendCommentService } from '../../services/activities.services'
import { startChatServices } from '../../services/chatServices' 

import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import  './userDashboard.css'

const UserDashboard = () => {
    
  const [ userEnrolledAct, setUserEnrolledAct ] = useState([])
  const [ delActivityId, setDelActivityId] = useState("")
  const [ showDivContent, setShowDivContent ] = useState(false)

  const { activity, switchDetail, handleClick, } = useSwitchState()
  const { handleChatClick } = useStartChat()

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
},[ setUserEnrolledAct  ])

const handleComentContainer = () =>{
  setShowDivContent(!showDivContent)
}

const handleDelClick = async ( activity )=>{
  
  const swalDelResponse = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if( swalDelResponse.isConfirmed ){
    
    try{
      delEnroledActivityService( activity._id )
      const newActivities = userEnrolledAct.filter( (v) =>{
        return ( v._id !== activity._id)
      })
      setUserEnrolledAct(newActivities)
      setDelActivityId( activity._id)
    }
    catch(err){
      console.log(err)
    }

    const swalcomentResponse = await Swal.fire({
      text: "Coud you leave us a comment?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    })
  
    if(swalcomentResponse.isConfirmed){
      setShowDivContent(!showDivContent)
    }
  }
}

return (

  <div className='userDashboardCont'>
    <div className="userDashboardCont--navContainer">
      <Navbar />
    </div>
    <div className="userDashboardCont--usrEnrolledlledAct ">
      <h2>Enrolled Activities</h2>
      <hr></hr>
      <ul className="usrEnrolledlledAct--ul">
        {
          userEnrolledAct && userEnrolledAct.map(act => {
            return (
            <li 
              className="usrEnrolledlledAct--li" 
              key={act._id}>
                <p>{act.title}</p> 
                <div className="li--icon">
                  <FontAwesomeIcon 
                    onClick={e => handleClick(act)} 
                    icon={ faMagnifyingGlass } 
                    size="1x"/>
                  <FontAwesomeIcon 
                    onClick={e => handleChatClick(act)} 
                    icon={ faCommentDots } 
                    size="1x"/>
                  <FontAwesomeIcon 
                    onClick={e => handleDelClick(act)} 
                    icon={ faTrash } 
                    size="1x"/>
                </div>
            </li>
          )})
        }
      </ul>
    </div>
    <div className="userDashboardCont--actDetailCont">
      <div className="actDetailCont--act">
        { switchDetail 
            ?<ActivityPreview activity={activity} /> 
            : <h2>Select an activity to see the details</h2>
        }
      </div>
      <div>
        {
          showDivContent&&
          <ComentBox delId={delActivityId} comentHandler={handleComentContainer}/>
        }
      </div>
    </div>
    <div className="userDashboardCont-userActivities">
        <h2>mi act</h2>
        <hr></hr>
    </div>
    <div className="userDashboardCont-userActDetail">
        <h2>mi act detail</h2>
        <hr></hr>
    </div>
  </div> 
  )
}
export default UserDashboard
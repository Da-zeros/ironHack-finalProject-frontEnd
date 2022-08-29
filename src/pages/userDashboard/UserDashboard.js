
import React, { useEffect, useState } from 'react'

import Navbar from '../../components/navBar/Navbar'

import { useGetEnrolledAct } from '../../customHooks/useGetEnrolledAct' 
import { useSwitchState } from '../../customHooks/useSwitchState'
import { useStartChat } from '../../customHooks/useStartChat'
import { useDelAct } from '../../customHooks/useDelAct'
import { useSendComent } from '../../customHooks/useSendComent'

import { getAllActivitiesServices, getUserEnrolledActService , delEnroledActivityService } from '../../services/userDashboard.services'
import { sendCommentService } from '../../services/activities.services'
import { startChatServices } from '../../services/chatServices' 
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import ActivityPreview from '../../components/activityPreview/ActivityPreview'

import  './userDashboard.css'

const UserDashboard = () => {
    
    const { userEnrolledAct } = useGetEnrolledAct()
    const { activity, switchDetail, handleClick, } = useSwitchState()
    const { handleChatClick } = useStartChat()
    const { handleDelClick, switchComment } = useDelAct()
    const { comment, handleComent,handleSubmit } = useSendComent()

    const [users, setUser] = useState([])




    /*const handleClick= async (user)=>{
      console.log(e.target.value)
      /*
      try {
        const foundChat = await startChatServices(user._id)
        navigate(`/chat/${foundChat.data._id}`)
      } catch (error) {
        
      }
      
    }*/

    if(!users){
      return <h3>...Loading</h3>
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
        switchComment?
        <div className="actDetailCont--comment">
          <form onSubmit={handleSubmit}>
            <h4>leave us a comment!</h4>
            <textarea value={comment} onChange={ e => handleComent(e.target.value) }></textarea>
            <button  type="submit"></button>
          </form>
        </div>
        :
        <></>
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
  {/*
    users? 
    users.map((user)=>{
      return (
      <>
        <button onClick={()=>handleClick(user)}>Chat with {user.name}</button>
      </>)
    }):<p>Cargando</p>*/
  }
export default UserDashboard
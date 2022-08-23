
import React, { useEffect, useState } from 'react'
import { getAllActivitiesServices, getUserEnrolledActService , delEnroledActivityService } from '../services/userDashboard.services'
import { sendCommentService } from '../services/activities.services'
import { startChatServices } from '../services/chatServices' 
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import RatingStar from '../components/Rating.css'

import ActivityPreview from '../components/ActivityPreview'

const UserDashboard = () => {
    
    const [users, setUser] = useState([])
    const navigate = useNavigate();
    const [ userEnrolledAct, setUserEnrolledAct ] = useState([])
    const [ detailActivity, setDetailActivity ] = useState("")
    const [ switchToShow, setSwitchToShow ] = useState(false)
    const [ switchComment, setSwichComment ] = useState(false)
    const [ delActivityId, setDelActivityId] = useState("")
    const [ comment, setComment ] = useState("")
 
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

    const handleDetailClick = (act) => {
      setDetailActivity(act)
      setSwitchToShow(!switchToShow)
    }

    const handleChatClick = async ({user}) => {
      
      try {
        const foundChat = await startChatServices(user)
        navigate(`/chat/${foundChat.data._id}`)
      }catch (error) {
        console.log(error)
      }

    }

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

    const handleSubmit = async () => {
      const objComent = {
        comment,
        delActivityId
      }
      try {
        const delResponse = await  sendCommentService(objComent)
        console.log(delResponse)
      } catch (error) {
        console.log(error)
      }
    }

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
    <div className="userDashboardCont-enrodlledAct">
      <ul>
        {
          userEnrolledAct && userEnrolledAct.map(act => {
            return (
            <li 
              className="userDashboardCont-enrodlledAct_li" 
              key={act._id}>
                <p>{act.title}</p> 
                <FontAwesomeIcon 
                  onClick={e => handleDetailClick(act)} 
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
            </li>
          )})
        }
      </ul>
    </div>
    <div className="userDashboardCont-actDetail">
       { switchToShow?<ActivityPreview activity={detailActivity} /> : <h4>Select an activity to see the details</h4>}
    </div>
    <div className="userDashboardCont-miActivities">
        <p>mi act</p>
    </div>
    <div className="userDashboardCont-showComent">
      {
        switchComment?
        <div>
          <form onSubmit={handleSubmit}>
            <h4>leave us a comment!</h4>
            <textarea value={comment} onChange={ e => setComment(e.target.value) }></textarea>
            <button  type="submit"></button>
          </form>
        </div>
        :
        <></>
      }
      <p>showCommntes</p>
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
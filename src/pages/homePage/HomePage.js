import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getActivityTypeService, getFilteredActivity, getActivitiesService, getCommentActivitiesService } from '../../services/activities.services'
import ActivitySearch from '../../components/ActivitySearch'
import { AuthContext } from "../../context/auth.context"; 
import '../styes/home.css' 
import Swal from 'sweetalert2';

import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";


function HomePage() {
  
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log(user)

  const { setFilter } = useContext(AuthContext)
  const navigate = useNavigate()

  const [ lastAct, setLasAct ] = useState("")
  const [ comentedAct, setComentedAct ] = useState([])

  const [ findWord, setFindWord ] = useState("")
  const [ findType, setFindType ] = useState("")
  const [ findDate, setFindDate ] = useState("")

  const [ listActCo, setActCo ] = useState([])
  

  const [ types, setTypes] = useState([])
  
  const getActivitiTypes = async () => {
        
    try {
        const response = await getActivityTypeService()
        setTypes(response.data)
    } catch (err) {
        console.log(err)
    }
  }

  const getActivities = async () => {
        
    try {
        const response = await getActivitiesService()
        
        const data = response.data
        setLasAct(data)
        //setTypes(response.data)
    } catch (err) {
        console.log(err)
    }
  }

  const getComrntActivities = async () => {
        
    try {
        const responseC = await getCommentActivitiesService()
        
        const data2 = responseC.data
        setComentedAct(data2)
        //setTypes(response.data)
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(()=>{
    getActivities()
    getActivitiTypes()
    getComrntActivities()
  },[])

  const handleInputChange = (e) =>{
    const findWord = e.target.value
    setFindWord(findWord)
    setFindType("")
  }

  const handleSelectChange = (e) => {
    const findTpe = e.target.value
    setFindType(findTpe)
    setFindWord("")
  }

  const handleDateCange = (e) => {
    const findDate = e.target.value
    setFindDate(findDate)
    setFindType("")
    setFindWord("")
  }
  console.log(user.name)

  const handlenSubmit = async (e) => {
   e.preventDefault()
    console.log("findDate ->" ,findDate.length ,"FindWord",findWord.length, "FinType ->", findType.length)
    try {
      let queryToSend = {}
      
      if( findWord.length !== 0 ){
        queryToSend = { filterWord:findWord }
        setFilter(queryToSend)
        navigate(`/activities`)
      } 
      else if(findType.length !== 0){
        queryToSend = { filterType:findType }
        setFilter(queryToSend)
        navigate(`/activities`)
      }
      else if(findDate.length !== 0){
        queryToSend = { filterDate:findDate }
        setFilter(queryToSend)
        navigate(`/activities`)
      }
      

    } catch (err) {
      console.log(err)
    }                                                                                                 
  }

 
  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dcuvwmjab'
    }
    }); 

   const handleLastAdded = (act) =>{
    const myImage = cld.image(act.file)
   
       Swal.fire({
      title: `${act.title}`,
      text: `More activities like this one in ${act.type} section`,
      
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
   }

    


  return (
    
    <div>
      <nav>
      <Link to="/"><button>Home</button></Link>

      {isLoggedIn
        ? (<>
            <Link to="/userDashboard"> <button>My Dashboard</button></Link>
            <Link to="/addActivity"><button>Add new activity</button></Link>
            <button onClick={logOutUser}>Logout</button>
            <span>{user.name}</span>
          </>)
        : 
        (<>
          <Link to="/signup"> <button>Signup</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
          
        
        </>)
      }
    </nav>
  
  
    <div className="containerHome">
      <div className="searchContainer">
        <form>
            <h2>Find Activities</h2>
            <div className="form-group">
              <label>Filter by name, location...</label>
              <input
              value={findWord}
              onChange={handleInputChange}
              placeholder="Search by location, activity, name"
              />
            </div>
            
            <div className="form-group">
              <label>Filter by activity type</label>
              <select 
                  name="activityType" 
                  value={findType}
                  onChange={handleSelectChange}
                  >
                  {
                      types&& types.map((type,i)=>{
                          return <option key={i} value={type}>{type}</option>
                      })
                  }
              </select>
            </div>

            <div className="form-group">
              <label>Filter by date</label>
              <input 
              type="date"
              value={findDate}
              onChange={handleDateCange}
              />
            </div>
        </form>
        <button type="submit" onClick={handlenSubmit}>find!</button>
      </div>
      <div className="ultimasAñadidasCont">
          <h4>Last added</h4>
          <hr></hr>
            <div className="ultimasAñadidasCont-caja">
            {
              
              lastAct && lastAct.map( act =>{
                return (
                  <div key={act._id} onClick={e=>handleLastAdded(act)} className="ultimasAñadidas-card">
                    <h4>{act.title}</h4>
                    <p>Location: {act.location}</p>
                    <p>{act.description}</p>
                    <p>Created: {act.createdAt}</p>
                  </div>
                )
              })
            }
            </div>
      </div>
      <h4>Last comented</h4>
          <hr></hr>
      <div className="ultimasAñadidasCont-caja">
      
      {
              
              comentedAct && comentedAct.map( act =>{
                return (
                  <div key={act._id} onClick={e=>handleLastAdded(act)} className="ultimasAñadidas-card">
                    <h4>{act.title}</h4>
                    <p>Location: {act.location}</p>
                    <p>{act.description}</p>
                    <hr></hr>
                    <p>Created: {act.comment}</p>
                  </div>
                )
              })
            }
      </div>
    </div>
    </div>
  );
}

export default HomePage;
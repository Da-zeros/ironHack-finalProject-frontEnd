import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getActivityTypeService, getFilteredActivity, getActivitiesService, getCommentActivitiesService } from '../../services/activities.services'
import ActivitySearch from '../../components/ActivitySearch'
import { AuthContext } from "../../context/auth.context"; 
//import './styles.css' 
import Swal from 'sweetalert2';
import NavBar from '../../components/navBar/Navbar'
import Carousel from '../../components/carousel/Carousel'

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
    <div className="homeContainer">
      <div>
       <NavBar />
      </div>
      <div className="homeContainer-sectionsGroup">
       
        <section className="homeContainer-section cityBackground">
          <h2 className="whiteColor big">Find Activities</h2>
          
          <article className="homeContainer-searchArticle">
            <form className="homeContainer-form">
              
              <div className="homeContainer-label">
                <label>Filter by name, location...</label>
                <label>Filter by activity type</label>
                <label>Filter by date</label>
              </div>
            
              <div className="homeContainer-input">
                <input
                  value={findWord}
                  onChange={handleInputChange}
                  placeholder="Search by location, activity, name"
                />
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
                <input 
                  type="date"
                  value={findDate}
                  onChange={handleDateCange}
                />
              </div>
              <div className="homeContainer-btn">
                <button type="submit" onClick={handlenSubmit}>find!</button>
              </div>
              
            </form>
          </article>
         
        </section>

        <section className="homeContainer-section">
          <h2>Look <span className="grey">the Last added</span> activities!</h2>
          <hr></hr>
          <article className="homeContainer-lastAddedArticle">
            <Carousel>
                {
                
                lastAct && lastAct.map( act =>{
                  return (
                    <div key={act._id} onClick={e=>handleLastAdded(act)} className="homeContainer-card noShadow">
                      <h4>{act.title}</h4>
                      <p>Location: {act.location}</p>
                      <p>{act.description}</p>
                      <p>Created: {act.createdAt}</p>
                    </div>
                  )
                })
                }
             </Carousel>
          </article>
        </section>

        <section className="homeContainer-section blackBacground">
          <h2 className="whiteColor">What do the <span className='grey'>people think about</span> activities?</h2>
          <hr></hr>
          <article className="homeContainer-lastComented">
            <Carousel>
          {
            comentedAct && comentedAct.map( act =>{
              return (
                <div key={act._id} className="homeContainer-card noHover">
                  <h4>{act.title}</h4>
                  <p>Location: {act.location}</p>
                  <hr></hr>
                  <p>Created: {act.comment}</p>
                </div>
              )
            })
          }
          </Carousel>
          </article>
        </section>

      </div>
    </div>
  );
}

export default HomePage;

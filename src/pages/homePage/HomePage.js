import { useGetActivitiesData } from '../../customHooks/useGetActivitiesData'
import { useHomeFilterActivities} from '../../customHooks/useHomeFilterActivities'
import { useHandleLastAdded } from '../../customHooks/useHandleLastAdded'

import './homePage.css' 

import NavBar from '../../components/navBar/Navbar'
import Carousel from '../../components/carousel/Carousel'

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


function HomePage() {
  
  const { types, lastAct, comentedAct } = useGetActivitiesData()
  const { handleInputChange, handleSelectChange, handleDateCange,  handlenSubmit, findWord, findType, findDate,} = useHomeFilterActivities()
  const { handleLastAdded } = useHandleLastAdded()
  console.log(comentedAct)
  let cld = new Cloudinary({
    cloud: {
        cloudName: 'dcuvwmjab'
    }
  }); 
  
  return (
    <div className="homeContainer">
      <div className="homeContainer-nav">
       <NavBar />
      </div>
      <div className="homeContainer-sectionsGroup">
       
        <section className="homeContainer-section cityBackground">
          <h2>Find <span>Activities</span></h2>
          
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
                  placeholder="Enter word to find"
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
                <input className="homeContainer-input-date"
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
          <h2 className="section-responsiveH2">Look <span className="grey">the Last added</span> activities!</h2>
          <hr></hr>
          <article className="homeContainer-lastAddedArticle">
            <Carousel>
                {
              
                lastAct && lastAct.map( act =>{
                  return (
                 
                    <div key={act._id} onClick={e=>handleLastAdded(act)} className="homeContainer-lastAddedCard">
                      
                        <h3>{act.title}</h3>
                        <div className="lastAddedCard-imgContainer">
                          <AdvancedImage className="lastAddedCard-img" cldImg={cld.image(act.file)}/>
                        </div>
                      
                      <div className="lastAddedCard-info">
                        <p>{act.description}</p>
                        <div className="lastAddedCard-icons">
                          <FontAwesomeIcon className="icon" icon={faLocationDot}></FontAwesomeIcon>
                          <p>{act.location}</p>
                          <FontAwesomeIcon className="icon" icon={  faCalendarDays }/>
                          <p>{ Moment(act.createdAt).format('DD-MM-YYYY')}</p>
                        </div>
                        
                          <button>More info</button>
                        
                      </div>
                    </div>
                    
                  )
                })
                }
             </Carousel>
          </article>
        </section>

        <section className="homeContainer-section blackBacground">
          <h2 className="whiteColor section-responsiveH2 extra-margin">What do the <span className='grey'>people think about</span> activities?</h2>
          <hr></hr>
          <article className="homeContainer-lastComented">
            <Carousel>
          {
            comentedAct && comentedAct.map( act =>{
              return (
                <div key={act._id} className="homeContainer-comentedCard">
                  <div>
                    <h4>{act.title}</h4>
                    <div className='comentedCard-info'>
                      <FontAwesomeIcon className="icon" icon={faLocationDot}></FontAwesomeIcon>
                      <p>{act.location}</p>
                    </div>
                   
                    <p>{act.comment}</p>
                    <hr></hr>
                  </div>
                  <div className="comentedCard-user">
                    <img src="icons/user.png"/>
                    <p>By <span>{act.user?.name}</span></p>
                  </div>
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

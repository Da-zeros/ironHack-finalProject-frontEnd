import React, { useContext, useEffect, useState } from 'react'

import ActivityPreview from '../../components/activityPreview/ActivityPreview';
import { useGetFilteredActivities } from '../../customHooks/useGetFilteredActivities';
import { useSwitchState } from '../../customHooks/useSwitchState';
import { useAddActivity } from '../../customHooks/useAddActivity'
import  Navbar  from '../../components/navBar/Navbar';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment';

import './filteredActivities.css'
import { useNavigate } from 'react-router-dom'



const FilteredActivities = () => {

  const { filteredList, error} = useGetFilteredActivities()
  const { activity, switchDetail, handleClick,} =  useSwitchState()
  const { handleClick2, message } = useAddActivity()

  const navigate = useNavigate()
  
  let cld = new Cloudinary({
    cloud: {
        cloudName: 'dcuvwmjab'
    }
  }); 

  return (
    <div className={!error?"filteredContainer":"errorContainer"}>
      <div className="filteredContainer--nav">
        <Navbar />
      </div>
      {
        error ?
        <div className="errorContainer--group">
          <p>{error}</p>
          <button onClick={()=>navigate("../")}>ComeBack</button>
        </div>
        :
        <>
        <div className="filteredContainer--activities">
        {
          filteredList && filteredList.map( activity =>{
            return (
              <div className="activities--card" key={activity._id} onClick={ e => handleClick( activity )}>   
                
                <h3>{activity.title}</h3>

                <div className="activities--imgContainer">
                  <AdvancedImage className="activities--img" cldImg={cld.image( activity.file )}/>
                </div>

                
                <div className="activities--info">
                  <p>{activity.description}</p>
                  <div className="activities--icons">
                    <FontAwesomeIcon className="icon" icon={faLocationDot}></FontAwesomeIcon>
                    <p>{activity.location}</p>
                    <FontAwesomeIcon className="icon" icon={  faCalendarDays }/>
                    <p>{ Moment( activity.createdAt ).format('DD-MM-YYYY')}</p>
                  </div>
                </div>
                     
              </div>
                
            )
          })
        }
      </div>
      <div className='filteredContaiener-detail'>
        {switchDetail? <ActivityPreview activity={activity}/>:<h3>Touch the Card to see more info</h3>}
        {message&&<span>{message}</span>}
      </div>
      </>
      }
      
      
     
    </div>
  )
}

export default FilteredActivities

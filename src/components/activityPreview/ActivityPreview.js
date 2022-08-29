import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {Transformation} from "@cloudinary/url-gen";

import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'

import './activityPreview.css'

require('dotenv').config();

const ActivityPreview = ({ activity}) => {


        // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
    cloud: {
        cloudName: 'dcuvwmjab'
    }
    }); 

    // Use the image with public ID, 'front_face'.
    const myImage = cld.image(activity.file)
    //myImage.resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))  

  return (
    
    <div className="previewActivityContainer">
        <div className="previewActivityContainer--upper">
            <div className="upper--colLeft">
                <h4>{activity.title}</h4> 
                
                <div className="upper--colLef--icons">
                    
                    <div className="upper--colLef--icons_desc">
                        <FontAwesomeIcon icon={faClipboardUser} size="1x"/>
                        <p>{activity.type}</p>
                    </div>
                
                    <div className="upper--colLef--icons_desc">
                        <FontAwesomeIcon icon={faCalendarDays} size="1x"/>
                        <p>{activity.date}</p>
                    </div>
            
                    <div className="upper--colLef--icons_desc">
                        <FontAwesomeIcon icon={ faClock } size="1x"/>
                        <p>{activity.time}</p>
                    </div>
                    
                    <div className="upper--colLef--icons_desc">
                        <FontAwesomeIcon icon={faMapLocation } size="1x"/>
                        <p>{activity.location}</p>
                    </div>
                </div>
            </div>

            <div className="upper--colRigth2">
                <div className="upper--colRigth2--imgContainer">
                    <AdvancedImage className="img" cldImg={myImage}/>
                </div>
            </div>
        </div>
        <div className="previewActivityContainer--bottom">
            <hr></hr>
            <h5>Description: </h5>
           
            <p>{activity.description}</p>
            <h6>Something importan to know?</h6>
            <p>{activity.notes}</p>
            
        </div>

    
    </div>
    
  )
}

export default ActivityPreview
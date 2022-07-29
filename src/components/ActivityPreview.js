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

require('dotenv').config();

const ActivityPreview = ({ activity }) => {
console.log(activity)

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
    
    <div className="newActivityContainer-preview">
    <div className="newActivityContainer-preview_row">
        <div className="newActivityContainer-preview__row_colLeft">
            <h4>{activity.title}</h4> 
            
            <div className="newActivityContainer-preview__row_colLeft_icon">
                <FontAwesomeIcon icon={faClipboardUser} size="1x"/>
                <div className="newActivityContainer-preview__row_colLeft_desc">
                    <span>Activity type</span>
                    <p>{activity.type}</p>
                </div>
            </div>
            
            <div className="newActivityContainer-preview__row_colLeft_icon">
                <FontAwesomeIcon icon={faCalendarDays} size="1x"/>
                <div className="newActivityContainer-preview__row_colLeft_desc">
                    <span>Event date</span>
                    <p>{activity.date}</p>
                </div>
            </div>

            <div className="newActivityContainer-preview__row_colLeft_icon">
                <FontAwesomeIcon icon={ faClock } size="1x"/>
                <div className="newActivityContainer-preview__row_colLeft_desc">
                    <span>Duration</span>
                    <p>{activity.time}</p>
                </div>
               
            </div>
            
            <div className="newActivityContainer-preview__row_colLeft_icon">
                <FontAwesomeIcon icon={faMapLocation } size="1x"/>
                <div className="newActivityContainer-preview__row_colLeft_desc">
                    <span>Location</span>
                    <p>{activity.location}</p>
                </div>
              
            </div>
        </div>
        <div className="newActivityContainer-preview_row_colRigth2">
          <AdvancedImage cldImg={myImage}/>
        </div>
    </div>
    <div className="newActivityContainer-preview_row2">
        <h5>Description</h5>
        <hr></hr>
        <p>{activity.description}</p>
        <h6>Something importan to know?</h6>
        <p>{activity.notes}</p>
    </div>
    
</div>

    
        
        
    
    
  )
}

export default ActivityPreview
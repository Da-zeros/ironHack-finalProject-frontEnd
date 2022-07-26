import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {Transformation} from "@cloudinary/url-gen";

import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";

require('dotenv').config();

const ActivityPreview = ({uploadedImg}) => {
console.log(uploadedImg)
        // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
    cloud: {
        cloudName: 'dcuvwmjab'
    }
    }); 

    // Use the image with public ID, 'front_face'.
    const myImage = cld.image(uploadedImg)
    myImage.resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))  

  return (
    <div>
        Aloha
        <AdvancedImage cldImg={myImage}/>
    
    </div>
  )
}

export default ActivityPreview
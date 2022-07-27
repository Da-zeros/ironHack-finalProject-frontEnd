import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"
import ActivityPreview from "../components/ActivityPreview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'

import './styes/newActivity.style.css'

import { newActivityService, getActivityTypeService} from "../services/activities.services"
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";


const initialValues = {
    title:"",
    activityType:"",
    location:"",
    description:"",
    date:"",
    time:"",
    notes:""
}


const NewActivity = () => {

    const navigate = useNavigate();

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const [ mesasge, setMessage ] = useState("")
    

    const [ types, setTypes] = useState([])
    const [ upload , setUpload ] = useState("")
    
    const [ values, setValues ] = useState(initialValues)
    const [ file, setFile ] = useState("")
    const [ image, setImage ] = useState("")
    
    const typeIcon = <FontAwesomeIcon icon="fa-solid fa-clipboard-user" />
    const getActivitiTypes = async () => {
        
        try {
            const response = await getActivityTypeService()
            setTypes(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getActivitiTypes()
    },[])
   
    const handleInputChange = (e) => {
        const { name, value} = e.target
        setValues({...values, [name]:value})
    }
    
    const handleImgChange= (e) =>{
        const file = e.target.files[0]
        setFile(file)
        previewFiles(file)
    }
    
    function previewFiles(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImage(reader.result)
            console.log(image)
        }
    }

    const handlenSubmit = async (e) =>{

        e.preventDefault()
        
        const formData = {
            image:image,
            values
        } 

        try {
            const response = await newActivityService(formData)
            const mensaje = response?.data?.message
           
            if(mensaje){
               
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Already exists an activity with the same name in your account',
                  })

            }else{

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your activity has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigate('/');
            }
            
        } catch (err) {
            const errorDescription = err?.response?.data?.message;
			setErrorMessage(errorDescription);
        }
    }

return (

    <div className="newActivityContainer">
        <div className="newActivityContainer-form">
        
            <form onSubmit={e=>{handlenSubmit(e)}}>
                <input 
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                    placeholder="title"
                />
                <div className="form-group">
                    <label>Activity type?</label>
                    <select 
                        name="activityType" 
                        value={values.activityType}
                        onChange={handleInputChange}
                        >
                        {
                            types&& types.map((type,i)=>{
                                return <option key={i} value={type}>{type}</option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    
                    <label>There's a specfic date?:</label>
                    <input 
                        name="date"
                        type="date" 
                        placeholder="Specific date?"
                        onChange={handleInputChange}
                        value={values.date}
                    />
                </div>

                <input 
                    type="number"
                    name="time"
                    value={values.time}
                    placeholder="Activity duration"
                    onChange={handleInputChange}
                />

                <input 
                    name="location"
                    value={values.location}
                    placeholder="Activity location"
                    onChange={handleInputChange}
                />

                <textarea 
                    name="description" 
                    value={values.description}
                    onChange={handleInputChange}
                    placeholder="Activity description"
                    rows="10" 
                    cols="50"/>
                    
                <input 
                    name="notes"
                    value={values.notes}
                    onChange={handleInputChange}
                    placeholder="something more to know?"
                />
                        
                

                <div className="form-group">
                    <label htmlFor="file">Upload a jpg file:</label>
                    <input 
                        type="file"
                        onChange={e=>handleImgChange(e)} 
                        required
                    />
                </div>

                <button type="submit">Add new Activity</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        
        </div>
        
        <div className="newActivityContainer-preview">
            <div className="newActivityContainer-preview_row">
                <div className="newActivityContainer-preview__row_colLeft">
                    <h4>{values.title}</h4> 
                    
                    <div className="newActivityContainer-preview__row_colLeft_icon">
                        <FontAwesomeIcon icon={faClipboardUser} size="1x"/>
                        <div className="newActivityContainer-preview__row_colLeft_desc">
                            <span>Activity type</span>
                            <p>{values.activityType}</p>
                        </div>
                    </div>
                    
                    <div className="newActivityContainer-preview__row_colLeft_icon">
                        <FontAwesomeIcon icon={faCalendarDays} size="1x"/>
                        <div className="newActivityContainer-preview__row_colLeft_desc">
                            <span>Event date</span>
                            <p>{values.date}</p>
                        </div>
                    </div>

                    <div className="newActivityContainer-preview__row_colLeft_icon">
                        <FontAwesomeIcon icon={ faClock } size="1x"/>
                        <div className="newActivityContainer-preview__row_colLeft_desc">
                            <span>Duration</span>
                            <p>{values.time}</p>
                        </div>
                       
                    </div>
                    
                    <div className="newActivityContainer-preview__row_colLeft_icon">
                        <FontAwesomeIcon icon={faMapLocation } size="1x"/>
                        <div className="newActivityContainer-preview__row_colLeft_desc">
                            <span>Location</span>
                            <p>{values.location}</p>
                        </div>
                      
                    </div>
                </div>
                <div className="newActivityContainer-preview_row_colRigth2">
                    {image? <img src={image}></img> : <p>Your Activity looks nice? submit if you are shure</p>}
                </div>
            </div>
            <div className="newActivityContainer-preview_row2">
                <h5>Description</h5>
                <hr></hr>
                <p>{values.description}</p>
                <h6>Something importan to know?</h6>
                <p>{values.notes}</p>
            </div>
        </div>

    </div> 
   

  )
}

export default NewActivity

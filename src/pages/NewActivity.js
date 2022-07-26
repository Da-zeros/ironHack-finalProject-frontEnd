import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"

import ActivityPreview from "../components/ActivityPreview";

import { newActivityService, getActivityTypeService} from "../services/activities.services"
import React, { useEffect, useState } from 'react'



const initialValues = {
    title:"",
    activityType:"",
    location:"",
    description:"",
    date:"",
    notes:""
}

const NewActivity = () => {

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    

    const [ types, setTypes] = useState([])
    const [ upload , setUpload ] = useState("")
    
    const [ values, setValues ] = useState(initialValues)
    const [ file, setFile ] = useState("")
    const [ image, setImage ] = useState("")
    
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
            const uploadedImg = response.data.public_id
            setUpload(uploadedImg)
            const activityExist = response?.data?.message
            setErrorMessage(activityExist)
            
        } catch (err) {

            const errorDescription = err?.response?.data?.message;
			setErrorMessage(errorDescription);
     
        }
    }

return (
        
    <div className="newActivity_form">
        
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
                <div className="imgContainer">
                    <img src={image}></img>
                </div>

            </div>
            <button type="submit">Add new Activity</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ActivityPreview uploadedImg={upload}/>
    </div>

  )
}

export default NewActivity

import { useFormik, yupToFormErrors } from "formik"
import * as Yup from "yup";
import Swal from "sweetalert2"
import { newActivityService, getActivityTypeService} from "../services/activities.services"
import React, { useEffect, useState } from 'react'


const NewActivity = () => {

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const [ types, setTypes] = useState([])

    const getActivitiTypes = async () => {

        try {
            const response = await getActivityTypeService()
            setTypes(response.data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getActivitiTypes()
    },[])

    const validationSchema = Yup.object({
        name: Yup.string().required("Required field"),
        email: Yup.string().required("Required field").email("wrong email format"),
        title: Yup.string().required("Required field"),
        location: Yup.string().required('Required field'),
        description: Yup.string().required("Reqired field"),
        type: Yup.string().required('Required field'),
        data: Yup.date(),
        notes: Yup.string().required("Required field"),
       
      })
    
      const initialValues = {
         name:"",
         email: "",
         title:"",
         location:"",
         description:"",
         type:"",
         data:"",
         notes:"",
         picture: undefined,
      }
    
    const onSubmit = async values=>{
        console.log(values)  
        try {
            const response = await newActivityService(values)
            
        } catch (err) {
            console.log(err)
        }
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues, 
        validationSchema,
        onSubmit,
        });

    return (
        
        <div className="newActivity_form">
            {console.log(errors)}
        <form onSubmit={handleSubmit}>
           <input 
                type="text" 
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={values.name}
            />
            {errors.name ? errors.name : null}
        
            <input 
                type="text" 
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
            />
            {errors.email ? errors.email : null}
            
            <input 
                name="title"
                type="text" 
                placeholder="Activity title"
                onChange={handleChange}
                value={values.title}
                />
            {errors.title ? errors.title : null}
            
            <div className="form-group">
                
                <label htmlFor="cars">Activity type:</label>
                <select 
                    name="type" 
                    id="activity"
                    onChange={handleChange}
                    value={values.type}
                    >
                    {
                        types&& types.map((type,i)=>{
                            return <option key={i} value={type}>{type}</option>
                        })
                    }
                </select>

                {errors.type ? errors.type : null}
            </div>

            <input 
                type="text" 
                name="location"
                placeholder="Activity location"
                onChange={handleChange}
                value={values.location}
                />
            {errors.location ? errors.location : null}

            <textarea 
                name="description" 
                onChange={handleChange}
                value={values.description}
                rows="10" 
                cols="50"/>Write something here
            

            <div className="form-group">
                
                <label htmlFor="cars">There's a specfic date?:</label>
                <input 
                    name="data"
                    type="date" 
                    placeholder="Specific date?"
                    onChange={handleChange}
                    value={values.data}
                />
                    
                {errors.data ? errors.data : null}
            </div>
                
                <input 
                    name="notes"
                    type="text" 
                    placeholder="something more to know?"
                    onChange={handleChange}
                    value={values.notes}
                />
                    
                {errors.data ? errors.data : null}

             <div className="form-group">
                
                <label htmlFor="file">Upload a jpg file:</label>
                <input 
                    type="file"
                    name="picture"
                    onChange={e=>handleChange(e)}
                    value={values.picture} 
                       
                />
                {errors.picture ? errors.picture: null}

            </div>
            <button type="submit">Add new Activity</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>

  )
}

export default NewActivity

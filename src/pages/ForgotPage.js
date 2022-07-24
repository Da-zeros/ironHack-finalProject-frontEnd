import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"
import {forgotService } from '../services/auth.services'

import { useNavigate } from 'react-router-dom';


const ForgotPage = () => {
    
  const navigate = useNavigate();

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const [email, setEmail] = useState("")

    const validationSchema = Yup.object({
        email: Yup.string().required("Email field is required").email("wrong email format")
    })

    const initialValues = {
        email:""
    }

    const onSubmit = async values=>{
        
        try {
          
          const response = await forgotService(values) 
          
          if(!response){
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Look like there's no user with this email!",
            })

          }
          else{

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Confirm passwordModify token sent to ${values.email}`,
              showConfirmButton: false,
              timer: 1500
            })

            navigate('/login')
          }
        } catch (error) {
            
        }
      }  

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues, 
        validationSchema,
        onSubmit,
      });

  return (
    <div className="SignupPage">
			<h1>Forgot password</h1>

			<form onSubmit={handleSubmit}>
				<label>Email:</label>
        <input 
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="email"/>
            {errors.email ? errors.email : null}
				<button type="submit">Send</button>
			</form>

			{errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default ForgotPage
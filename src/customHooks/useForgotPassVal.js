import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import { forgotService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";

export const useForgotPassVal = () => {
    
    const [ errorMessage, setErrorMessage ] = useState("")
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string().email("Please enter a valid Email").required("Please Enter your email").required("Please Enter your Email"),
    })

    const initialValues = {
        email:''
    }

    const onSubmit = async (values) => {

        try {
          
            const response = await forgotService(values) 
            console.log(response)
            
            response && Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Confirm passwordModify token sent to ${values.email}`,
                showConfirmButton: false,
                timer: 2500
              })
  
              navigate('/auth')
            
          } catch (err) {

            const errorDescription = err.response.data.message;

            setErrorMessage( errorDescription )
        
            const setErr = () =>{
              setErrorMessage("")
            }
      
            setTimeout(setErr,3500)
          }
        
    }

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return {
    handleSubmit,
    handleChange,
    values,
    errors,
    errorMessage
  }
}



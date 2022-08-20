import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import { passwordModifyService } from "../services/auth.services";
import { forgotService } from "../services/auth.services";
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';

export const useFormikNewPassVal = () => {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const userEmail = searchParams.get("email");

    const navigate = useNavigate()

    const [ errorMessage, setErrorMessage ] = useState(undefined);

    const validationSchema = Yup.object({
        password: Yup
            .string()
            .required("Please Enter your password")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match!")
            .required('Required')
    })

    const initialValues = {
        password:"",
        confirmPassword:""
    }

    const onSubmit = async (values)=>{

        const userObj = {
            values,
            userEmail
          }
            try {
              const response = await passwordModifyService(userObj)
              
              if(response){
                
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `Password modified`,
                  showConfirmButton: false,
                  timer: 1500
                })
    
                navigate('/auth')
              } 
            } catch (err) {
                console.log(err.response)
            }

    }

    const { values, errors, handleChange, handleSubmit } = useFormik({
        validationSchema,
        initialValues,
        onSubmit
    })

  return {
    values, 
    errors, 
    handleChange, 
    handleSubmit,
    errorMessage 
  }
}


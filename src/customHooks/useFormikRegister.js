import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { signupService } from '../services/auth.services'
import { useNavigate } from 'react-router-dom';



export const useFormikRegister = () => {

 
  const [ errorMessage, setErrorMessage ] = useState("")
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({

    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Please enter a valid Email").required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match!")
      .required('Required')
  })

  const initialValues = {
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  }

  const onSubmit = async ( values ) =>{

    try{

      const newUser = await signupService( values );
      newUser && await Swal.fire(`Usuario ${newUser.data.name} registrado con éxito, correo de verificación enviado a ${newUser.data.email}`)
      navigate("/auth");
    }catch(err){
      
      const errorDescription = err.response.data.message;
      setErrorMessage( errorDescription )
  
      const setErr = () =>{
        setErrorMessage("")
      }

      setTimeout(setErr,3500)
    }
  }  

const { handleSubmit, handleChange, values, errors } = useFormik({
    validationSchema,
    initialValues, 
    onSubmit,
})

  return {
    handleSubmit,
    handleChange,
    values,
    errors,
    errorMessage
  }
}


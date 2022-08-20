import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { loginService } from '../services/auth.services'
import { AuthContext } from '../context/auth.context'
import { useNavigate } from 'react-router-dom';



export const useFormikValidation = () => {

  const { logInUser } = useContext(AuthContext);
  const [ errorMessage, setErrorMessage ] = useState("")
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({

    email: Yup.string().email("Please enter a valid Email").required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  })

  const initialValues = {
    email:"",
    password:"",
  }

  const onSubmit = async (values) =>{

  try {

    const response = await loginService( values );
    console.log(response.data)
    const token = response.data.authToken;
    logInUser(token);
    navigate('/homePage');

  } catch (err) {

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


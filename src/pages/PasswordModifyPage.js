import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { passwordModifyService} from '../services/auth.services';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const PasswordModifyPage = () => {

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const [ password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    
    const [searchParams, setSearchParams] = useSearchParams();
    const userEmail = searchParams.get("email");
    
    console.log('segundo console',userEmail)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
      password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match!")
      .required('Required')
    })

    const initialValues = {
        password:"",
        confirmPassword:""
    }

    const onSubmit = async values=>{
        
        try {
          const response = await passwordModifyService(values)
          
          if(response){
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Password modified`,
              showConfirmButton: false,
              timer: 1500
            })

            navigate('/login')
          } 
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
    <div className="SignupPage">
			<h1>Change Password</h1>

			<form onSubmit={handleSubmit}>
				<label>Password:</label>
        <input 
            type='password'
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="password"/>

        {errors.password ? errors.password : null}

        <label>Confirm password:</label>
        <input 
          type='password'
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword}
          placeholder="Confirm Password"/>
          
          {errors.confirmPassword ? errors.confirmPassword : null}
				<button type="submit">Send</button>
			</form>
			  {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default PasswordModifyPage
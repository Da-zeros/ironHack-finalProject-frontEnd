import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { passwordModifyService} from '../../services/auth.services';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import videoSource from '../../media/videoBackground.mp4';
import '../userAuth/auth.css'

const PasswordModifyPage = () => {

    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const [ password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    
    const [searchParams, setSearchParams] = useSearchParams();
    const userEmail = searchParams.get("email");
    
    
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
    <div className='mainContainer'>
      	<video className="mainContainer--video" src={ videoSource } autoPlay loop muted />
      	<div className="mainContainer--overlay"></div>
      	<div className="mainContainer--nabBar">
		      <Link to={'/'} className="mainContainer--nabBar_link">Home</Link>
          <a className="mainContainer--nabBar_link">Take a tour</a>
          <a className="mainContainer--nabBar_link">LogIn</a>
     	  </div>
    
		    <div className="mainContainer--wraper">
			
          <div className="mainContainer--glassBox">
            

            <form className="mainContainer--glassBox--loginForm" onSubmit={handleSubmit}>
            <h2>Change Password</h2>
              <input 
              type='password'
              name="password"
              onChange={handleChange}
              value={values.password}
              placeholder="password"/>

              {errors.password ? errors.password : null}
              
              <input 
                type='password'
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword}
                placeholder="Confirm Password"/>
            
              {errors.confirmPassword ? errors.confirmPassword : null}
              <button className="mainContainer--glassBox--loginForm_btn" type="submit">Send</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p>}
			    </div>
			
      	</div>
    </div>
  )
}

export default PasswordModifyPage







import React, { useState } from 'react'
import { useFormikNewPassVal } from '../../customHooks/useFormikNewPassVal';
import { useFormik } from 'formik'
import * as Yup from "yup";

import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import videoSource from '../../media/videoBackground.mp4';
//import '../userAuth/auth.css'

const PasswordModifyPage = () => {

    const { values, errors, handleChange, handleSubmit, errorMessage } = useFormikNewPassVal()

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

              <span className='mainContainer--glassBox--loginForm_error'>{errors.password ? errors.password : null}</span>
              
              <input 
                type='password'
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword}
                placeholder="Confirm Password"/>
            
              <span className='mainContainer--glassBox--loginForm_error'>{errors.confirmPassword ? errors.confirmPassword : null}</span>
              <button className="mainContainer--glassBox--loginForm_btn" type="submit">Send</button>
            </form>
            { errorMessage && <p className="mainContainer--glassBox--loginForm_error">{errorMessage}</p>}
			    </div>
			
      	</div>
    </div>
  )
}

export default PasswordModifyPage







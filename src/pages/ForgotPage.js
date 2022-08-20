import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForgotPassVal } from '../customHooks/useForgotPassVal';
import videoSource from '../media/videoBackground.mp4'
import './passModify/styles.css'


const ForgotPage = () => {
    
  const { values, errors, handleChange, handleSubmit, errorMessage } = useForgotPassVal()

  return (

    <div className='mainContainer'>
      <video className="mainContainer--video_noFadeIn" src={ videoSource } autoPlay loop muted />
      <div className="mainContainer--overlay"></div>
      <div className="mainContainer--nabBar">
		      <Link to={'/'} className="mainContainer--nabBar_link">Home</Link>
          <a className="mainContainer--nabBar_link">Take a tour</a>
          <a className="mainContainer--nabBar_link">LogIn</a>
     	  </div>
    
		    <div className="mainContainer--wraper">
			
          <div className="mainContainer--glassBox">
          <form className="mainContainer--glassBox--loginForm" onSubmit={handleSubmit}>
            <h2>Forgot password</h2>
            <input 
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email"/>
                <span className='mainContainer--glassBox--loginForm_error'>{errors.email ? errors.email : null}</span>
                {errorMessage&& <span className='mainContainer--glassBox--loginForm_error'>{ errorMessage }</span>}
            <button className="mainContainer--glassBox--loginForm_btn" type="submit">Send</button>
          </form>
          
          </div>
        </div>

			
    </div>
  )
}

export default ForgotPage
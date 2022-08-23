import React, { useContext, useEffect, useState } from 'react'
import videoSource from '../../media/videoBackground.mp4'
import { useSwitch }  from '../../customHooks/useSwitch'
import { useFormikValidation } from '../../customHooks/useFormikValidation'
import SignUpComponent from './signupComponent/SignUpComponent'
import { Link } from 'react-router-dom'
import'./auth.css'


function AuthPage() {

	const { handleSubmit, handleChange, values, errors,  errorMessage} = useFormikValidation()
	const { handleClick, change } = useSwitch()
	
	return (

		<div className='mainContainer'>
			<video className="mainContainer--video noFadeIn" src={videoSource} autoPlay loop muted />
			<div className="mainContainer--overlay"></div>
			
			<div className="mainContainer--nabBarLanding noFadeIn">
				<Link to={'/'} >Home</Link>
				<a>Take a tour</a>
				<a >LogIn</a>
			</div>
		
			<div className="mainContainer--wraper">
				{!change
				? 
				<div className="mainContainer--glassBox extraMarginTop">
					<form className="mainContainer--glassBox--loginForm" onSubmit={ handleSubmit }>
						<h2>Member Login</h2>
						<div>
							<input 
								name="email" 
								onChange={ handleChange }
								value={values.email}
								placeholder="Email"/>
							
						</div>
						<span className='mainContainer--glassBox--loginForm_error'>{errors.email ? errors.email : null}</span>
						
						<div>
							<input  
								type="password" 
								name="password" 
								onChange={ handleChange }
								value={values.password}
								placeholder="Password"/>
							
						</div>
						<span className='mainContainer--glassBox--loginForm_error'>{errors.password ? errors.password : null}</span>

						<button className="mainContainer--glassBox--loginForm_btn" type="submit">Login</button>
					</form>
					{errorMessage&& <span className='mainContainer--glassBox--loginForm_error'>{ errorMessage }</span>}

					<p className="mainContainer--glassBox--loginForm_signLink">Don't have an account yet? <span onClick={ handleClick }>Sign Up</span></p>
					<Link className="mainContainer--glassBox--loginForm_link" to={'/forgotPass'}><p>forgoted password?</p></Link>
				</div>
				:
				<SignUpComponent switchState={ handleClick } />	
			
				}
			</div>
    </div>
	);
}

export default AuthPage;

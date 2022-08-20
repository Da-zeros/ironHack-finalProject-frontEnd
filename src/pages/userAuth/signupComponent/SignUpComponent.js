import React, { useState, useContext } from 'react'
import { useFormikRegister } from '../../../customHooks/useFormikRegister'


import'./signUpComponent.css'

function SignUpComponent({switchState}) {
	
	const { handleSubmit, handleChange, values, errors, errorMessage } = useFormikRegister()
	
	return (
		
			<div className="mainContainer--glassBox">
				<form className="mainContainer--glassBox--loginForm" onSubmit={ handleSubmit }>
					<h2>Register</h2>
					<div>
						<input 
							type="text" 
							name="name" 
							value={ values.name} 
							onChange={ handleChange } 
							placeholder="Name"/>
					</div>
					<span className='mainContainer--glassBox--loginForm_error'>{errors.name ? errors.name : null}</span>
					<div>
						<input 
							type="text" 
							name="email" 
							value={ values.email } 
							onChange={  handleChange } 
							placeholder="Email"/>
					</div>
					<span className='mainContainer--glassBox--loginForm_error'>{errors.email ? errors.email : null}</span>
					<div>
						<input 
							type="password" 
							name="password" 
							value={ values.password } 
							onChange={ handleChange } 
							placeholder="Password"/>
					</div>
					<span className='mainContainer--glassBox--loginForm_error'>{errors.password ? errors.password : null}</span>
					<div>
						<input 
							type="password" 
							name="confirmPassword" 
							value={ values.confirmPassword } 
							onChange={ handleChange } 
							placeholder="confirmPassword"/>
					</div>
					<span className='mainContainer--glassBox--loginForm_error'>{errors.confirmPassword ? errors.confirmPassword : null}</span>
					<button className="mainContainer--glassBox--loginForm_btn" type="submit">SignUp</button>
				</form>
				{errorMessage && <p className="mainContainer--glassBox--loginForm_error">{errorMessage}</p>}

				<p className="mainContainer--glassBox--loginForm_signLink">Already have account?<span onClick={ switchState }>Login</span></p>
				
			</div>
	)
}

export default SignUpComponent;

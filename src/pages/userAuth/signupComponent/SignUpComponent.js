import React, { useState, useContext } from 'react'
import { useSwitch}  from '../../../customHooks/useSwitch'
import { useSetFom } from '../../../customHooks/useSetFom'
import { useSendForm } from '../../../customHooks/useSendForm'
import { animated } from 'react-spring'


import'./signUpComponent.css'

function AuthPage({switchState}) {
	
	const { handleClick } = useSwitch()
	const { email, password, name, handleName, handleEmail, handlePassword } = useSetFom()
	const { handleSignupSubmit, errorMessage } = useSendForm()

	return (
		
			<div className="mainContainer--glassBox">
				<form className="mainContainer--glassBox--loginForm" onSubmit={handleSignupSubmit}>
					<h2>Register</h2>
					<div>
						<input type="text" name="name" value={name} onChange={ handleName } placeholder="Name"/>
					</div>
					<div>
						<input type="text" name="email" value={email} onChange={handleEmail} placeholder="Email"/>
					</div>
					
					<div>
						<input  type="password" name="password" value={password} onChange={handlePassword} placeholder="Password"/>
					</div>

					<button className="mainContainer--glassBox--loginForm_btn" type="submit">SignUp</button>
				</form>
				{errorMessage && <p className="error-message">{errorMessage}</p>}

				<p className="mainContainer--glassBox--loginForm_signLink">Already have account?<span onClick={ switchState }>Login</span></p>
				
				
			</div>
	)
}

export default AuthPage;

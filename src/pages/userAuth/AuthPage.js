import React from 'react'
import videoSource from '../../media/videoBackground.mp4'
import  { useSwitch}  from '../../customHooks/useSwitch'
import { useSetFom } from '../../customHooks/useSetFom'
import { useSendForm } from '../../customHooks/useSendForm'
import { animated } from 'react-spring'
import SignUpComponent from './signupComponent/SignUpComponent'

// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import'./auth.css'

function AuthPage(props) {

	const { handleClick, change, leftFadeInSpring} = useSwitch()
	const { email, password, handleEmail, handlePassword } = useSetFom()
	const { handleLoginSubmit, errorMessage } = useSendForm()

	

	return (
		<div className='mainContainer'>
      	<video className="mainContainer--video" src={videoSource} autoPlay loop muted />
      	<div className="mainContainer--overlay"></div>
      	<div className="mainContainer--nabBar">
		  <Link to={'/'} className="mainContainer--nabBar_link">Home</Link>
          <a className="mainContainer--nabBar_link">Take a tour</a>
          <a className="mainContainer--nabBar_link">LogIn</a>
        
     	 </div>
    
		<div className="mainContainer--wraper">
			{!change
			? 
			<div className="mainContainer--glassBox">
				<form className="mainContainer--glassBox--loginForm" onSubmit={handleLoginSubmit}>
					<h2>Member Login</h2>
					<div>
						<input type="text" name="email" value={email} onChange={handleEmail} placeholder="Email"/>
					</div>
					
					<div>
						<input  type="password" name="password" value={password} onChange={handlePassword} placeholder="Password"/>
					</div>

					<button className="mainContainer--glassBox--loginForm_btn" type="submit">Login</button>
				</form>
				{errorMessage && <p className="error-message">{errorMessage}</p>}

				<p className="mainContainer--glassBox--loginForm_signLink">Don't have an account yet? <span onClick={ handleClick }>Sign Up</span></p>
				<Link className="mainContainer--glassBox--loginForm_link" to={'/passModify'}><p>forgoted password?</p></Link>
			</div>
			:
			<SignUpComponent switchState={ handleClick } />	
		
			}
      	</div>
    </div>
	);
}

export default AuthPage;

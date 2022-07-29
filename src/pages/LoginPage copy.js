import { useState, useContext } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/auth.context';
import { loginService } from '../services/auth.services';
import './styes/login.styles.css'

function LoginPage(props) {

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState(undefined);
	const navigate = useNavigate();
	const { logInUser } = useContext(AuthContext);

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleLoginSubmit = async (e) => {
		
		e.preventDefault();
		const requestBody = { email, password };

		try {
			const response = await loginService(requestBody);
			const token = response.data.authToken;
			console.log(token)
			logInUser(token);
			navigate('/');
		} catch (err) {
			const errorDescription = err?.response?.data?.message;
			console.log(err.response.data)
			setErrorMessage(errorDescription);
		}
	}; 

	return (
		
		<div className="LoginPage">
			<h1>Login</h1>

			<form onSubmit={handleLoginSubmit}>
				<label>Email:</label>
				<input type="text" name="email" value={email} onChange={handleEmail} />

				<label>Password:</label>
				<input type="password" name="password" value={password} onChange={handlePassword} />

				<button type="submit">Login</button>
			</form>
			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Don't have an account yet?</p>
			<Link to={'/signup'}> Sign Up</Link>

			<Link to={'/forgot'}><p>forgoted password?</p></Link>
		</div>
	);
}

export default LoginPage;

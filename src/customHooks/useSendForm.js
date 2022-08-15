import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth.context';
import { loginService } from '../services/auth.services';
import { useNavigate } from 'react-router-dom'
import { useSetFom } from './useSetFom'
import Swal from 'sweetalert2';
import { signupService } from '../services/auth.services'

export  const useSendForm = () => {
    
    const { name, email, password } = useSetFom()
    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const navigate = useNavigate();


	const handleSignupSubmit = async (e) => {
		e.preventDefault();
		const requestBody = { email, password, name };
    try{
      const newUser = await signupService(requestBody);
	  newUser && await Swal.fire(`Usuario ${newUser.data.name} registrado con éxito, correo de verificación enviado a ${newUser.data.email}`)
      navigate("/login");

    }catch(err){
      if(err.response?.status === 400){
		setErrorMessage(err.response.data.message);
        
      }
    }
  };

    return {
		handleSignupSubmit,
        errorMessage
    }
}


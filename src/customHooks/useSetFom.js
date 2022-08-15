import React, { useState } from 'react'

export const useSetFom = () => {
  
    const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ name, setName ] = useState('');
	
    const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleName = (e) => setName(e.target.value);

   
    return {
        email,
        password,
        name,
        handleEmail,
        handlePassword,
        handleName

  }
}


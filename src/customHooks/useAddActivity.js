import React, { useState } from 'react'
import { useSwitchState } from './useSwitchState'
import { addActivityServices } from '../services/userDashboard.services';
import Swal from 'sweetalert2';

export const useAddActivity = () => {

   
    const [ message , setMessage ] = useState(undefined)

    const addActivity = async (value) => {
        
        try{
          const addResponse = await addActivityServices(value)
          if(addResponse){
            
            Swal.fire({
              icon: 'success',
              title: 'you sign up for an activity',
              showConfirmButton: false,
              timer: 2000
            })
          }else{
            console.log("no hay respuesta")
          }
          
        }
        catch(err){
          const responseMessage = err.response.data.message
          setMessage(responseMessage)
        }
      }
    
    
      const handleClick2 = (value) => {
        addActivity(value)
       
      }

  return {
    handleClick2,
    message
  }
}


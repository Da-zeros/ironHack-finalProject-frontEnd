import React from 'react'
import Swal from 'sweetalert2';

export const useHandleLastAdded = () => {

    const handleLastAdded = (act) =>{
        Swal.fire({
        title: `${act.title}`,
        text: `More activities like this one in ${act.type} section`,
        })
      }
      
  return { handleLastAdded }
}

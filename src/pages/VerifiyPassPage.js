import queryString from 'query-string'
import { useEffect, useState} from 'react'
import axios from "axios"
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import { verifyPassService } from '../services/auth.services'


const VerifyPassPage = () => {

    const [userEmail, setUserEmail] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
  
    const navigate = useNavigate()

    async function verifyAccToken(){
        
        try {
    
        const response = await verifyPassService(token)
  
        if(response.data){
          setUserEmail(response.data.email)
          

        }
          
        } catch (error) {
        console.log(error)
        await Swal.fire({
            html: <i>{error}</i>,
            icon: 'warning'
        })
        }    

  }

  useEffect(()=>{
    verifyAccToken()
    
  },[])

  useEffect(()=>{
    Swal.fire({
      icon: 'success',
      title: `PasswordModify token confirm`,
    })
    setTimeout(()=>navigate(`/passwordModify?email=${userEmail}`),1500)
  },[userEmail])

  
  return (
  <>
      
  </>
  )
}

export default VerifyPassPage
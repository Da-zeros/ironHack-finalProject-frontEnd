import queryString from 'query-string'
import { useEffect } from 'react'
import axios from "axios"
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import { verifyTokenService } from '../services/auth.services'

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");
  console.log(token)
  const navigate = useNavigate();

  async function verifyAccToken(){
        
    try {
      
      const response = await verifyTokenService(token)
      
      if (response){

        Swal.fire(
          'Good job!',
          'User succesfuly verified',
          'success'
        )

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
    setTimeout(()=>navigate(`/auth`),1000)
  },[])

  return (
  <>
      
  </>
  )
}

export default Verify
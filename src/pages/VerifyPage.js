import queryString from 'query-string'
import { useEffect } from 'react'
import axios from "axios"
import {useLocation, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'


const Verify = () => {

  const location = useLocation();
  const navigate = useNavigate();



  async function verifyAccToken(){
        
    try {
      const {token} = queryString.parse(location.search)  
      console.log(token)
      
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify/${token}`)
      
      await Swal.fire({
        html: <i>{"Usuario verificado correctamente"}</i>,
        icon: 'success'
      })

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
    setTimeout(()=>navigate(`/login`),1000)
  },[])

  return (
  <>
      
  </>
  )
}

export default Verify
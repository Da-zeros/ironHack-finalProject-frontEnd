import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context"; 

export const useHomeFilterActivities = () => {
    
    const { setFilter } = useContext(AuthContext)

    const [ findWord, setFindWord ] = useState("")
    const [ findType, setFindType ] = useState("")
    const [ findDate, setFindDate ] = useState("")

    const navigate = useNavigate()

    const handleInputChange = (e) =>{
        const findWord = e.target.value
        setFindWord(findWord)
        setFindType("")
      }
    
      const handleSelectChange = (e) => {
        const findTpe = e.target.value
        setFindType(findTpe)
        setFindWord("")
      }
    
      const handleDateCange = (e) => {
        const findDate = e.target.value
        setFindDate(findDate)
        setFindType("")
        setFindWord("")
      }

      const handlenSubmit = async (e) => {
        e.preventDefault()
         console.log("findDate ->" ,findDate.length ,"FindWord",findWord.length, "FinType ->", findType.length)
         try {
           let queryToSend = {}
           
           if( findWord.length !== 0 ){
             queryToSend = { filterWord:findWord }
             setFilter(queryToSend)
             navigate(`/activities`)
           } 
           else if(findType.length !== 0){
             queryToSend = { filterType:findType }
             setFilter(queryToSend)
             navigate(`/activities`)
           }
           else if(findDate.length !== 0){
             queryToSend = { filterDate:findDate }
             setFilter(queryToSend)
             navigate(`/activities`)
           }
           
     
         } catch (err) {
           console.log(err)
         }                                                                                                 
       }

    return {
        findWord,
        findType,
        findDate,
        handleInputChange,
        handleSelectChange,
        handleDateCange,
        handlenSubmit
    }
    
}


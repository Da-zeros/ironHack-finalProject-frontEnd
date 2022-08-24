import React, { useEffect, useState } from 'react'
import {  getActivityTypeService, getActivitiesService, getCommentActivitiesService } from '../services/activities.services'

export const useGetActivitiesData = () => {
    
    const [ types, setTypes ] = useState([])
    const [ lastAct, setLasAct ] = useState("")
    const [ comentedAct, setComentedAct ] = useState([])
    
    const getActivitiTypes = async () => {
        
        try {

            const response = await getActivityTypeService()
            setTypes(response.data)
        } catch (err) {

            console.log(err)
        }
      }

      const getActivities = async () => {
        
        try {

            const response = await getActivitiesService()
            const data = response.data
            setLasAct(data)
            //setTypes(response.data)
        } catch (err) {
            console.log(err)
        }
      }
      
      const getComrntActivities = async () => {
        
        try {

            const responseC = await getCommentActivitiesService()
            const data2 = responseC.data
            setComentedAct(data2)
            //setTypes(response.data)
        } catch (err) {
            console.log(err)
        }
      }

      useEffect(()=>{
        getActivities()
        getActivitiTypes()
        getComrntActivities()
      },[])

    return {
        types,
        lastAct,
        comentedAct
    }
}


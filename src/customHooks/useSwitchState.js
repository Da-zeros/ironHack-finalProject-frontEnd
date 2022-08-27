import React, { useState } from 'react'

export const useSwitchState = () => {
    
    const [ activityId, setActivityId ] = useState("")
    const [ activity,  setActivity ] = useState({ })
    const [ switchDetail, setSwitchDetail ] = useState(false)

    const handleClick = (value) => {
        setSwitchDetail(!switchDetail)
        setActivityId(value._id)
        setActivity(value)
      }

  return {
    activityId,
    activity,
    switchDetail,
    handleClick,
  }
}


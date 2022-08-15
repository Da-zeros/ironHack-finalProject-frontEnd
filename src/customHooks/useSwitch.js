import React, { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'

export const useSwitch = () => {
  
    const [ change, setChange] = useState(false)
    
    const leftFadeInSpring = useSpring({
        to:{x:0, opacity:1},
        from:{x:500, opacity:0},
        config:{ mass: 2, tension: 250, friction: 25 },
        reset:change
      })

    const handleClick=()=>{
        setChange(!change)
    }

    const handleClick2=()=>{
        console.log("Hola65")
    }

    return {
        change,
        handleClick,
        handleClick2,
        leftFadeInSpring
    }
    
}


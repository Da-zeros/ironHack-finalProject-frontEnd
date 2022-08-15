import React, { useContext, useState } from 'react'
import videoSource from '../../media/videoBackground.mp4'
import './landingBoard.css'
import { useSwitch }  from '../../customHooks/useSwitch'
import { animated } from 'react-spring'
import { Link } from 'react-router-dom'

const LandingBoard = () => {
  
  const { change, handleClick, leftFadeInSpring } = useSwitch()
      
  return (
    <div className='mainContainer'>
      <video className="mainContainer--video" src={videoSource} autoPlay loop muted />
      <div className="mainContainer--overlay"></div>
      <div className="mainContainer--nabBarLanding">
        
          <a className="mainContainer--nabBar_item1" onClick={ handleClick }>How we work</a>
          <a className="mainContainer--nabBar_item2" >Take a tour</a>
          <Link to={'/auth'} className="mainContainer--nabBar_item3" >LogIn</Link>
          
        
      </div>
    
      <div className="mainContainer--wraper">
        {!change
        ? 
        <div 

          className="mainContainer--textContainer">
          <h1>Time <span>citizen</span></h1>
          <h2>A space where you can get knowledge, services... or carry out activities, hobbies... in exchange for your time and what you are capable of contributing to others with it.</h2>
          <button className="mainContainer--glassBox_btn plusWidth">Take a tour as a guest</button>
        </div>
        :
        <animated.div 
          style={ leftFadeInSpring } 
          className="mainContainer--textContainer glassBox">
          <h3>How we work</h3>
          
          <p>What are you <span>good at?</span> What can you <span>contribute to others?</span> How much <span>free time do you have</span> to be able to <span>exchange this</span> with someone else's? 
          <span> Time Citizen</span> is a time bank in which <span>people offer their time</span> in , activities or services and <span>accumulate that time</span> invested in their account that they can then <span>use in activities</span> and services of others.
              The investment <span>is reciprocal</span>, so you can never accumulate more hours demanded than those offered.
          </p>
          <button className="mainContainer--glassBox_btn responsiveBtn" onClick={ handleClick }>comeBack</button>
        </animated.div>
    
        }
      </div>
    </div>
    
      
    
  )
}

export default LandingBoard
import { Link } from "react-router-dom";
import { useContext, useState } from "react";    
import { AuthContext } from "../../context/auth.context";  // <== IMPORT
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardUser, faLocation } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'



function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [ isExpanded, setIsExpanded ] = useState(false)

  const menuItems = [
    {
      text: "User dashboard",
      icon: faChalkboardUser,
    },
    {
      text: "Add new activity",
      icon: faList,
    },
    {
      text: "Chat",
      icon: faMessage,
    },
    {
      text: "Location",
      icon: faMapLocation ,
    },
    
  ]
  return (
    <div className={ isExpanded? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
      <div className="nav-upper">
        <div className="nav-heading">
          { isExpanded&&
            <div className="nav-brand">
            <img src=""></img>
            <h2>TimeCitizen</h2>
          </div>
          }
          
          <button className= {isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out" } 
            onClick={ () => setIsExpanded( !isExpanded)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
          <div className="nav-menu">{menuItems.map(({ text, icon })=>(
            <a href="#" className={ isExpanded? "menu-item": "menu-item menu-item-NX"}>
              <FontAwesomeIcon className="test" icon={icon} ></FontAwesomeIcon>
              { isExpanded&&<p>{text}</p>}
              
              { !isExpanded&& <div className="tip">{text}</div>}
            </a>))}
          </div>
      </div>
      <div className="nav-footer">
        { isExpanded&&(
          <div className="nav-details">
          <img src="icons/user.png"/>
          <div className="nav-footer-info">
            <p className="nav-footer-user-name">{user}</p>
          </div>
         
        </div>
        )}
        <FontAwesomeIcon className="logout-icon" icon={faArrowRightFromBracket} ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Navbar;
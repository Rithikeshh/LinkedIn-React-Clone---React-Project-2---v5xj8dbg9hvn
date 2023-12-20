import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import dropDown from "../../assets/images/caret-drop.png"
import { useAuth } from '../providers/AuthProvider'
function Navbar() {
  const [isFocused, setIsFocused] = useState(false)
  const [isSearchbarStretch, setIsSearchbarStretch] = useState(false)
  const stretchSearchRef = useRef()
  const stretchSearchButtonRef = useRef()
  const handleFocusInInput = (e)=>{
    setIsFocused(true)
  }
  const handleFocusOutInput = (e)=>{
    setIsFocused(false)
  }
  const handleStretchSearchInput = (e)=>{
    setIsSearchbarStretch(true)
    setTimeout(()=>{
      stretchSearchRef.current.focus()
    })
  }
  
  function setStretchSearchFalse(e){
    if(!stretchSearchRef.current.contains(e.target) && !stretchSearchButtonRef.current.contains(e.target)){
      setIsSearchbarStretch(false)
    }
  }
  useEffect(()=>{
      document.addEventListener('click', setStretchSearchFalse)
      return ()=>{
        document.removeEventListener('click',setStretchSearchFalse);
      }
  },[])
  return (
    <div className='navbar'>
      
      <div className='navbar-menu-container'>
        <Link to="/feed">
            <div style={{display:"flex"}} className='main-logo-container'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="#0A66C2" className="linkedin-icon" width="24" height="24" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            </div>
        </Link>
        <div className='navbar-search-container'>
          <div className={`navbar-search ${isFocused ? 'navbar-search-focus' : ''}`}>
            <div className={`${isSearchbarStretch ? "stretch-searchbar": ""}`}>
              <input ref={stretchSearchRef} onFocus={handleFocusInInput} onBlur={handleFocusOutInput} placeholder='Search' className='navbar-search-input' type="text" />
            </div>
            <button ref={stretchSearchButtonRef} onClick={handleStretchSearchInput} className={`navbar-search-button ${isSearchbarStretch ? "hide":""}`}>
              <span>
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                  <path d="M21.41 18.59l-5.27-5.28A6.83 6.83 0 0017 10a7 7 0 10-7 7 6.83 6.83 0 003.31-.86l5.28 5.27a2 2 0 002.82-2.82zM5 10a5 5 0 115 5 5 5 0 01-5-5z"></path>
                </svg>
              </span>
                <div className='navbar-search-text'>Search</div>
            </button>
          </div>
        </div>
        <nav>
          <ul className={`navbar-list ${isSearchbarStretch ? "hide":""}`}>
            <li className='navbar-item'>
              <NavLink className={({isActive})=>{
                return isActive ? "navbar-links-active navbar-links" : "navbar-links"
              }} to='/feed'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                    <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
                  </svg>
                </div>
                <span>Home</span>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink className={({isActive})=>{
                return isActive ? "navbar-links-active navbar-links" : "navbar-links"
              }} to='/mynetwork'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M12 6.5a4.5 4.5 0 114.5 4.5A4.49 4.49 0 0112 6.5zm6 6.5h-3a3 3 0 00-3 3v6h9v-6a3 3 0 00-3-3zM6.5 6A3.5 3.5 0 1010 9.5 3.5 3.5 0 006.5 6zm1 9h-2A2.5 2.5 0 003 17.5V22h7v-4.5A2.5 2.5 0 007.5 15z"></path>
                </svg>
                </div>
                <span>My Network</span>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink className={({isActive})=>{
                return isActive ? "navbar-links-active navbar-links" : "navbar-links"
              }} to='/jobs'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M22.84 10.22L21 6h-3.95V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2l2.22 5.18A3 3 0 007 13h14a2 2 0 001.84-2.78zM15.05 6h-6V5a1 1 0 011-1h4a1 1 0 011 1zM7 14h15v3a3 3 0 01-3 3H5a3 3 0 01-3-3V8.54l1.3 3A4 4 0 007 14z"></path>
                </svg>
                </div>
                <span>Jobs</span>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink className={({isActive})=>{
                return isActive ? "navbar-links-active navbar-links" : "navbar-links"
              }} to='/messaging'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                </svg>
                </div>
                <span>Messaging</span>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink className={({isActive})=>{
                return isActive ? "navbar-links-active navbar-links" : "navbar-links"
              }} to='/notifications'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                </svg>
                </div>
                <span>Notifications</span>
              </NavLink>
            </li>
            <li style={{borderRight: "1px solid #D9D9D9", position:"relative"}} className='navbar-item'>
              <NavbarProfile/>
            </li>
            <li className='navbar-item'>
              <div style={{padding: "0 12px"}} className='navbar-links'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
                </svg>
                </div>
                <span>
                  For Business
                  <img style={{width:"14px", position:"relative", top:"2px"}} src={dropDown} alt="" />
                </span>
              </div>
            </li>
            <li className='navbar-item'>
              <div className='navbar-links navbar-premium'>
                Try Premium for ₹0
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar

function NavbarProfile(){

  const [showModal, setShowModal] = useState(false)
  const myElementRef = useRef(null)
  const {name} = JSON.parse(localStorage.getItem("userDetails"))

  return (
    <div className='navbar-links' ref={myElementRef} onClick={(e)=>{
      setShowModal(n=>!n)
    }}>
      <img style={{width:"24px", borderRadius:"50%"}}
        src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`}
        alt="Profile Picture"
      />
      <span>Me
        <img style={{width:"14px", position:"relative", top:"2px"}} src={dropDown} alt="" />
      </span>
      {showModal && (
        <NavbarProfileModal myElementRef={myElementRef} setShowModal={setShowModal} />
      )}
    </div>
  );
}

function NavbarProfileModal ({myElementRef, setShowModal}){

  const navigate = useNavigate();
  const {setIsLoggedIn} = useAuth()
  function setModalFalse(e){
    if(!myElementRef.current.contains(e.target)){
      setShowModal(false)
    }
  }
  useEffect(()=>{
      document.addEventListener('click', setModalFalse)
      return ()=>{
        document.removeEventListener('click',setModalFalse);
      }
  },[])
  const handleLogout = (e)=>{
    localStorage.removeItem("userToken");
    localStorage.removeItem("userDetails");
    setIsLoggedIn(false);
    navigate("/")
  }
  return(
    <div className='profile-modal' onClick={(e)=>{
      e.stopPropagation()
    }}>
      <span onClick={handleLogout}>Logout</span>
    </div>
  )
}
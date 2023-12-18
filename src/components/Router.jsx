import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './pages/Home/Home'
import { useAuth } from './providers/AuthProvider'

function Router() {
  const {isLoggedIn} = useAuth()
  return (
    isLoggedIn ? 
    <div>
      <Navbar/>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        {/* <Route path='/feeds' element={<div>Alok's Feed</div>}/>
        <Route path='/home' element={<div>Alok's Home</div>}/> */}
      </Routes>
    </div>
    :
    <Navigate to='/'/>
  )
}

export default Router

import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './pages/Home/Home'
import { useAuth } from './providers/AuthProvider'
import Feed from './pages/Feed/Feed'
import Loader from './Loader/Loader'
import AuthNavigator from './navigator/AuthNavigator'
import MyNetwork from './pages/MyNetwork/MyNetwork'

function Router() {

  const [loading, setLoading] = useState(true)
  
  return (
    <div>
      {loading ? 
        <Loader/>
        :
        <Navbar/>
      }
      <Routes>
        <Route path='/feed' element={<Feed loading={loading} setLoading={setLoading}/>}/>
        <Route path="/mynetwork" element={<MyNetwork />}/>
      </Routes>
    </div>
  )
}

export default Router

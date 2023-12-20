import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Loader from '../../Loader/Loader'

function Feed() {

    const [loader, setLoader] = useState(false)
    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        
    },[])
  return (
    loader ? 
    <Loader/>
    :
    <div>
      <Navbar/>
    </div>
  )
}

export default Feed

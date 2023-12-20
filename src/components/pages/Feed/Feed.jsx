import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Loader from '../../Loader/Loader'

function Feed() {

  const [loader, setLoader] = useState(true)
  const [posts, setPosts] = useState([])
  const getPosts = async () => {

    const config = {
      method: 'GET',
      headers: {
        'projectID': 'f104bi07c490'
      }
    }
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/linkedin/post?limit=1000", config)
      const result = await response.json()
      setPosts(result.data)
    } catch (error) {
      console.log(error);
    } finally{
      setLoader(false)
    }
  }
  document.body.style.backgroundColor = "#f4f2ee"
  useEffect(() => {
    getPosts()
  }, [])
  return (
    loader ?
      <Loader />
      :
      <div>
        <Navbar />
        
      </div>
  )
}

export default Feed

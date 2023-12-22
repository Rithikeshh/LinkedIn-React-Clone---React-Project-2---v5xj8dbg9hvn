import React, { useEffect, useRef, useState } from 'react'
import "./Feed.css"
import { Link } from 'react-router-dom'

function Feed({loading, setLoading}) {

  const [loader, setLoader] = useState(true)
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [limitPost, setLimitPost] = useState(10);
  const {name} = JSON.parse(localStorage.getItem("userDetails"))
  const timer = useRef(null)

  const getPosts = async (page, limit) => {
    
    const config = {
      method: 'GET',
      headers: {
        'projectID': 'f104bi07c490'
      }
    }
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?limit=${limit}&page=${page}`, config)
      const result = await response.json()
      setPosts(prev=>{
        return[...prev, ...result.data]
      })
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
      setLoader(false)
    }
  }
  function handleScroll(){
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if((totalHeight * 0.8) <= scrollPosition){
      
      if(timer.current === null){
        setPageNumber((oldValue)=>{
          return oldValue+1
        })
        setLimitPost(5)
        timer.current = setTimeout(()=>{
          timer.current = null
        },1000)
      }
    }
  }
 
  useEffect(()=>{
    getPosts(pageNumber,limitPost)
  },[pageNumber])
  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  }, [])
  return (
    !loading && 
    <div className='all-content-container'>
      
      <div className='feedPage-layout-container'>
        {/* Grid layout */}
        <div className='feedPage-layout'>

          {/* sidebar */}
          <div className='feedPage-layout--sidebar'>
            
            {/* Profile */}
            <div className='feedPage-layout--sidebar-profile'>

              <div className='feedPage-layout--sidebar-profile-nameAndImage'>

                  <div className='feedPage-layout--sidebar-profile-cover'></div>
                  <Link to="#" className='feedPage-layout--sidebar-profile-image-container'>
                    <div>
                      <img className='feedPage-layout--sidebar-profile-image' src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" />
                    </div>
                    <div className='feedPage-layout--sidebar-profile-name'>{name}</div>
                  </Link>
                  <p className='feedPage-layout--sidebar-profile-job'>Full Stack Web Developer</p>

              </div>

              <div className='feedPage-layout--sidebar-profile-viewcount'>
                <div>
                  <span>Profile viewers</span>
                  <span>15</span>
                </div>

                <div>
                  <span>Post impressions</span>
                  <span>27</span>
                </div>
              </div>

              <div className='feedPage-layout--sidebar-profile-premium'>
                <div>
                  <p>Strengthen your profile with an AI writing assistant</p>
                  <Link to="#">Try Premium for ₹0</Link>
                </div>
              </div>
            </div>

            {/* Groups */}
            <div className='feedPage-layout--sidebar-groupAndChannel'>
              <div>
                <Link to="#">Groups</Link>
                <Link to="#">Events</Link>
                <Link to="#">Followed Hashtags</Link>
              </div>
              <p>Discover more</p>
            </div>

          </div>

          {/* main */}
          <div className='feedPage-layout--main'>

            {/* create post */}
            <div className='feedPage-main--box'>

              <div className='feedPage-layout--main-createPost-container'>

                <div className='feedPage-layout--main-createPost-input-container'>
                  <Link to="#"><img src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" /></Link>
                  <button>
                    <span>Start a post</span>
                  </button>
                </div>

                <div className='feedPage-layout--main-createPost-media'>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="image-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                      <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                    </svg>
                    <span>Media</span>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="calendar-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                      <path d="M3 3v15c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3H3zm13 1.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm-8 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM19 18c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V9h14v9zM7 11h2v2H7v-2zm0 4h2v2H7v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z"></path>
                    </svg>
                    <span>Event</span>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="content-align-left-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                      <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
                    </svg>
                    <span>Atricle</span>
                  </div>
                </div>

              </div>

            </div>

            <div className='border'></div>

            {/* posts */}
            {
              posts.map((post, index)=>(
                
                <SinglePost key={index} post={post}/>
              ))
            }
          </div>

          {/* aside */}
          <div className='feedPage-layout--aside'>

            {/* LinkedIn news */}
            <div className='feedPage-layout--aside-news-container'>
              <div className='feedPage-layout--aside-news'>
                <div>
                  <span>LinkedIn News</span>
                </div>
                <ul className='feedPage-layout--aside-news-list'>
                  <li className='feedPage-layout--aside-news-list-item'>
                    <div>
                      <span></span>
                      <p>Defying trends in frontline workforce</p>
                    </div>
                    <span>Top news • 256 readers</span>
                  </li>
                  <li className='feedPage-layout--aside-news-list-item'>
                    <div>
                      <span></span>
                      <p>Hospitals on expansion mode</p>
                    </div>
                    <span>21h ago • 170 readers</span>
                  </li>
                  <li className='feedPage-layout--aside-news-list-item'>
                    <div>
                      <span></span>
                      <p>Muthoottu Mini to hire 2,000</p>
                    </div>
                    <span>2d ago • 4,918 readers</span>
                  </li>
                  <li className='feedPage-layout--aside-news-list-item'>
                    <div>
                      <span></span>
                      <p>What's next for online gaming</p>
                    </div>
                    <span>21h ago</span>
                  </li>
                  <li className='feedPage-layout--aside-news-list-item'>
                    <div>
                      <span></span>
                      <p>DNap at work: Yay or nay?</p>
                    </div>
                    <span>23h ago • 388 readers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social connect */}
            <div className='feedPage-layout--aside-social-connect-container'>
              <div className='feedPage-layout--aside-social-connect'>
                <p>Ad</p>
                <div>
                  <img src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" />
                  <img src={"https://media.licdn.com/dms/image/D4D03AQEAGKpE3guIKA/profile-displayphoto-shrink_100_100/0/1682748449835?e=1708560000&v=beta&t=H1ZWtqL-UCoh3C8c0DmzTCpKuaAudZl1Pjg71WVnjQk"} alt="" />
                </div>
                <p>{name}, connect with <span>Alok</span></p>
                <a href="https://www.linkedin.com/in/alok-shaw-b57a7426a/" target='_blank'>Connect</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed

const SinglePost=({post})=>{
  const contentContainerRef = useRef()
  const [showSeeMore, setShowSeeMore] = useState(false)
  const [fitContent, setFitContent] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  useEffect(()=>{

    if (contentContainerRef.current.scrollHeight > contentContainerRef.current.clientHeight) {
      setShowSeeMore(true)
    }
  },[])
  function handleContentHeight(e){
    setShowSeeMore(false)
    setFitContent(true)
  }
  function handleLike(e){
    setIsLiked(n=>!n)
  }
  return(
    <div className='feedPage-main--box'>

      <div className='feedPage-main-post'>

        <div className='feedPgae-main-post--imageAndName-container'>
          <img src={post.author.profileImage} alt="" />
          <div>
            <p>{post.author.name}</p>
            <span>{post.channel.name}</span>
          </div>
        </div>

        <div ref={contentContainerRef} className={`feedPgae-main-post--content-container ${fitContent ? "feedPgae-main-post--content-container-fit-height": ""}`}>
          
          <span  className='feedPgae-main-post--content'>{post.content}</span>
          {showSeeMore && <span className='content-see-more' onClick={handleContentHeight}>...see more</span>}
        </div>

        <img className='feedPgae-main-post--content-image' src={post.channel.image} alt="" />

        <div className='feedPgae-main-post-likeAndComment'>
          <div>
            <div>
              <img src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="" />
              <img src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8" alt="" />
              <img src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22" alt="" />
              <span>{post.likeCount}</span>
            </div>
            <p>{post.commentCount} comments</p>
          </div>

          <div className='feedPage-main-post-like-comment-buttons'>
            <div onClick={handleLike}>
            {!isLiked  ? 
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up-outline-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
              </svg>
              :
              <img src="https://static.licdn.com/aero-v1/sc/h/5zhd32fqi5pxwzsz78iui643e" alt=''/>
            }
              <span className={`${isLiked ? "liked": ""}`}>Like</span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
              </svg>
              <span>Comment</span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="repost-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                <path d="M13.96 5H6c-.55 0-1 .45-1 1v10H3V6c0-1.66 1.34-3 3-3h7.96L12 0h2.37L17 4l-2.63 4H12l1.96-3zm5.54 3H19v10c0 .55-.45 1-1 1h-7.96L12 16H9.63L7 20l2.63 4H12l-1.96-3H18c1.66 0 3-1.34 3-3V8h-1.5z"></path>
              </svg>
              <span>Repost</span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="rtl-flip" id="send-privately-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
              </svg>
              <span>Send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
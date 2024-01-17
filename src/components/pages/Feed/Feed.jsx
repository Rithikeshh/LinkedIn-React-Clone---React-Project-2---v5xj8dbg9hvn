import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./Feed.css"
import { Link, useNavigate } from 'react-router-dom'
import likePost from '../../utils/likePost'
import getComments from '../../utils/getComments'
import deleteComment from '../../utils/deleteComment'
import postComment from '../../utils/postComment'
import { createPortal } from 'react-dom'
import createPost from '../../utils/createPost'
import deletePost from '../../utils/deletePost'
import updatePost from '../../utils/updatePost'

function Feed({loading, setLoading}) {

  const [loader, setLoader] = useState(true)
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [limitPost, setLimitPost] = useState(10);
  const [showPostModal, setShowPostModal] = useState(false)
  const {name, id} = JSON.parse(localStorage.getItem("userDetails"))
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

      if(result.data){

        setPosts(prev=>{
          return[...prev, ...result.data]
        })
      }
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
                  <Link to={`/profile/${id}`} className='feedPage-layout--sidebar-profile-image-container'>
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
                <Link to="/groups">Groups</Link>
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
                  <button onClick={()=>{
                    setShowPostModal(true)
                  }}>
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
                
                <SinglePost key={index} post={post} index={index} setPosts={setPosts} getPosts={getPosts}/>
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
      {showPostModal && <CreatePostModal setShowPostModal={setShowPostModal} getPosts={getPosts} setPosts={setPosts}/>}
    </div>
  )
}

export default Feed

function CreatePostModal({setShowPostModal, getPosts, setPosts}){
  
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const {name} = JSON.parse(localStorage.getItem("userDetails"))
  const contentEditableRef = useRef(null);
  const imagePreviewRef = useRef(null);

  const handleContentChange = (e) => {
    const content = contentEditableRef.current.innerHTML;
    setContent(content)
    
    const imgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
    const matches = content.match(imgRegex);
    
    if (matches) {
      
      const imageSrc = matches[0].match(/src=["'](.*?)["']/)[1];
      contentEditableRef.current.textContent = content.replace(imgRegex, "")

      setImageSrc(imageSrc)
    }
  };

  function handleFileInput(e){
    
    const file = e.target.files[0]
    const reader  = new FileReader();
    
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
    }
    reader.onloadend = function () {
      setImageSrc(reader.result);
    }
  }
  function handleCreatePost(e){
    
    createPost('Tech in Education: The Digital Classroom', contentEditableRef.current.textContent, imagePreviewRef, setShowPostModal, getPosts, setPosts)
  }
  return(
    <>
      {
        createPortal(
          <div onClick={()=>{
            setShowPostModal(false)
          }} className='create-post-modal-container'>
            <div onClick={(e)=>{
              e.stopPropagation()
            }} className='create-post-modal'>
              <button onClick={()=>{
                setShowPostModal(false)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                  <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                </svg>
              </button>

              <div className='create-post-modal-share-box'>

                <div className='create-post-modal-share-box-header'>
                  <img src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" />
                  <div>
                    <span>{name}</span>
                    <span>Post to Anyone</span>
                  </div>
                </div>

                <div className='create-post-modal-share-box-content-container'>

                  <div className='create-post-modal-share-box-content'>

                    <div  
                      className="ql-editor ql-blank" 
                      data-gramm="false" 
                      contentEditable="true" 
                      data-placeholder={`${content ? "" : "What do you want to talk about?"}`} 
                      aria-placeholder="What do you want to talk about?" 
                      aria-label="Text editor for creating content" 
                      role="textbox" 
                      aria-multiline="true" 
                      data-test-ql-editor-contenteditable="true"
                      ref={contentEditableRef}
                      onInput={handleContentChange}
                      
                    >
                      
                    </div>

                    {imageSrc &&
                      <div className='ql-image-container'>
                        <button onClick={()=>{
                          setImageSrc("")
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                            <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                          </svg>
                        </button>
                      <div>
                        <img ref={imagePreviewRef} src={imageSrc}   />
                      </div>

                    </div>}

                  </div>

                  <div className='create-post-modal-share-box-content-post'>
                    
                    <div >
                      <label htmlFor="file-input">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="image-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                      </svg>
                      </label>
                      <input onInput={handleFileInput} type="file" id='file-input' />
                    </div>

                    <div>
                      <button onClick={handleCreatePost} className={`${(content || imageSrc) ? 'active' : ''}`}>Post</button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>,
          document.body
        )
      }
    </>
  )
}


const namesArr = [
  "Kwame", "Amina", "Chukwu", "Zahara", "Moussa",
  "Sakura", "Ravi", "Yuki", "Ji-hoon", "Ananya",
  "Matteo", "Elena", "Lukas", "Sophie", "Alessio",
  "Mia", "Elijah", "Isabella", "Liam", "Sofia",
  "Kai", "Talia", "Mateo", "Aroha", "Leilani",
  "Lucas", "Isabella", "Mateo", "Valentina", "Thiago"
]

export const SinglePost=({post, index, setPosts, getPosts})=>{

  const contentContainerRef = useRef()
  const [showSeeMore, setShowSeeMore] = useState(false)
  const [fitContent, setFitContent] = useState(false)
  const [isLiked, setIsLiked] = useState(localStorage.getItem(post._id) ? true : false);
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [showEditPostModal, setShowEditPostModal] = useState(false)
  const navigate = useNavigate()
  const myElementRef = useRef()

  function navigateToProfile(){
    navigate(`/profile/${post.author._id }`)
  }

  const {id} = JSON.parse(localStorage.getItem("userDetails"))

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
    likePost(post._id, setLikeCount)
  }
  function handleComments(e){
    if(comments.length === 0){
      
      setShowComments(true)
      
    }
  }
  function handlePostEditModal(){
    setShowEditPostModal(n=>!n)
  }
  return(
    
    <div className='feedPage-main--box'>

      <div className='feedPage-main-post'>

        <div className='feedPgae-main-post--imageAndName-container'>
          {/* <img src={post.author.profileImage} alt="" /> */}
          {post.author.profileImage ? 
          <img onClick={navigateToProfile} src={post.author.profileImage} alt='profile picture' />
          :        
          <img onClick={navigateToProfile} src={`https://ui-avatars.com/api/?name=${post.author.name.slice(0,1)}&background=random`} alt="" />
          }  
        <div>
            <p onClick={navigateToProfile} style={{textTransform:"capitalize"}}>{post.author.name}</p>
            {/* <span>{post.channel.name}</span> */}
            <span>{post.title}</span>
          </div>

          {id == post.author._id && 
            <div>
              <svg ref={myElementRef} onClick={handlePostEditModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="overflow-web-ios-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="currentColor">
                <path d="M3 9.5A1.5 1.5 0 114.5 8 1.5 1.5 0 013 9.5zM11.5 8A1.5 1.5 0 1013 6.5 1.5 1.5 0 0011.5 8zm-5 0A1.5 1.5 0 108 6.5 1.5 1.5 0 006.5 8z"></path>
              </svg>
            </div>
          }
          {showEditPostModal && <EditOptionPostModal myElementRef={myElementRef} setShowEditPostModal={setShowEditPostModal} post={post} index={index} setPosts={setPosts} getPosts={getPosts}/>}
        </div>

        <div className={`feedPgae-main-post--content-container ${fitContent ? "feedPgae-main-post--content-container-fit-height": ""}`}
          ref={contentContainerRef}
        >
          
          <span  className='feedPgae-main-post--content'>{post.content}</span>
          {showSeeMore && <span className='content-see-more' onClick={handleContentHeight}>...see more</span>}
        </div>

        {post.images?.[0] && <img className='feedPgae-main-post--content-image' src={post.images[0]} alt="" />}

        <div className='feedPgae-main-post-likeAndComment'>
          <div>
            <div>
              <img src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="" />
              <img src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8" alt="" />
              <img src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22" alt="" />
              <span>{likeCount}</span>
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
            <div onClick={handleComments}>
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
        
        {showComments && <Comments id={post._id}/>}
      </div>
    </div>
  )
}

function EditOptionPostModal({myElementRef, post, setShowEditPostModal, index, setPosts, getPosts}){
  const [showEditModal, setShowEditModal] = useState(false)

  function setModalFalse(e){
    if(!myElementRef.current.contains(e.target)){
      setShowEditPostModal(false)
    }
  }
  useEffect(()=>{
      document.addEventListener('click', setModalFalse)
      return ()=>{
        document.removeEventListener('click',setModalFalse);
      }
  },[])
  function handleDeletePost(e){
    e.stopPropagation()
    deletePost(post._id)

    setTimeout(()=>{
      setModalFalse(false)
      setPosts(prev=>{
        const newComments = prev.splice(index,1)
        return [...prev]
      })
    })
  }
  return(
    <>
    <div>
      <div onClick={(e)=>{
        e.stopPropagation()
        setShowEditModal(true)
      }}>
        <img src="https://cdn.iconscout.com/icon/free/png-256/free-edit-2653317-2202989.png" alt="" />
        <span>Edit</span>
      </div>
      <div onClick={handleDeletePost}>
        <img src="data:image/png;base64,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" alt="" />
        <span>Delete</span>
      </div>
    </div>
    {showEditModal && <EditPostModal setShowEditPostModal={setShowEditPostModal} setShowEditModal={setShowEditModal} post={post} setPosts={setPosts} getPosts={getPosts}/>}
    </>
  )
}

function EditPostModal({setShowEditPostModal, setShowEditModal, post, setPosts, getPosts}){
  
  const [content, setContent] = useState(post.content);
  const [imageSrc, setImageSrc] = useState(post.images ? post.images[0] : '');
  const {name} = JSON.parse(localStorage.getItem("userDetails"))

  const contentEditableRef = useRef(null);
  const imagePreviewRef = useRef(null);

  useEffect(()=>{
    contentEditableRef.current.textContent = content
    
  },[])

  const handleContentChange = (e) => {
    const content = contentEditableRef.current.innerHTML;
    setContent(content)
    
    const imgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
    const matches = content.match(imgRegex);
    
    if (matches) {
      
      const imageSrc = matches[0].match(/src=["'](.*?)["']/)[1];
      contentEditableRef.current.textContent = content.replace(imgRegex, "")

      setImageSrc(imageSrc)
    }
  };

  function handleFileInput(e){
    
    const file = e.target.files[0]
    const reader  = new FileReader();
    
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
    }
    reader.onloadend = function () {
      setImageSrc(reader.result);
    }
  }
  function handleCreatePost(e){
    
    updatePost(post._id, 'Tech in Education: The Digital Classroom', contentEditableRef.current.textContent, imagePreviewRef, setShowEditModal, setPosts, getPosts)
  }
  return(
    <>
      {
        createPortal(
          <div onClick={()=>{
            setShowEditModal(false)
          }} className='create-post-modal-container'>
            <div onClick={(e)=>{
              e.stopPropagation()
            }} className='create-post-modal'>
              <button onClick={()=>{
                setShowEditModal(false)
                setShowEditPostModal(false)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                  <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                </svg>
              </button>

              <div className='create-post-modal-share-box'>

                <div className='create-post-modal-share-box-header'>
                  <img src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" />
                  <div>
                    <span>{name}</span>
                    <span>Post to Anyone</span>
                  </div>
                </div>

                <div className='create-post-modal-share-box-content-container'>

                  <div className='create-post-modal-share-box-content'>

                    <div  
                      className="ql-editor ql-blank" 
                      data-gramm="false" 
                      contentEditable="true" 
                      data-placeholder={`${content ? "" : "What do you want to talk about?"}`} 
                      aria-placeholder="What do you want to talk about?" 
                      aria-label="Text editor for creating content" 
                      role="textbox" 
                      aria-multiline="true" 
                      data-test-ql-editor-contenteditable="true"
                      ref={contentEditableRef}
                      onInput={handleContentChange}
                      
                    >
                      
                    </div>

                    {imageSrc &&
                      <div className='ql-image-container'>
                        <button onClick={()=>{
                          setImageSrc("")
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                            <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                          </svg>
                        </button>
                      <div>
                        <img ref={imagePreviewRef} src={imageSrc}   />
                      </div>

                    </div>}

                  </div>

                  <div className='create-post-modal-share-box-content-post'>
                    
                    <div >
                      <label htmlFor="file-input">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="image-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                      </svg>
                      </label>
                      <input onInput={handleFileInput} type="file" id='file-input' />
                    </div>

                    <div>
                      <button onClick={handleCreatePost} className={`${(content || imageSrc) ? 'active' : ''}`}>Update</button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>,
          document.body
        )
      }
    </>
  )
}

function Comments({id}){
  const {name} = JSON.parse(localStorage.getItem("userDetails"))
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  useEffect(()=>{
    getComments(id, setComments)
  },[])
  function handleInput(e){
    setNewComment(e.target.value);
  }
  function handlePostComment(e){
    
    postComment(id, newComment, setComments, setNewComment)
  }
  return(
    <div className='feedPgae-main-post-comments-container'>
      <div className='feedPgae-main-post-comment-input'>
        <img src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" />
        <input onChange={handleInput} value={newComment} type="text" placeholder='Add a comment...' />
        {newComment && <span onClick={handlePostComment}>Post</span>}
      </div>
      <p>All Comments</p>
      <div>
          {comments.map((comment, index)=>(
            <SingleComment key={index} index={index} comment={comment} setComments={setComments}/>
          ))}
      </div>
    </div>
  )
}

function SingleComment({index, comment, setComments}){
  const random = useMemo(()=>Math.floor(Math.random() * 30),[]);
  const myElementRef = useRef()
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  function handleModal(e){
    setShowDeleteCommentModal(n=>!n)
  }
  return(
    <div className='feedPgae-main-post-comment'>

      <img src={`https://ui-avatars.com/api/?name=${namesArr[random].slice(0,1)}&background=random`} alt="" />

      <div>

        <div>
          <p>{namesArr[random]}</p>

          <div style={{position: "relative"}}>
            <span>{comment.isEdited ? parseInt((new Date() - new Date(comment.updatedAt))/ (1000 * 60 * 60 * 24)) : parseInt((new Date() - new Date(comment.createdAt))/ (1000 * 60 * 60 * 24))}d</span>
            <svg ref={myElementRef} onClick={handleModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="overflow-web-ios-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="currentColor">
              <path d="M3 9.5A1.5 1.5 0 114.5 8 1.5 1.5 0 013 9.5zM11.5 8A1.5 1.5 0 1013 6.5 1.5 1.5 0 0011.5 8zm-5 0A1.5 1.5 0 108 6.5 1.5 1.5 0 006.5 8z"></path>
            </svg>
          </div>

        </div>
        {showDeleteCommentModal && <DeleteCommentModal index={index} comment={comment} setComments={setComments} setShowModal={setShowDeleteCommentModal} myElementRef={myElementRef}/>}
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

function DeleteCommentModal({index, myElementRef, setShowModal, comment, setComments}){

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
  function handleDeleteComment(e){
    e.stopPropagation()
    deleteComment(comment._id)

    setTimeout(()=>{
      setModalFalse(false)
      setComments(prev=>{
        const newComments = prev.splice(index,1)
        return [...prev]
      })
    },200)
  }
  return(
    <div onClick={handleDeleteComment} className='deleteComment-modal'>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX////Y2Nh1dXW6urpZWVlxcXHc3Ny3t7fW1tbh4eHt7e29vb2Hh4fCwsLNzc15eXnz8/Ojo6OPj49tbW1oaGhTU1NKSkpiYmJ+fn6srKzHx8f5+fmkpKSJiYnx8fGdnZ2UlJQnyP6TAAAFm0lEQVR4nO3d63aiMBQFYBFzkauC03LR6vs/5YBCJcEolMtB195rzfyKNh8nQbH0uFpNF5lGyfp1kijlE85iuvhhzDr4yrA49Kmn2zuOF3fk3RKfHOop98u2c/1+68jeiuj09V2Nb0TMvV8he53foSfqeXePW+1Bdkii10kOFTLOqCfeNXkFjNNdp/E/x/qsNPHERou41SQOOj8iuxFjd8JZjZj8BmRpj8cc2TsVsSohy3s8ZvdORdxVm9Du9aj0dljCPoeFKuJWjrDbWabOz/ptiphXUxU9H/c+RaxKuO470x17kyJWr4W9S/hbRDbBpEZN/VrYf7Hl73E6/esuLPMeO7E+kf5llqQ7cdcxTli9ncm7PqKRvCpi4hiH/DhKxqo2P3pJ2DHVO+iuw/s+eh1//7tnczh1f+trzi7qfbk+bb439/z7Wg++bO7/ccTUCeONYhz4OZ0Tvv6Rs+ewUTKsipelVfCab6WKyRDg9kCNeRhlnW4GrdN0kSVcrxXhv/MAYZcP5SmiLNPN9wBhv8+t54sq/BogXOY21M+mEEK4xEAIIYT0gRBCCOkDYfd8/rWFR015nFAVHgYIxVtc4/f5dboeZ5nLVNuGgz5sSxdJVEt4GQJcrU4LXKfqh4l/+EWekjxaXBUV4Bfrd7/AowgWswUVkjXr9/V1HOwrkgfH6OQtIgk7fDfiucMLWGdru4vLuDdrcmEvLWILIYQQUgdCCCGkz8jCrU+cyYWOxYkjs4mF0qIOl+6HC4u4Hy+UHy+0go8XWh8v5P6nC5vLFEIIISQKhBBCSB8IIYSQPhBCCCF9IIQQQvpACCGEhnBuBZIX/78M5zKwug0sRj54ShIhl6lX9pW7+K9mzoNzWIxM9sHLkf6l7GXnpVIbSSHk6bpqLBNHz2cuz3E9cv/iSJzqkWuhPiWBkO/v95+y8BlRNm7GZdEzYBbeR8ZH5SnnF3Ll79lZ8mQxR8rIi/lYSKWPA1OqOL8wUO+tZWfTxLl2x3gsjCP1Pg4BpZCftdmw4OG4Ivqf9nsmYaDdds32jZHzC/Xbo1n6eOLcb43MHgP5UR8ZUgoz/TZ30/7irf4TzLBMeaQNXMeNdTG3kLutW9wNi6+1nNfsaBjZ6lQRN15oZxfaA4R7CCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCH8s7Dd6+tkmPe+JTR1dluUsNUfz9hWsE+/Nn1k3PjZ8/fcCzvO28pa1Tb0H2wfi6TxlPMLWy0AjV1APe1QRIZDYUntKZXlPH/vS7UTp3FzFUJf632ZGUdqR03pGErQv1Q51zxrvNps5VoAjYeiyEl5TqV5L0UPWnGfThw97ad8vhNjw0vFLY1utYzZykiSPsKZd236y5ip1+P9YBSDypFxaD8fae3jaqSn9e2l6QXN/bOXJFGrb/ODkeLiJd7Zftnvmss0SpLTvrVZyfp5X/Ni1qOMzGiE82XC77D8WYjQbgidUYW7ZQilmEyYU9tuaX5ztdiNKlxR225RvtQ5H1fY5fw3eYIm0B8XuNpS6yz9S6vlyMIFnGqaLxWjn2iKkAt5IBTh2ED6ZaoBg9GFOXERlbNMIfwZXUhbRJ5pwGx84MoxfrHD9JGurQlHP8+UyeyAZqVKX+jA8XdhmZ0QtpsFUtaXNjPEkkGm168Ujvx+pg4vD2Xxz50xbZ09+oVTI4G+Wmgy0Rq9prUhKDLJebRO/njVzAv0J9qENZG6isKdFFgQM1ripEu0iqQkjn7N9DCOTWUU7iRvZR5ECgqjsK2ZfKvyQsOdGSmEa018itGN20CImZTlzwm28/pucbaBP/0LpOvL7ZDt9x9cBWWafBokFAAAAABJRU5ErkJggg==" alt="" />
      <span>Delete</span>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import SpinnerLoader from '../../SpinnerLoader/SpinnerLoader'
import { useDarkMode } from '../../providers/DarkModeProvider'

function Profile({ loading, setLoading }) {

    const {darkMode} = useDarkMode()
    const param = useParams()
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true);
    const {name, id} = JSON.parse(localStorage.getItem("userDetails"))

    async function handleConnect(){
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/linkedin/user/${param.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'f104bi07c490'
                    }
                }
            )
            setUser(response.data.data)
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoader(false)
            setLoading(false)
        }
    }
    
    useEffect(() => {
        async function getUser(){
            try {
                const token = localStorage.getItem("userToken");
                const response = await axios.get(`https://academics.newtonschool.co/api/v1/linkedin/user/${param.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            projectID: 'f104bi07c490'
                        }
                    }
                )
                setUser(response.data.data)
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoader(false)
                setLoading(false)
            }
        }
        getUser()
    },[])
    return (
        !loading &&
        <>
        {loader ? 
            <SpinnerLoader/>
            :
            <div className='all-content-container'>
                <div className='feedPage-layout-container'>
                    <div className='groupPage-layout'>
                        <div className='groupPage-layout--main'>
                            <div className={`feedPage-main--box ${darkMode ? 'dark':''}`}>
                                <div className='image-and-cover-container'>
                                    <img className='profile-cover' src="https://img.freepik.com/free-photo/old-cement-wall-texture_1149-1280.jpg" alt="" />
                                    {
                                    user.profileImage ? 
                                    <img className={`profile-image ${darkMode ? 'dark':''}`} src={user.profileImage} alt=''/>
                                    : 
                                    <img className={`profile-image ${darkMode ? 'dark':''}`} src={`https://ui-avatars.com/api/?name=${user.name.slice(0, 1)}&background=random`}/>
                                    }
                                </div>
                                <p className={`profile-name ${darkMode ? 'dark':''}`}>{user.name}</p>
                                <p className={`profile-dummy-description ${darkMode ? 'dark':''}`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque nesciunt sequi error eum in, praesentium facilis, non magni voluptatum laboriosam quaerat modi quis ratione vel quasi? Quas modi animi placeat.</p>
                                {id !== user._id  && <p className={`profile-msg ${darkMode ? 'dark':''}`}>Connecting and Messaging feature is not available</p>}
                                <div className={`profile-dummy-button ${darkMode ? 'dark':''}`}>
                                    {id !== user._id ?
                                        <>
                                            <button onClick={handleConnect}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="connect-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="currentColor">
                                                    <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"></path>
                                                </svg>
                                                Connect</button>
                                            <button>Message</button>
                                            <button>More</button>
                                        </>
                                        :
                                        <>
                                            <button>Open to</button>
                                            <button>Add profile section</button>
                                            <button>More</button>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className={`feedPage-main--box ${darkMode ? 'dark':''}`}>
                                <div className={`profile-dummy-about ${darkMode ? 'dark':''}`}>
                                    <h3>About</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos enim excepturi officiis ipsum, sunt iure repellat recusandae? Doloremque maxime rerum consectetur perspiciatis quae facilis.</p>
                                    <p> Quam minima, eligendi saepe, magnam impedit?
                                    Commodi id soluta officia possimus ea blanditiis nesciunt exercitationem quibusdam doloremque, dolores modi aspernatur harum nisi labore nihil excepturi incidunt nobis eligendi reiciendis quos! Optio architecto debitis culpa voluptate asperiores?
                                    Obcaecati quaerat voluptatem aliquid illum aliquam quia enim esse. Consequatur labore molestias itaque ipsam illum adipisci consectetur, provident fugiat a ex! Ipsam architecto, dolorem aliquid minima rem voluptatem deserunt maxime!</p>
                                </div>
                            </div>
                        </div>
                        <div className='groupPage-layout--aside'>
                            <div className={`feedPage-layout--aside-social-connect-container ${darkMode ? 'dark': ''}`}>
                                <div className={`feedPage-layout--aside-social-connect ${darkMode ? 'dark': ''}`}>
                                    <p>Ad</p>
                                    <div>
                                        <img src={`https://ui-avatars.com/api/?name=${name.slice(0,1)}&background=random`} alt="" />
                                        <img title='linked premium' src={"https://media.licdn.com/dms/image/C560EAQEkljsPdDVhZw/rightRail-logo-shrink_200_200/0/1630999581528?e=1706108400&v=beta&t=FLyg9G3NSxxMbHZT-bwGqCGnKs7ybVGl5AfYAh_5g3o"} alt="" />
                                    </div>
                                    <p>See who's viewed your profile in the last 90 days</p>
                                    <Link to="/premium">Try for free!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
        
    )
}

export default Profile

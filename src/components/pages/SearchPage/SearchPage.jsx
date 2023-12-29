import React, { useEffect, useState } from 'react'
import "./SearchPage.css"
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../providers/SearchProvider';
import { SinglePost } from '../Feed/Feed';

function SearchPage({loading, setLoading}) {

    const [searchedData, setSearchedData] = useState([])
    const {searchTerm , searchField, setSearchField} = useSearch()
    const {name} = JSON.parse(localStorage.getItem("userDetails"))
    console.log(searchTerm);
    console.log(searchField);
    const handleSearch = async () => {
        const config = {
            method: 'GET',
            headers: {
                projectID: "f104bi07c490"
            }
        };
        try{
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?search={"${searchField}":"${searchTerm}"}`, config)
            const result = await response.json()
            console.log(result);
            if(result.data){

                setSearchedData(prev=>{
                  return[...result.data]
                })
              }
              else{
                setSearchedData([])
              }
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false)
        } 
    };
    useEffect(()=>{
        handleSearch()
    },[searchTerm, searchField])
  return (
    !loading && 
    <div className='all-content-container'>

        <div className='feedPage-layout-container'>
            <nav className='searchPage-field-navbar'>
                <ul className='searchPage-field-lists'>
                    <li>search posts by: </li>
                    <li className={`${searchField.includes('content') ? 'active': 'unactive'}`} onClick={(e)=>{
                        setSearchField("content")
                    }}>Content</li>
                    <li className={`${searchField.includes('author') ? 'active': 'unactive'}`} onClick={(e)=>{
                        setSearchField("author.name")
                    }}>Author</li>
                    <li className={`${searchField.includes('title') ? 'active': 'unactive'}`} onClick={(e)=>{
                        setSearchField("title")
                    }}>title</li>
                    <li className={`${searchField.includes('channel') ? 'active': 'unactive'}`} onClick={(e)=>{
                        setSearchField("channel.name")
                    }}>Channel</li>
                </ul>
            </nav>
            {/* Grid layout */}
            <div  className='feedPage-layout searchPage-layout'>
                
                {/* sidebar */}
                <div className='feedPage-layout--sidebar'>
                    <div style={{top: "120px"}} className='feedPage-layout--aside-social-connect-container'>
                        <div className='searchPage-sidebar-content'>
                            <span>On this page</span>
                            <p>Posts</p>
                        </div>
                    </div>
                </div>

                {/* main */}
                <div className='feedPage-layout--main'>
                {searchedData.length == 0 ?
                    <div className='feedPage-main--box'>
                        <div className='no-post-found'>
                            Sorry No Post Found!
                        </div>
                    </div>
                    :
                    searchedData.map((post, index)=>(
                    
                    <SinglePost key={index} post={post} />
                    ))
                }
                </div>

                {/* aside */}
                <div className='feedPage-layout--aside'>
                    <div style={{top: "120px"}} className='feedPage-layout--aside-social-connect-container'>
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

export default SearchPage

// const titleArr = [
//     "Content", "Author", "Title", "Channel", 
// ]
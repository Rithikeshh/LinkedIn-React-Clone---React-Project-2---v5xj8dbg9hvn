import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../providers/SearchProvider';

function SearchPage({loading, setLoading}) {

    const [searchedData, setSearchedData] = useState([])
    const {searchTerm , searchField, setSearchField} = useSearch()
    
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
            setLoading(false)
            if(result.data){

                setSearchedData(prev=>{
                  return[...prev, ...result.data]
                })
              }
        }catch(error){
            console.log(error);
        }     
    };
    useEffect(()=>{
        handleSearch()
    },[searchTerm, searchField])
  return (
    !loading && 
    <div className='all-content-container'>

        <div className='feedPage-layout-container'>

            {/* Grid layout */}
            <div className='feedPage-layout'>
                
                {/* sidebar */}
                <div className='feedPage-layout--sidebar'>Alok</div>

                {/* main */}
                <div className='feedPage-layout--main'>Kumar</div>

                {/* aside */}
                <div className='feedPage-layout--aside'>Shaw</div>

            </div>

        </div>

    </div>
  )
}

export default SearchPage

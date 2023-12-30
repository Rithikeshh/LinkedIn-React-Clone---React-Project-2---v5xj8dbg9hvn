import React, { useEffect } from 'react'
import "./Groups.css"
function Groups({loading, setLoading}) {
    useEffect(()=>{
        setTimeout(()=>{

            setLoading(false)
        },2000)
    },[])
  return (
    !loading && 
    <div className='all-content-container'>
      <div className='feedPage-layout-container'>
        <div className='groupPage-layout'>
            <div className='groupPage-layout--main'>
                <div className='groupPage-common-container'>
                    <div className='create-and-discover-group-container'>
                        <div className='create-and'>
                        
                        </div>

                    </div>
                </div>
            </div>

            <div className='groupPage-layout--aside'>
                <div className='groupPage-common-container'>

                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Groups

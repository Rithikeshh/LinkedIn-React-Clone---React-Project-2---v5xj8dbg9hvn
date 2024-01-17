import React from 'react'
import './SpinnerLoader.css'
import CircularProgress from '@mui/material-next/CircularProgress';
import LinearProgress from '@mui/material-next/LinearProgress';


function SpinnerLoader() {
  return (
    <div className='spinner-container'>
      <CircularProgress fourColor={false} />
    </div>
  )
}

export default SpinnerLoader

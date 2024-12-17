import { Box, Typography } from '@mui/material'
import React from 'react'
import error from '../assets/erorr img.jpg'

const PageNotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Box>
        <Typography variant='h3'>Something’s wrong here...</Typography>
        <Typography variant='body1'>We can’t find the page you’re looking for. <br />
        Check out our help center or head back to home.</Typography>
        <img className='w-50' src={error} alt="" />
      </Box>
        
     
    </div>
  )
}

export default PageNotFound;

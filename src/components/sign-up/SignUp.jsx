import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SignUpImage from '../assets/signup-g.svg'

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    secondName: yup.string().required("Second name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().min(7,"Password must be 7 characters").max(10).required("Password is required"),
  })

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState:{errors} } = useForm({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })
  return (

    <Box className='d-flex justify-content-center align-items-center vh-100 '>
      <Box className='px-5'>
        <img src={SignUpImage} alt="" />
      </Box>
      <Box>
      <form onSubmit={handleSubmit((data) => {
        console.log(data);

      })}>
        <Box>
          <Typography className='fw-bold' variant='h4'>Get Start Shopping</Typography>
          <Typography variant='h6'>Welcome to FreshCart! Enter your email to get started.</Typography>
         <Box className='my-3'> <Controller control={control} name="firstName" render={({ field }) => (<TextField  error={errors?.firstName ? true : false}  placeholder='First Name' size='small' fullWidth {...field} />)} />
         <Typography className='text-danger'>{errors?.firstName?.message}</Typography></Box>
          <Box><Controller control={control} name="secondName" render={({ field }) => (<TextField error={errors?.secondName ? true : false} placeholder='Second Name' size='small' fullWidth {...field} />)} />
          <Typography className='text-danger'>{errors?.secondName?.message}</Typography></Box>
          <Box className='my-3'><Controller control={control} name="email" render={({ field }) => (<TextField error={errors?.email ? true : false} placeholder='Email' size='small' fullWidth {...field} />)} />
          <Typography className='text-danger'>{errors?.email?.message}</Typography></Box>
         <Box> <Controller control={control} name="password" render={({ field }) => ( <TextField error={errors?.password ? true : false} placeholder='Password' size='small' type={ShowPassword ? 'text' : 'Password'} slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start" onClick={() => setShowPassword(!ShowPassword)} >
                  {ShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputAdornment>
              ),
            },
          }} fullWidth {...field} />)} />
          <Typography className='text-danger'>{errors?.password?.message}</Typography></Box>
          <Button className='my-3' type='submit' fullWidth variant='contained' >Sign Up</Button>
        </Box>
      </form>
      </Box>
    </Box>
  )
}

export default SignUp;
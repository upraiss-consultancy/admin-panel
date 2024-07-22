import React from 'react';
import { Container, TextField, Button, Typography, Box, InputLabel, IconButton, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';
import { CheckBox } from '@mui/icons-material';
import {  NavLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { adminLogin } from '../../api/services/auth';
import { AdminLoginSchema } from '../../validations/AuthValidation';
import showToast from '../../utils/toast';
import "./Loginform.css";

function Loginform() {
  const { handleSubmit, control, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(AdminLoginSchema)
  });
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const response = await adminLogin('v0/admin/login', data);
    if (response) {
      const { statusText, data: { responseData: { adminUserId, token } } } = response;
      if (statusText === 'OK') {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 1); // Set expiry date to one day from now
        localStorage.setItem('token', token);
        localStorage.setItem('expiry', expiry)
        showToast('User login successfully', 'success');
        // const userDetails = { ...response?.data?.responseData, expiry: expiry };
        // const encryptedUserDetails = encryptData(userDetails);
        // localStorage.setItem('userDetails', JSON.stringify(encryptedUserDetails))
      }
      navigate('/')
    }
  }
  return (
    <Container>
      <Box className="relative h-[100vh]">
        <Box className="max-w-lg w-full  md:py-16 md:px-10 absolute border-black border-[1px]  top-[50%]  -translate-y-[50%] left-[50%] -translate-x-[50%] rounded-md">
          <Typography component="h1" variant="h4" className='text-center !mb-8'>
            Sign in
          </Typography>
          <Box component={'form'} className=' flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <InputLabel className='mb-2'>Email</InputLabel>
              <Controller name='email' control={control} rules={{ required: true }} render={({ field }) => <TextField placeholder="Enter your email" {...field} error={!!errors.email} helperText={errors.email?.message} className='w-full' InputProps={{
                endAdornment: (
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                )
              }} />} />
            </Box>
            <Box>
              <InputLabel className='mb-2'>Password</InputLabel>
              <Controller name='password' control={control} rules={{ required: true }} render={({ field }) => <TextField placeholder='Enter your password' {...field} error={!!errors.password} helperText={errors.password?.message} className='w-full' inputProps={{
                endAdornment: (
                  <IconButton>
                    <i class="fa-solid fa-eye-slash"></i>
                  </IconButton>
                )
              }} />} />
            </Box>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Box className="flex">
                <CheckBox />
                <Typography>Remember Me</Typography>
              </Box>
              <Typography>
                <NavLink>
                  Forgot Password
                </NavLink>
              </Typography>
            </Stack>
            <Button variant="contained" className='w-full !bg-[#DD781E] !mt-2 h-10' type='submit'>Next</Button>
            <Typography className='text-center'>
              Do you have account? <NavLink className={''}>Register</NavLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Loginform;




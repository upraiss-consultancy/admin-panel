import React from 'react';
import { Container, TextField, Button, Typography, Box, InputLabel, IconButton, Stack, Select, OutlinedInput, MenuItem } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { CheckBox } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { AdminRegisterSchema } from '../../validations/AuthValidation';
import { adminRegister } from '../../api/services/auth';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { yupResolver } from '@hookform/resolvers/yup';
import END_POINTS from '../../constants/endpoints';
const { REGISTER_ADMIN } = END_POINTS;
export const RegisterAdmin = () => {
    const { handleSubmit, control, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(AdminRegisterSchema)
    });
    const watchValue = watch();
    const onSubmit = async (data) => {
        const response = await adminRegister(REGISTER_ADMIN, data);
        console.log(response , "response")
    };
    return (
        <Container>
            <Box className="relative min-h-[100vh]">
                <Box className="max-w-lg w-full  md:py-6 md:px-10 absolute border-black border-[1px]  top-[50%]  -translate-y-[50%] left-[50%] -translate-x-[50%] rounded-md">
                    <Typography component="h1" variant="h4" className='text-center !mb-6'>
                        Sign Up
                    </Typography>
                    <Box component={'form'} className=' flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <Controller name='full_name' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Full Name' {...field} className='w-full' error={!!errors.full_name} helperText={errors.full_name?.message} />} />
                        </Box>
                        <Box>
                            <Controller name='email' control={control} rules={{ required: true }} render={({ field }) => <TextField  {...field} label='Email' className='w-full' error={!!errors.email} helperText={errors.email?.message} InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <EmailIcon />
                                    </IconButton>
                                )
                            }} />} />
                        </Box>
                        <Box>
                            <Controller name='mobile_no' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Phone' {...field} error={!!errors.mobile_no} helperText={errors.mobile_no?.message} className='w-full' InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <PhoneIcon />
                                    </IconButton>
                                )
                            }} />} />
                        </Box>
                        <Box>
                            <Controller name='password' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Password' {...field} className='w-full' error={!!errors.password} helperText={errors.password?.message} inputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <i class="fa-solid fa-eye-slash"></i>
                                    </IconButton>
                                )
                            }} />} />
                        </Box>
                        <Box>
                            <Controller name='address' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Address' error={!!errors.address} helperText={errors.address?.message}  {...field} className='w-full' inputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <LocationOnIcon />
                                    </IconButton>
                                )
                            }} />} />
                        </Box>
                        <Box>
                            <Controller name='department' control={control} rules={{ required: true }} render={({ field }) => <Select defaultValue='Sales' label='Department' className='w-full' {...field} error={!!errors.department} helperText={errors.department?.message} input={<OutlinedInput />}>
                                <MenuItem value={'Sales'}>Sales</MenuItem>
                                <MenuItem value={'Manager'}>Manager</MenuItem>
                            </Select>} />
                        </Box>
                        <Button type='submit' variant="contained" className='w-full !bg-[#DD781E] !mt-2 h-10'>Signup</Button>
                        <Typography className='text-center'>
                            Already have an account? <NavLink className={''} to={'/auth/login'}>Login</NavLink>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
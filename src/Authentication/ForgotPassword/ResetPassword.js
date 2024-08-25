import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // Handle the reset password request here
        console.log(data);
    };

    return (
        <Container maxWidth="xs">
            <Box className="relative h-[100vh]">
                <Box className="max-w-lg w-full  md:py-6 md:px-10 absolute border-black border-[1px]  top-[50%]  -translate-y-[50%] left-[50%] -translate-x-[50%] rounded-md">
                    <Typography variant="h5">Reset Password</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth className='!bg-[#DD781E]'>
                            Reset Password
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;

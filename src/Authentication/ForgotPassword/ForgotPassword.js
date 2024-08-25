import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // Handle the forgot password request here
        console.log(data);
    };

    return (
        <Container maxWidth="xs">
            <Box className="relative h-[100vh]">
                <Box className="max-w-lg w-full  md:py-6 md:px-10 absolute border-black border-[1px]  top-[50%]  -translate-y-[50%] left-[50%] -translate-x-[50%] rounded-md">
                    <Typography variant="h5">Forgot Password</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth className='!bg-[#DD781E]'>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;

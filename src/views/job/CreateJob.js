import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Typography, Card, CardContent, Stack } from '@mui/material';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';

const JobForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };

    const jobDetails = [
        {
            title: "Car Driver",
            pay_from: 12000,
            pay_to: 15000,
            job_details: "Mern stack",
            location: {
                city: "Gurugram",
                state: "Haryana",
                address: "cddvgvf"
            },
            working_hours: "2 hr",
            job_type: "Full Time",
            shift: "Day Shift",
            car_name: "Suv",
            car_type: "Manual",
            description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
            pay_type: "noida",
            experience: "noida",
            license: "noida"
        },
        {
            title: "Car Driver",
            pay_from: 12000,
            pay_to: 15000,
            job_details: "Mern stack",
            location: {
                city: "Gurugram",
                state: "Haryana",
                address: "cddvgvf"
            },
            working_hours: "2 hr",
            job_type: "Full Time",
            shift: "Day Shift",
            car_name: "Suv",
            car_type: "Manual",
            description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
            pay_type: "noida",
            experience: "noida",
            license: "noida"
        },
        {
            title: "Car Driver",
            pay_from: 12000,
            pay_to: 15000,
            job_details: "Mern stack",
            location: {
                city: "Gurugram",
                state: "Haryana",
                address: "cddvgvf"
            },
            working_hours: "2 hr",
            job_type: "Full Time",
            shift: "Day Shift",
            car_name: "Suv",
            car_type: "Manual",
            description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
            pay_type: "noida",
            experience: "noida",
            license: "noida"
        },
        {
            title: "Car Driver",
            pay_from: 12000,
            pay_to: 15000,
            job_details: "Mern stack",
            location: {
                city: "Gurugram",
                state: "Haryana",
                address: "cddvgvf"
            },
            working_hours: "2 hr",
            job_type: "Full Time",
            shift: "Day Shift",
            car_name: "Suv",
            car_type: "Manual",
            description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
            pay_type: "noida",
            experience: "noida",
            license: "noida"
        }
    ];

    return (
        <Box >
            {isFormVisible ? (
                <>
                    <Typography variant="h4" gutterBottom>Create Job</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Job Title" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="pay_from"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Pay From" type="number" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="pay_to"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Pay To" type="number" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="job_details"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Job Details" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="location_city"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="City" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="location_state"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="State" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="location_address"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Address" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="working_hours"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Working Hours" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="job_type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Job Type</InputLabel>
                                            <Select {...field} label="Job Type">
                                                <MenuItem value="Full Time">Full Time</MenuItem>
                                                <MenuItem value="Part Time">Part Time</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="shift"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Shift</InputLabel>
                                            <Select {...field} label="Shift">
                                                <MenuItem value="Day Shift">Day Shift</MenuItem>
                                                <MenuItem value="Night Shift">Night Shift</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="car_name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Car Name" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="car_type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Car Type" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            {/* <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ReactQuill {...field} />
                  )}
                />
              </Grid> */}

                            <Grid item xs={12}>
                                <Controller
                                    name="pay_type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Pay Type" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="experience"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Experience" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="license"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="License" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            ) : (
                <>
                    <Stack direction={'row'} justifyContent={'space-between'}> 
                        <Typography>All Jobs</Typography>
                        <Button variant="contained" color="primary" onClick={() => setIsFormVisible(true)}>
                            Create Job
                        </Button>
                    </Stack>    
                    <Grid container spacing={2}>
                        {jobDetails.map((job, index) => (
                            <Grid item  xs={4}>
                                <Card key={index} sx={{ mt: 3 }}>
                                    <CardContent>
                                        <Typography variant="h5">{job.title}</Typography>
                                        <Typography variant="body1">Pay: {job.pay_from} - {job.pay_to}</Typography>
                                        {/* <Typography variant="body1">Job Details: {job.job_details}</Typography> */}
                                        <Typography variant="body1">Location: {job.location.city}, {job.location.state}, {job.location.address}</Typography>
                                        {/* <Typography variant="body1">Working Hours: {job.working_hours}</Typography> */}
                                        <Typography variant="body1">Job Type: {job.job_type}</Typography>
                                        <Typography variant="body1">Shift: {job.shift}</Typography>
                                        {/* <Typography variant="body1">Car Name: {job.car_name}</Typography> */}
                                        {/* <Typography variant="body1">Description: {job.description}</Typography> */}
                                        {/* <Typography variant="body1">Pay Type: {job.pay_type}</Typography> */}
                                        <Typography variant="body1">Experience: {job.experience}</Typography>
                                        {/* <Typography variant="body1">License: {job.license}</Typography> */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </>
            )}
        </Box>
    );
};

export default JobForm;

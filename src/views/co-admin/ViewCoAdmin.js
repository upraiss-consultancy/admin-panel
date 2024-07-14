import { Avatar, Card, CardHeader, Container, Grid, CardActions, Button, Typography, IconButton, Stack, Select, Box, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { getDriverList } from "../../api/services/driver";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
// import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCoAdmin } from "../../api/services/admin";
import { AdminRegisterSchema } from "../../validations/AuthValidation";
import { useForm, Controller } from 'react-hook-form';

function COADMIN({ text }) {
    const [allDrivers, setAllDrivers] = useState([])
    const { ALL_USER_ADMIN } = END_POINTS;
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(AdminRegisterSchema)
    });

    useEffect(() => {
        const fetchRides = async () => {
            const data = await getDriverList(ALL_USER_ADMIN);
            if (data?.length > 0) {
                setAllDrivers(data);
            }
        };
        fetchRides();
    }, []);

    const handleDrawer = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }
    async function submit(data) {
        
        const response = await createCoAdmin('v0/admin/register-admin', data)
    }
    console.log(errors , "errors")
    return (
        <>
            <Container className=" !px-0">
                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} gap={2} alignItems={'center'}>
                        <IconButton>
                            <NavLink to={'/rides'}>
                                <ArrowBackIcon />
                            </NavLink>
                        </IconButton>
                        <Typography>Show Co-Admin</Typography>
                    </Stack>
                    <Button variant="contained" className="!bg-[#DD781E]" onClick={() => setOpen(true)}>Create Co-Admin</Button>
                </Stack>
                <Grid container spacing={2} className="!mt-4">
                    {
                        allDrivers?.map((data) => <Grid item xs={6} sm={4} md={4}>
                            <Card>
                                <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>} action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                    title="Shrimp and Chorizo Paella"
                                    subheader="September 14, 2016" />
                                <CardActions className="!w-full ">
                                    <Stack direction={'row'} justifyContent={'space-between'} className=" !w-full" gap={2}>
                                        <Button className="w-full" onClick={handleDrawer}>View Profile</Button>
                                        <Button className="w-full">Assign</Button>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>)
                    }
                </Grid>
                <Dialog
                    open={open}
                >
                    <DialogTitle>Co-Admin</DialogTitle>
                    <Box component={"form"}
                    
                        onReset={() => reset()}>
                        <DialogContent>
                            <Grid container spacing={2} alignItems={'end'}>
                                <Grid item xs={6}>
                                    <Controller name='full_name' control={control} rules={{ required: true }} render={({ field }) => <TextField autoFocus
                                        required label='Full Name' {...field} variant="standard" className='w-full' error={!!errors.full_name} helperText={errors.full_name?.message} />} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller name='email' control={control} rules={{ required: true }} render={({ field }) => <TextField variant="standard" autoFocus required  {...field} label='Email' className='w-full' error={!!errors.email} helperText={errors.email?.message} />} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller name='mobile_no' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Phone' variant="standard" autoFocus required {...field} error={!!errors.mobile_no} helperText={errors.mobile_no?.message} className='w-full' />} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller name='password' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Password' variant="standard" autoFocus required {...field} className='w-full' error={!!errors.password} helperText={errors.password?.message} />} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller name='address' control={control} rules={{ required: true }} render={({ field }) => <TextField label='Address' variant="standard" autoFocus required error={!!errors.address} helperText={errors.address?.message}  {...field} className='w-full' />} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller name='department' control={control} rules={{ required: true }} render={({ field }) => <Select defaultValue='Sales' label='Department' variant="standard" required className='w-full' {...field} error={!!errors.department} helperText={errors.department?.message} >
                                        <MenuItem value={'Sales'}>Sales</MenuItem>
                                        <MenuItem value={'Manager'}>Manager</MenuItem>
                                    </Select>} />
                                </Grid>
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit(submit)}>Submit</Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Container>
        </>
    )
}

export default COADMIN;
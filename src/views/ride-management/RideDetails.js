import React, { memo, useEffect, useState } from 'react';
import { interestedDriverList, AssignInterestedDrivers } from "../../api/services/ride";
import END_POINTS from "../../constants/endpoints";
import {
    Box,
    Grid,
    Typography,
    Stack,
    Card,
    CardHeader,
    Avatar,

    IconButton,
    CardActions,
    Button
} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import { useSearchParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import showToast from '../../utils/toast';
function RideDetailView() {
    const { USER_INTERESTED_BOOKING_LIST, USER_INTERESTED_ASSIGN_RIDE } = END_POINTS;
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId')
    const [rideData, setRideData] = useState({
        data: [],
        rideData: []

    })
    const fetchInterestedUserList = async () => {
        const interestedDriverData = await interestedDriverList(`${USER_INTERESTED_BOOKING_LIST}`, {
            params: {
                booking_id: bookingId
            }
        });
        setRideData({ data: interestedDriverData['data'], rideData: interestedDriverData['rideData'] });
    };
    useEffect(() => {
      
        fetchInterestedUserList();
    }, []);

    const handleAssignRide = async (id) => {
        const responseCode = await AssignInterestedDrivers(USER_INTERESTED_ASSIGN_RIDE, { bookingId: id });
        if(responseCode) {
            if(responseCode === 200) {
                showToast('Ride Assign Sucessfully' , 'success')
            }
        }

    }
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5' className='!mb-4'>Ride Details</Typography>
                    <Box >
                        <Stack direction={'row'} gap={2} className='py-2'>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                <Typography>Passeneger Name:</Typography>
                                <Typography>{rideData['rideData'][0]?.bookingData?.pass_name}</Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                <Typography>Passeneger Mobile No.:</Typography>
                                <Typography>{rideData['rideData'][0]?.bookingData?.pass_mobile_no}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} gap={2} className='py-2'>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                <Typography>Booking Type:</Typography>
                                <Typography>{rideData['rideData'][0]?.bookingData?.booking_type}</Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                <Typography>Way Type:</Typography>
                                <Typography className='!capitalize'>{rideData['rideData'][0]?.bookingData?.way_type}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} gap={2} className=' py-2'>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                <Typography>Pick-Up Address:</Typography>
                                <Typography>{rideData['rideData'][0]?.bookingData?.pickup_address + ", " + rideData['rideData'][0]?.bookingData?.pickup_city + ", " + rideData['rideData'][0]?.bookingData?.pickup_state + " " + rideData['rideData'][0]?.bookingData?.pickup_pin}</Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                <Typography>Pick-Up Date:</Typography>
                                <Typography>{dayjs(rideData['rideData'][0]?.bookingData?.pickup_date).format('MM-DD-YYYY')}</Typography>
                            </Stack>
                        </Stack>
                        {
                            rideData['rideData'][0]?.bookingData?.way_type === "one" && <Stack direction={'row'} gap={2} className=' py-2'>
                                <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                    <Typography>Return Address:</Typography>
                                    <Typography>{rideData['rideData'][0]?.bookingData?.return_address + ", " + rideData['rideData'][0]?.bookingData?.return_city + ", " + rideData['rideData'][0]?.bookingData?.return_state + " " + rideData['rideData'][0]?.bookingData?.return_pin}</Typography>
                                </Stack>
                                <Stack direction={'row'} justifyContent={'space-between'} gap={0.5}>
                                    <Typography>Return Date:</Typography>
                                    <Typography>{dayjs(rideData['rideData'][0]?.bookingData?.return_date).format('MM-DD-YYYY')}</Typography>
                                </Stack>
                            </Stack>
                        }

                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' className=' !mb-4'>Interested Drivers</Typography>
                    {
                        rideData['data']?.map((data) => {
                            return (
                                <Card className=' min-h-[200px] pt-3 px-3'>
                                    <Stack direction={'row'}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            className='!w-[140px] rounded-[50%]'

                                            image={data?.users?.profile_img ? data?.users?.profile_img : "https://tse2.mm.bing.net/th?id=OIP.2_2CrrjAxEeaLcS23kQ0wAHaHa&pid=Api&P=0&h=180"}
                                            alt="Driver photo"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {data?.users?.full_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Mobile: {data?.users?.mobile_no}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Email: {data?.users?.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Vehicle Type: {data?.users?.vehicle_type}
                                            </Typography>

                                        </CardContent>

                                    </Stack>

                                    <CardActions >
                                        <Button variant="outlined" onClick={() => handleAssignRide(data?._id)}>Assign Ride</Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default memo(RideDetailView)
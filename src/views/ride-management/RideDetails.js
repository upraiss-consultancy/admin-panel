import React, { memo, useEffect, useState } from 'react';
import { interestedDriverList, AssignInterestedDrivers, unAssignRide } from "../../api/services/ride";
import END_POINTS from "../../constants/endpoints";
import {
    Box,
    Grid,
    Typography,
    Stack,
    Table, TableHead, TableBody,
    TableContainer,
    TableCell,
    Paper,
    TextField,
    InputAdornment,
    TableRow,
    IconButton,
    Button,
    Divider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import showToast from '../../utils/toast';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
function RideDetailView() {
    const { USER_INTERESTED_BOOKING_LIST, USER_INTERESTED_ASSIGN_RIDE, UNASSIGN_DRIVER } = END_POINTS;
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId')
    const [rideData, setRideData] = useState({
        data: [],
        rideData: []
    });
    const [search, setSearch] = useState('')
    const [allParams, setAllParams] = useState({
        search: ''
    })
    const fetchInterestedUserList = async () => {
        const interestedDriverData = await interestedDriverList(`${USER_INTERESTED_BOOKING_LIST}`, {
            params: {
                booking_id: bookingId,
                ...allParams
            }
        });
        setRideData({ data: interestedDriverData['data'], rideData: interestedDriverData['rideData'] });
    };
    useEffect(() => {
        fetchInterestedUserList();
    }, [allParams]);

    const handleAssignRide = async (id) => {
        console.log(id, "ID ??")
        const responseCode = await AssignInterestedDrivers(USER_INTERESTED_ASSIGN_RIDE, { bookingId: id });
        if (responseCode) {
            if (responseCode === 200) {
                showToast('Ride Assign Sucessfully', 'success')
                fetchInterestedUserList();
            }
        }

    }

    const handleUnAssignRide = async (id) => {
        const response = await unAssignRide(UNASSIGN_DRIVER, {
            bookingId: id,
            remarks: "No Idea"
        });

        if (response?.status === 200) {
            showToast(response?.data?.message, 'success')
            fetchInterestedUserList();
        } else {
            showToast(response?.data?.message, 'error')
        }
    }
    return (
        <>
            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom >
                    Ride Details

                </Typography>
                <Divider />
                <Typography variant="body1" gutterBottom className='!mt-4'>
                    <strong>Passeneger Name</strong> {rideData['rideData'][0]?.bookingData?.pass_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Passeneger Mobile No.</strong> {rideData['rideData'][0]?.bookingData?.pass_mobile_no}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Car Type:</strong> {rideData['rideData'][0]?.bookingData?.car_type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Booking Type:</strong> {rideData['rideData'][0]?.bookingData?.booking_type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Way Type:</strong> {rideData['rideData'][0]?.bookingData?.way_type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Pick-Up Address:</strong> {rideData['rideData'][0]?.bookingData?.pickup_address + ", " + rideData['rideData'][0]?.bookingData?.pickup_city + ", " + rideData['rideData'][0]?.bookingData?.pickup_state + " " + rideData['rideData'][0]?.bookingData?.pickup_pin}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Pick-Up Date:</strong> {dayjs(rideData['rideData'][0]?.bookingData?.pickup_date).format('MM-DD-YYYY')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Pick-Up Time:</strong> {dayjs(rideData['rideData'][0]?.bookingData?.pickup_time).utc().format('HH:mm:ss')}
                </Typography>
                {
                    rideData['rideData'][0]?.bookingData?.way_type === "One Way" && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                <strong>Return Address:</strong>{rideData['rideData'][0]?.bookingData?.return_address + ", " + rideData['rideData'][0]?.bookingData?.return_city + ", " + rideData['rideData'][0]?.bookingData?.return_state + " " + rideData['rideData'][0]?.bookingData?.return_pin}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Return Date:</strong>{dayjs(rideData['rideData'][0]?.bookingData?.return_date).format('MM-DD-YYYY')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Return Time:</strong> {dayjs(rideData['rideData'][0]?.bookingData?.return_time).utc().format('HH:mm:ss')}
                            </Typography>
                        </>
                    )
                }
            </Box>
            <TableContainer component={Paper}>
                <Box className="flex my-2 justify-between px-4">
                    <Typography variant="h6" component="div">
                        Interested Drivers
                    </Typography>
                    <TextField placeholder="Search Drivers..." sx={{
                        '& .MuiInputBase-root': {
                            height: 40,  // Set the height you need
                        },
                    }} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => {
                                    setAllParams(prevState => ({ ...prevState, search: search }))
                                }}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>

                        )
                    }}
                        onChange={
                            (e) => setSearch(e.target.value)
                        }
                    />
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile No.</TableCell>
                            <TableCell>Experience
                            </TableCell>
                            <TableCell className="!text-center">Vehicle Feature</TableCell>
                            <TableCell className="!text-center">Vehicle Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell className="!text-center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rideData['data']?.map((data, index) => {
                            return (
                                <TableRow>
                                    {console.log(data, "DATA222")}
                                    <TableCell>
                                        {index + 1
                                        }</TableCell>
                                    <TableCell>
                                        {data?.users?.full_name}
                                    </TableCell>
                                    <TableCell>
                                        {data?.users?.age}
                                    </TableCell>
                                    <TableCell className="text-nowrap">
                                        {data?.users?.email ? data?.users?.email : "N.A."}
                                    </TableCell>
                                    <TableCell>
                                        {data?.users?.mobile_no ? data?.users?.mobile_no : "N.A."}
                                    </TableCell>

                                    <TableCell className="!text-center">
                                        {data?.users?.experience ? data?.users?.experience : "N.A."} years
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.users?.vehicle_feature
                                        }
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.users?.vehicle_type}
                                    </TableCell>
                                    <TableCell className={`!text-center ${data?.status === "cancel" ? '!text-red-600' : data?.status === "approved" || "complete" ? '!text-green-500' : "!text-orange-500"} capitalize`}>
                                        {data?.status}
                                    </TableCell>
                                    {
                                        console.log(data, data?._id)}
                                    <TableCell className="!text-center">
                                        <Box className="flex">

                                            {
                                                data?.status !== "approved" && <Button variant="outlined" onClick={() => handleAssignRide(data?._id)} className=' !mr-2 text-nowrap'>Assign Ride</Button>
                                            }
                                            <Button variant="outlined" onClick={() => handleUnAssignRide(data?._id)} className='text-nowrap'>Unassign Ride</Button>
                                        </Box>


                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {/* <Stack spacing={2} className="!py-4 !w-full" direction={'row'} justifyContent={'center'}>
                        <Box>
                            <Pagination count={paginationData[0]?.total_page} variant="outlined" shape="rounded" onChange={handlePagination} />
                        </Box>
                    </Stack> */}
            </TableContainer >

        </>
    )
}

export default memo(RideDetailView)
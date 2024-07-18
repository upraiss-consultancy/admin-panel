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
    Table, TableHead, TableBody,
    TableContainer,
    TableCell,
    Paper,
    TextField,
    InputAdornment,
    TableRow,
    IconButton,
    CardActions,
    Popover,
    Button
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import { useSearchParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import showToast from '../../utils/toast';
import { FaEllipsisVertical } from "react-icons/fa6";
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
        if (responseCode) {
            if (responseCode === 200) {
                showToast('Ride Assign Sucessfully', 'success')
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
                {/* <Grid item xs={12}>
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
                </Grid> */}
                <TableContainer component={Paper}>
                    <Box className="flex my-2 justify-between px-4">
                        <Typography variant="h6" component="div">
                            Interested Drivers
                        </Typography>
                        {/* <Controller name="" control={control} render={({ field }) =>  */}
                        <TextField placeholder="Search Drivers..." sx={{
                            '& .MuiInputBase-root': {
                                height: 40,  // Set the height you need
                            },
                        }} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => {
                                        // if (search.trim() !== "") {
                                        // setAllParams(prevState => ({ ...prevState, search: search }))
                                        // }
                                    }}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>

                            )
                        }}
                        // onChange={
                        //     (e) => setSearch(e.target.value)
                        //     } 
                        />
                        {/* } /> */}
                        {/* <Select defaultValue={'live'} className=" min-w-36 !max-h-10"
                         onChange={(e) => setAllParams(prevState => ({ ...prevState, booking_type: e.target.value }))}
                        >
                            <MenuItem value={'live'}>Live</MenuItem>
                            <MenuItem value={'out-station'}>Out Station</MenuItem>
                        </Select> */}
                        {/* <Select defaultValue={'local'} className=" min-w-36 !max-h-10"
                        onChange={(e) => setAllParams(prevState => ({ ...prevState, area_type: e.target.value }))}
                        >
                            <MenuItem value={'local'}>Local</MenuItem>
                            <MenuItem value={'out-station'}>Out Station</MenuItem>
                        </Select>
                        <Select defaultValue={'one'} className=" min-w-36 !max-h-10"
                         onChange={(e) => setAllParams(prevState => ({ ...prevState, way_type: e.target.value }))}
                        >
                            <MenuItem value={'one'}>One</MenuItem>
                            <MenuItem value={'rounded'}>Rounded</MenuItem>
                        </Select> */}
                        {/* <Button
                            variant="contained"
                            className="!bg-[#DD781E]"
                            onClick={() => setOpen(true)}
                        >
                            Create Driver
                        </Button> */}
                    </Box>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Mobile No.</TableCell>
                                <TableCell>D.O.B</TableCell>
                                <TableCell>Way Type</TableCell>
                                <TableCell className="!text-center">UIDAI Number</TableCell>
                                <TableCell className="!text-center">Driving License Number</TableCell>
                                <TableCell className="!text-center">Issue Date</TableCell>
                                <TableCell className="!text-center">Expiry Date</TableCell>
                                <TableCell>Experience</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rideData['data']?.map((data, index) => {
                                return (
                                    <TableRow>
                                        {
                                            console.log(data, 'DAta')
                                        }
                                        <TableCell>
                                            {index + 1
                                            }</TableCell>
                                        <TableCell>
                                            {data?.full_name}
                                        </TableCell>
                                        <TableCell>
                                            {data?.mobile_no}
                                        </TableCell>
                                        <TableCell className="text-nowrap">
                                            {dayjs(data?.dob).format('DD-MM-YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {data?.area_type}
                                        </TableCell>
                                        <TableCell className="!text-center">
                                            {/* {data?.pickup_address +
                                                " " +
                                                data?.pickup_city +
                                                ", " +
                                                data?.pickup_pin} */}
                                        </TableCell>
                                        <TableCell>
                                            {/* {data?.return_address +
                                                " " +
                                                data?.return_city +
                                                ", " +
                                                data?.return_pin} */}
                                        </TableCell>
                                        <TableCell className="!text-center">
                                            {/* {
                                                data?.request_count > 0 ? <Button endIcon={<VisibilityIcon />} onClick={() => handleViewRideDetail(data?._id)} >{data?.request_count}</Button> : "N.A."
                                            } */}
                                        </TableCell>
                                        <TableCell className="!text-center">
                                            {/* {
                                                data?.request_count > 0 ? <Button endIcon={<VisibilityIcon />} onClick={() => handleViewRideDetail(data?._id)} >{data?.request_count}</Button> : "N.A."
                                            } */}
                                        </TableCell>
                                        <TableCell className="!text-center">
                                            {/* {
                                                data?.request_count > 0 ? <Button endIcon={<VisibilityIcon />} onClick={() => handleViewRideDetail(data?._id)} >{data?.request_count}</Button> : "N.A."
                                            } */}
                                        </TableCell>
                                        <TableCell className="!text-center">
                                            {/* {
                                                data?.request_count > 0 ? <Button endIcon={<VisibilityIcon />} onClick={() => handleViewRideDetail(data?._id)} >{data?.request_count}</Button> : "N.A."
                                            } */}
                                        </TableCell>
                                        <TableCell
                                        // className={
                                        //     data?.booking_status === "pending"
                                        //         ? " !text-orange-400 capitalize"
                                        //         : data?.booking_status === "approved" ? '!text-green-500 ' : data?.booking_status === "cancel" ? '!text-red-600 capitalize' : ''
                                        // }
                                        >
                                            {/* {data?.booking_status === "approved" ? 'Assigned' : data?.booking_status} */}
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <IconButton
                                                // onClick={(e) => handleClick(e)}
                                                >
                                                    <FaEllipsisVertical />
                                                </IconButton>
                                                <Popover
                                                    // open={openPopover}
                                                    // onClose={handleClose}
                                                    // anchorEl={anchorEl}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "left",
                                                    }}
                                                >
                                                    <Box className=" flex flex-col">
                                                        {/* <Button
                                                            className="!px-4"
                                                            onClick={() => handleUpdateRide(data)}
                                                        >
                                                            Update Ride
                                                        </Button> */}
                                                        <Button
                                                            className="!px-4"
                                                        // onClick={() => hanldeDeleteRide(data?._id)}
                                                        >
                                                            Delete Driver
                                                        </Button>
                                                        <Button
                                                            className="!px-4"
                                                        // onClick={() => { setBookingID(data?._id); handleNavigate(true) }}
                                                        >
                                                            Assign Driver
                                                        </Button>
                                                    </Box>
                                                </Popover>
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
            </Grid>
        </>
    )
}

export default memo(RideDetailView)
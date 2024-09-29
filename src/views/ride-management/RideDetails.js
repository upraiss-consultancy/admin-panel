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
import { useSearchParams, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import showToast from '../../utils/toast';
import utc from 'dayjs/plugin/utc';
import PaymentFormDrawer from './updateFare';
import GenerateInvoiceButton from '../../components/invoice/GenerateInvoice';
import BillToPopup from './BillTo';
dayjs.extend(utc);
function RideDetailView() {
    const { USER_INTERESTED_BOOKING_LIST, USER_INTERESTED_ASSIGN_RIDE, UNASSIGN_DRIVER } = END_POINTS;
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId');
    const { state } = useLocation();
    const [open, setOpen] = useState(false);
    const [rideData, setRideData] = useState({
        data: [],
        rideData: []
    });
    const [search, setSearch] = useState('')
    const [allParams, setAllParams] = useState({
        search: ''
    })
    const [invoiceData, setInvoiceData] = useState({})
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

    useEffect(() => {

        if (state?.way_type === "One Way") {
            setInvoiceData({
                'Passeneger Name': state?.pass_name,
                'Passeneger Mobile No.': state?.pass_mobile_no,
                'Car Type:': state?.car_type,
                'Booking Type': state?.booking_type,
                'Way Type': state?.way_type,
                'Pick-Up Address': state?.pickup_address + ", " + state?.pickup_city + ", " + state?.pickup_state + " " + state?.pickup_pin,
                'Pick-Up Date': dayjs(state?.pickup_date).format('MM-DD-YYYY'),
                'Pick-Up Time': dayjs(state?.pickup_time).utc().format('HH:mm:ss'),
                'Return Address': state?.return_address + ", " + state?.return_city + ", " + state?.return_state + " " + state?.return_pin,
                'Return Date': dayjs(state?.return_date).format('MM-DD-YYYY'),
                'Return Time': dayjs(state?.return_time).utc().format('HH:mm:ss'),
                'Total Amount': state?.fare[0]?.amount,
                'Received Amount': state?.fare[0]?.paidAmount,
                'Pending Amount': state?.fare[0]?.pendingAmount,
                'Payment Status': state?.fare[0]?.payment_status
            })
        } else {
            setInvoiceData({
                'Passeneger Name': state?.pass_name,
                'Passeneger Mobile No.': state?.pass_mobile_no,
                'Car Type:': state?.car_type,
                'Booking Type': state?.booking_type,
                'Way Type': state?.way_type,
                'Pick-Up Address': state?.pickup_address + ", " + state?.pickup_city + ", " + state?.pickup_state + " " + state?.pickup_pin,
                'Pick-Up Date': dayjs(state?.pickup_date).format('MM-DD-YYYY'),
                'Pick-Up Time': dayjs(state?.pickup_time).utc().format('HH:mm:ss'),
                'Total Amount': state?.fare[0]?.amount,
                'Received Amount': state?.fare[0]?.paidAmount,
                'Pending Amount': state?.fare[0]?.pendingAmount,
                'Payment Status': state?.fare[0]?.payment_status
            })
        }

    }, [state])
    return (
        <>
            <Box sx={{ marginTop: 2 }}>
                <Box className="flex justify-between items-center">
                    <Typography variant="h6" gutterBottom >
                        Ride Details
                    </Typography>
                    <Button onClick={() => setOpen(true)} sx={{ backgroundColor: '#DD781E', height: 40, color: "#fff" }}>
                        Update Fare
                    </Button>
                </Box>
                <Divider />
                <Typography variant="body1" gutterBottom className='!mt-4'>
                    <strong>Passeneger Name</strong> {state?.pass_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Passeneger Mobile No.</strong> {state?.pass_mobile_no}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Car Type:</strong> {state?.car_type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Booking Type:</strong> {state?.booking_type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Way Type:</strong> {state?.way_type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Pick-Up Address:</strong> {state?.pickup_address + ", " + state?.pickup_city + ", " + state?.pickup_state + " " + state?.pickup_pin}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Pick-Up Date:</strong> {dayjs(state?.pickup_date).format('MM-DD-YYYY')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Pick-Up Time:</strong> {dayjs(state?.pickup_time).utc().format('HH:mm:ss')}
                </Typography>
                {
                    state?.way_type === "One Way" && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                <strong>Return Address:</strong>{state?.return_address + ", " + state?.return_city + ", " + state?.return_state + " " + state?.return_pin}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Return Date:</strong>{dayjs(state?.return_date).format('MM-DD-YYYY')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Return Time:</strong> {dayjs(state?.return_time).utc().format('HH:mm:ss')}
                            </Typography>
                        </>
                    )
                }

                <Box className=" pb-4">
                    <Typography variant="body1" gutterBottom>
                        <strong>Total Amount:</strong> {state?.fare[0]?.amount?.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Received Amount:</strong> {state?.fare[0]?.paidAmount?.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Pending Amount:</strong>  {state?.fare[0]?.pendingAmount?.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Payment Status</strong>  {state?.fare[0]?.payment_status}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <BillToPopup rowData={state}/>
                        {/* <GenerateInvoiceButton rowData={state} /> */}
                    </Typography>
                </Box>
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
                    {/* // Commit  */}
                    <TableBody>
                        {rideData['data']?.map((data, index) => {
                            return (
                                <TableRow>
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
                                            {console.log(data?.status, 'STATUSKKK')}
                                            {
                                                data?.status !== "approved" && <Button variant="outlined" onClick={() => handleAssignRide(data?._id)} className=' !mr-2 text-nowrap' disabled={data?.status === "complete"}>Assign Ride</Button>
                                            }
                                            <Button variant="outlined" onClick={() => handleUnAssignRide(data?._id)} className='text-nowrap' disabled={data?.status === "complete"}>Unassign Ride</Button>
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
            <PaymentFormDrawer open={open} setOpen={setOpen} bookingId={bookingId} fareData={state?.fare[0]} />
        </>
    )
}

export default memo(RideDetailView)
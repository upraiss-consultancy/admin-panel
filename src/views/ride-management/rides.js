import { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllRides } from "../../api/services/ride";
import END_POINTS from "../../constants/endpoints";
import { Typography, Box, Button, Drawer, Stack, TextField } from "@mui/material";
import { Form } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from "@mui/x-date-pickers";


function AllRides() {
    const [allRides, setAllRides] = useState([]);
    const { control, handleSubmit } = useForm()
    const [open, setOpen] = useState(false)
    const { BOOKING_LIST } = END_POINTS;
    useEffect(() => {
        const fetchRides = async () => {
            const data = await getAllRides(BOOKING_LIST);
            if (data?.length > 0) {
                setAllRides(data)
            }
        }
        fetchRides();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Box className="flex my-2 justify-between px-4">
                    <Typography variant="h6" component="div" >
                        Ride Bookings
                    </Typography>
                    <Button variant="contained" className="!bg-[#DD781E]" onClick={() => setOpen(true)}>
                        Create Ride
                    </Button>
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Mobile No.</TableCell>
                            <TableCell>Booking Type</TableCell>
                            <TableCell>Area Type</TableCell>
                            <TableCell className="!text-center">Pick-up</TableCell>
                            <TableCell className="!text-center">Drop-off</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))} */}
                        {
                            allRides?.map((data, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{data?.pass_name}</TableCell>
                                        <TableCell>{data?.pass_mobile_no}</TableCell>
                                        <TableCell>{data?.booking_type}</TableCell>
                                        <TableCell>{data?.area_type}</TableCell>
                                        <TableCell className="!text-center">{data?.pickup_address + " " + data?.pickup_city + ", " + data?.pickup_pin}</TableCell>
                                        <TableCell>{data?.return_address + " " + data?.return_city + ", " + data?.return_pin}</TableCell>
                                        <TableCell className={data?.booking_status === "pending" ? ' !text-orange-400 capitalize' : ''}>{data?.booking_status}</TableCell>
                                        <TableCell>{data?.booking_type}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

            </TableContainer>
            <Box>
                <Drawer open={open} anchor={'right'} >
                    <Box className="!pt-20 px-5">
                        <Typography variant="h6" component="div" className="!mb-4">
                            Create Ride
                        </Typography>
                        {/* <Form > */}
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <TextField {...field} label="Passenger Name" className="w-full" />} />
                            <Controller control={control} name="pass_mobile_no" render={({ field }) => <TextField {...field} label="Mobile No." className="w-full" />} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <TextField {...field} label="Area Type" className="w-full" />} />
                            <Controller control={control} name="pass_mobile_no" render={({ field }) => <TextField {...field} label="Way Type" className="w-full" />} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker label="Pick-up Date" />

                            </LocalizationProvider>} />
                            <Controller control={control} name="pass_name" render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <TimePicker label="Pick-up Time" />

                            </LocalizationProvider>} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <TextField {...field} label="Pick-up address" className="w-full" />} />
                            <Controller control={control} name="pass_mobile_no" render={({ field }) => <TextField {...field} label="Pick-up state" className="w-full" />} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <TextField {...field} label="Pick-up city" className="w-full" />} />
                            <Controller control={control} name="pass_mobile_no" render={({ field }) => <TextField {...field} label="Pick-up Pincode" className="w-full" />} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker label="Drop-off Date" />

                            </LocalizationProvider>} />
                            <Controller control={control} name="pass_name" render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <TimePicker label="Drop-off Time" />

                            </LocalizationProvider>} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <TextField {...field} label="Drop-off address" className="w-full" />} />
                            <Controller control={control} name="pass_mobile_no" render={({ field }) => <TextField {...field} label="Drop-off state" className="w-full" />} />
                        </Stack>
                        <Stack direction={'row'} gap={2} className="!mb-6">
                            <Controller control={control} name="pass_name" render={({ field }) => <TextField {...field} label="Drop-off city" className="w-full" />} />
                            <Controller control={control} name="pass_mobile_no" render={({ field }) => <TextField {...field} label="Drop-off Pincode" className="w-full" />} />
                        </Stack>

                        {/* </Form> */}
                    </Box>
                </Drawer>
            </Box>

        </>
    )
}


export default AllRides;

// {
//     "_id": null,
//     "area_type": "local",
//     "way_type": "one",
//     "pass_name": "namit",
//     "pass_mobile_no": "namit",
//     "pickup_time": "2016-05-18T16:00:00Z",
//     "return_time": "2016-05-18T16:00:00Z",
//     "pickup_date": "2003/12/12",
//     "return_date": "2003/12/12",
//     "pickup_address": "cv-6, Narayna vihar",
//     "pickup_state": "Delhi",
//     "pickup_city": "Delhi",
//     "pickup_pin": "110028",
//     "return_address": "cv-6, Narayna vihar",
//     "return_state": "Delhi",
//     "return_city": "Delhi",
//     "return_pin": "110028",
//     "amount": 12.56
//   }
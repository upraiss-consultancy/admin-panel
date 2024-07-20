import { Avatar, Card, CardHeader, Container, Grid, CardActions, Button, Typography, IconButton, Stack, List, ListItemAvatar, ListItem, TableContainer, Paper, Box, TextField, InputAdornment, TableCell, MenuItem, TableRow, Pagination, Popover, Select, Table, TableHead, TableBody } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { getDriverList } from "../../api/services/driver";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { assignRide } from "../../api/services/ride";
import showToast from "../../utils/toast";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from 'dayjs';
// import InputAdornment from '@mui/material/InputAdornment';
import { FaEllipsisVertical } from "react-icons/fa6";
function Drivers({ text }) {
    const [allDrivers, setAllDrivers] = useState([]);
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId');
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const { ALL_USER_ADMIN, ASSIGN_RIDE } = END_POINTS;
    const [open, setOpen] = useState(false)
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
    const handleAssign = async (_id) => {
        const response = await assignRide(ASSIGN_RIDE, { bookingId: bookingId, userId: _id });
        if (response) {
            showToast('Ride assign to driver successfully', 'success');
            navigate('/rides')
        }
    }
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },

    } = useForm({
        // defaultValues: {
        //   _id: null,
        //   way_type: 'one',
        //   area_type: 'local',

        // },
        // resolver: yupResolver(CreateRideSchema)
    });
    const onSubmit = () => {

    }
    return (
        <>
           
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <IconButton>
                        <NavLink to={'/rides'}>
                            <ArrowBackIcon />
                        </NavLink>
                    </IconButton>
                    <Typography>{bookingId ? "Suggestions" : "Drivers"}</Typography>
                </Stack>
                {/* <Grid container spacing={2} className="!mt-4 !mx-0">
                    {
                        allDrivers?.map((data) => <Grid item xs={6} sm={4} md={4}>
                            {console.log(data, "data")}
                            <Card>
                                <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                </Avatar>} action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                    title={data?.full_name}
                                    subheader="September 14, 2016" />
                                <CardActions className="!w-full ">
                                    <Stack direction={'row'} justifyContent={'space-between'} className=" !w-full" gap={2}>
                                        <Button className="w-full" onClick={handleDrawer}>View Profile</Button>
                                        {
                                            bookingId && <Button className="w-full" onClick={() => handleAssign(data?._id)}>Assign</Button>
                                        }
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>)
                    }
                </Grid> */}
                <TableContainer component={Paper}>
                    <Box className="flex my-2 justify-between px-4">
                        <Typography variant="h6" component="div">
                            All Drivers
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
                        <Button
                            variant="contained"
                            className="!bg-[#DD781E]"
                            onClick={() => setOpen(true)}
                        >
                            Create Driver
                        </Button>
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
                            {allDrivers?.map((data, index) => {
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
                                            { dayjs(data?.dob).format('DD-MM-YYYY')}
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
                <Drawer open={open} anchor="right">
                    <Box className="!pt-20 !pb-4 px-5">
                        <Box className="flex justify-between items-center mb-4">
                            <Typography variant="h6" component="div">
                                Create Driver
                            </Typography>
                            <IconButton onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box
                            component={"form"}
                            onSubmit={handleSubmit(onSubmit)}
                            onReset={() => reset()}
                            className=" flex flex-col gap-4"
                        >
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="pass_name"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Passenger Name"
                                            className="w-full"
                                            error={!!errors.pass_name}
                                            helperText={errors.pass_name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="pass_mobile_no"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Mobile No."
                                            className="w-full"
                                            error={!!errors.pass_mobile_no}
                                            helperText={errors.pass_mobile_no?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="email_id"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email ID"
                                            className="w-full"
                                            error={!!errors.pass_mobile_no}
                                            helperText={errors.pass_mobile_no?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="d.o.b"
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker label="D.O.B" {...field} renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.pickup_date}
                                                    helperText={errors.pickup_date?.message}
                                                />
                                            )}
                                            className="w-full"
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                {/* <Controller
                                    control={control}
                                    name="area_type"
                                    render={({ field }) => (
                                        // <TextField
                                        //   {...field}
                                        //   label="Area Type"
                                        //   className="w-full"
                                        //   error={!!errors.area_type}
                                        //   helperText={errors.area_type?.message}
                                        // />
                                        <Select {...field} className="w-full" defaultValue="local" >
                                            <MenuItem value={'local'}>Local</MenuItem>
                                            <MenuItem value={'out-station'}>Out Station</MenuItem>
                                        </Select>
                                    )}
                                /> */}
                                {/* <Controller
                                    control={control}
                                    name="way_type"
                                    render={({ field }) => (
                                        <Select {...field} className="w-full" defaultValue="one">
                                            <MenuItem value={'one'}>One</MenuItem>
                                            <MenuItem value={'rounded'}>Rounded</MenuItem>
                                        </Select>
                                        <TextField {...field} label="Way Type" className="w-full" error={!!errors.way_type}
                                          helperText={errors.way_type?.message} />
                                    )}
                                /> */}
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="issue_date"
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker label="Issue Date" {...field} renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.pickup_date}
                                                    helperText={errors.pickup_date?.message}
                                                />
                                            )}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="expiry_date"
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker label="Expiry Date" {...field} renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.pickup_date}
                                                    helperText={errors.pickup_date?.message}
                                                />
                                            )}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="experience"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Experience"
                                            className="w-full"
                                            error={!!errors.pickup_address}
                                            helperText={errors.pickup_address?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="referred_by"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="referred By"
                                            className="w-full"
                                            error={!!errors.pickup_state}
                                            helperText={errors.pickup_state?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            {/* <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="pickup_city"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Pick-up city"
                                            className="w-full"
                                            error={!!errors.pickup_city}
                                            helperText={errors.pickup_city?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="pickup_pin"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Pick-up Pincode"
                                            className="w-full"
                                            error={!!errors.pickup_pin}
                                            helperText={errors.pickup_pin?.message}
                                        />
                                    )}
                                />
                            </Stack> */}
                            {/* {
                                wayType === "one" && (
                                    <>
                                        <Stack direction={"row"} gap={2} className="!mb-4">
                                            <Controller
                                                control={control}
                                                name="return_date"
                                                render={({ field }) => (
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker label="Drop-off Date" {...field} render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                label="Pick-up city"
                                                                className="w-full"
                                                                error={!!errors.return_date}
                                                                helperText={errors.return_date?.message}
                                                            />
                                                        )} />
                                                    </LocalizationProvider>
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="return_time"
                                                render={({ field }) => (
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker label="Drop-off Time" {...field} render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                label="Pick-up city"
                                                                className="w-full"
                                                                error={!!errors.return_time}
                                                                helperText={errors.return_time?.message}
                                                            />
                                                        )} />
                                                    </LocalizationProvider>
                                                )}
                                            />
                                        </Stack>
                                        <Stack direction={"row"} gap={2} className="!mb-4">
                                            <Controller
                                                control={control}
                                                name="return_address"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Drop-off address"
                                                        className="w-full"
                                                        error={!!errors.return_address}
                                                        helperText={errors.return_address?.message}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="return_state"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Drop-off state"
                                                        className="w-full"
                                                        error={!!errors.return_state}
                                                        helperText={errors.return_state?.message}
                                                    />
                                                )}
                                            />
                                        </Stack>
                                        <Stack direction={"row"} gap={2} className="!mb-4">
                                            <Controller
                                                control={control}
                                                name="return_city"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Drop-off city"
                                                        className="w-full"
                                                        error={!!errors.return_city}
                                                        helperText={errors.return_city?.message}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="return_pin"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Drop-off Pincode"
                                                        className="w-full"
                                                        error={!!errors.return_pin}
                                                        helperText={errors.return_pin?.message}
                                                    />
                                                )}
                                            />
                                        </Stack>
                                    </>
                                )
                            } */}

                            <Stack direction={"row"} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="amount"
                                    render={({ field }) => (
                                        <TextField {...field} label="Amount" className="w-full" error={!!errors.amount}
                                            helperText={errors.amount?.message} />
                                    )}
                                />
                            </Stack>
                            <Box className="flex" gap={2}>
                                <Button variant="outlined" className="!w-full" type="reset">
                                    Reset
                                </Button>
                                {
                                    isUpdate ? <Button variant="contained" type="submit" className="!w-full !bg-[#DD781E]">
                                        Update
                                    </Button> : <Button variant="contained" type="submit" className="!w-full !bg-[#DD781E]">
                                        Submit
                                    </Button>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
        
        </>
    )
}

export default Drivers;
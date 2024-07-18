import { Avatar, Card, CardHeader, Container, Grid, CardActions, Button, Typography, IconButton, Stack, List, ListItemAvatar, ListItem, TableContainer, Paper, Box, TextField, InputAdornment, TableCell, MenuItem, TableRow, Pagination, Popover, Select, Table, TableHead, TableBody, FormControl, InputLabel } from "@mui/material";
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
import { CreatePackageSchema } from "../../validations/PackagesValidation";
// import InputAdornment from '@mui/material/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEllipsisVertical } from "react-icons/fa6";
import { createPackage, getAllPackageList } from "../../api/services/packages";
const { ALL_USER_ADMIN, ASSIGN_RIDE, CREATE_PACKAGES, GET_ALL_PACKAGE_LIST } = END_POINTS;
function Packages({ text }) {
    const [allPackages, setAllPackages] = useState([]);
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId');
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const [params, setAllParams] = useState({
        limit: 10,
        page: 1,
        search: ""
    })

    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetchPackages = async () => {
            const response = await getAllPackageList(GET_ALL_PACKAGE_LIST, {
                params: {
                    ...params,
                }
            });
            console.log(response?.data?.responseCode)
            if (response) {
                if (response?.data?.responseCode === 200) {
                    showToast(response?.data?.message, 'success')
                    setAllPackages(response?.data?.responseData)
                } else {
                    showToast(response?.data?.message, 'error')
                }
            }
        };

        fetchPackages();
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
        defaultValues: {
            _id: null,
        },
        resolver: yupResolver(CreatePackageSchema)
    });
    const onSubmit = async (data) => {
        const response = await createPackage(CREATE_PACKAGES, data);
        if (response) {
            const { data: responseCode, message } = response;

            if (responseCode === 200) {
                showToast(message, 'success')
                reset();
                setOpen(false)
            } else {
                showToast(message, 'error')
            }
        }
    }
console.log(allPackages , "allPackages")
    return (
        <>
            <Container className=" !px-0">
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <IconButton>
                        <NavLink to={'/rides'}>
                            <ArrowBackIcon />
                        </NavLink>
                    </IconButton>
                    <Typography>Go Back</Typography>
                </Stack>
                <TableContainer component={Paper}>
                    <Box className="flex my-2 justify-between px-4">
                        <Typography variant="h6" component="div">
                            All Packages
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
                            Create Package
                        </Button>
                    </Box>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell>Package Name</TableCell>
                                <TableCell>Package Type</TableCell>
                                <TableCell>Driver Charge</TableCell>
                                <TableCell>Night Charge</TableCell>
                                <TableCell className="!text-center">Kilometer</TableCell>
                                <TableCell className="!text-center">Hours</TableCell>
                                <TableCell className="!text-center">Days</TableCell>
                                <TableCell className="!text-center">Extra Charge</TableCell>
                                <TableCell>GST</TableCell>
                                <TableCell>Basic Price</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Way Type</TableCell>
                                <TableCell>Range</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allPackages?.map((data, index) => {
                                return (
                                    <TableRow>
                                        {console.log(data  , "data123")}
                                        <TableCell>
                                            {index + 1
                                            }</TableCell>
                                        <TableCell>
                                            {data?.package_name}
                                        </TableCell>
                                        <TableCell>
                                            {data?.mobile_no}
                                        </TableCell>
                                        <TableCell className="text-nowrap">
                                            {/* {dayjs(data?.dob).format('DD-MM-YYYY')} */}
                                        </TableCell>
                                        <TableCell>
                                            {/* {data?.area_type} */}
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
                                Create Package
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
                                    name="package_name"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Package Name"
                                            className="w-full"
                                            error={!!errors.package_name}
                                            helperText={errors.package_name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="package_type"
                                    render={({ field }) => (
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Package Type</InputLabel>
                                            <Select {...field} className="!w-full" labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Package Type"
                                            >
                                                <MenuItem value="diamond">Diamond</MenuItem>
                                                <MenuItem value="gold">Gold</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="driver_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Driver Charge"
                                            className="w-full"
                                            error={!!errors.driver_charge}
                                            helperText={errors.driver_charge?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="night_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Night Charge"
                                            className="w-full"
                                            error={!!errors.night_charge}
                                            helperText={errors.night_charge?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="kilometer"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Kilometer"
                                            className="w-full"
                                            error={!!errors.kilometer}
                                            helperText={errors.kilometer?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="hours"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Hours"
                                            className="w-full"
                                            error={!!errors.hours}
                                            helperText={errors.hours?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="days"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Days"
                                            className="w-full"
                                            error={!!errors.days}
                                            helperText={errors.days?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="extra_charge_kilometer"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Extra Charge Kilometer"
                                            className="w-full"
                                            error={!!errors.extra_charge_kilometer}
                                            helperText={errors.extra_charge_kilometer?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="extra_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Extra Charge"
                                            className="w-full"
                                            error={!!errors.pickup_city}
                                            helperText={errors.pickup_city?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="gst"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="GST"
                                            className="w-full"
                                            error={!!errors.pickup_pin}
                                            helperText={errors.pickup_pin?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={"row"} gap={2} className="!mb-4">
                                <Controller
                                    control={control}
                                    name="basic_price"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Basic Price"
                                            className="w-full"
                                            error={!!errors.basic_price}
                                            helperText={errors.basic_price?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="total_price"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Total Price"
                                            className="w-full"
                                            error={!!errors.total_price}
                                            helperText={errors.total_price?.message}
                                        />
                                    )}
                                />

                            </Stack>
                            <Stack direction={"row"} className="!mb-4" gap={2}>
                                <Controller
                                    control={control}
                                    name="way_type"
                                    render={({ field }) => (
                                        <FormControl className="w-full">
                                            <InputLabel id="demo-simple-select-helper-label">Way Type</InputLabel>
                                            <Select {...field} className="w-full" label="Way Type">
                                                <MenuItem value="one">One</MenuItem>
                                                <MenuItem value="round trip">Round Trip</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="range"
                                    render={({ field }) => (
                                        <FormControl className="w-full">
                                            <InputLabel id="demo-simple-select-helper-label">Range</InputLabel>
                                            <Select {...field} className="w-full" label="Range">
                                                <MenuItem value="local">Local</MenuItem>
                                                <MenuItem value="out-station">Out Station</MenuItem>
                                            </Select>
                                        </FormControl>
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
            </Container>
        </>
    )
}

export default Packages;
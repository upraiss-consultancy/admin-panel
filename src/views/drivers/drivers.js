import { Button, Typography, IconButton, Stack, InputLabel, FormControl, TableContainer, Paper, Box, TextField, InputAdornment, TableCell, MenuItem, TableRow, Pagination, Popover, Select, Table, TableHead, TableBody } from "@mui/material";
import { getDriverList, deleteDriver } from "../../api/services/driver";
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
import { CreateDriverSchema } from "../../validations/DriverValidation";
import { yupResolver } from '@hookform/resolvers/yup';
import { createDriver } from "../../api/services/driver";
import { FaEllipsisVertical } from "react-icons/fa6";
import DeleteDriver from "./DriverDeleteDialogue";
function Drivers() {
    const [driverListResponse, setDriverListResponse] = useState({
        data: [],
        metadata: []
    });
    const [params, setAllParams] = useState({
        page: 1,
        limit: 10,
        search: ''
    })
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId');
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState('')
    const { ALL_USER_ADMIN, ASSIGN_RIDE, CREATE_DRIVER, DELETE_DRIVER } = END_POINTS;
    const [open, setOpen] = useState(false)
    const fetchRides = async () => {
        const responseData = await getDriverList(ALL_USER_ADMIN, {
            params: {
                ...params,
            }
        });
        if (responseData) {
            setDriverListResponse(responseData)
        }
    };
    const [isDelete, setIsDelete] = useState(false);
    const [driverId, setDriverId] = useState(null);
    useEffect(() => {

        fetchRides();
    }, [params]);
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
            adhar_verified: false
        },
        resolver: yupResolver(CreateDriverSchema)
    });
    const onSubmit = async (data) => {
        const response = await createDriver(CREATE_DRIVER, data);
        if (response?.responseCode === 200) {
            showToast('Driver created successfully', 'success');
            setOpen(false);
            reset();
        } else {
            showToast(response?.message, 'error')
        }
    }
    const handlePagination = (event) => {
        setAllParams(prevState => ({ ...prevState, page: event.currentTarget.textContent }));
    }
    const handleDeleteDriver = async (remark) => {
        setIsDelete(false);
        const response = await deleteDriver(DELETE_DRIVER, {
            data: {
                _id: driverId,
                remarks: remark
            }
        });
        if (response?.responseCode === 200) {
            showToast(response?.message, 'success')
            fetchRides()
        } else {
            showToast(response?.message, 'error')
        }
    }
    const handleDelete = (driverID) => {
        setDriverId(driverID)
        setIsDelete(true)
    }
    const openPopover = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // mobile_no: Yup.string().required('Mobile number is required'),
    // full_name: Yup.string().required("Name is required"),
    // dob: Yup.date().required("D.O.B is required"),
    // email: Yup.string().required("Email id is required"),
    // adhar_no: Yup.string().required("Aadhar number is required"),
    // pan_no: Yup.string(),
    // dl_no: Yup.string().required("Driving license number is required"),
    // dl_issue_date: Yup.string().required("Driving license issue date is required"),
    // dl_expiry_date: Yup.string().required("Driving license expiry date is required"),
    // profile_img: Yup.string(),
    // vehicle_type: Yup.string().required("Vehicle type is required"),
    // vehicle_feature: Yup.string().required("Vehicle feature is required"),
    // adhar_verified: Yup.boolean(),
    // age: Yup.number().required("Age is required")
    const handleUpdateDriver = (data) => {
        reset({
            mobile_no: data?.mobile_no,
            full_name: data?.full_name,
            dob: data?.dob,
            email: data?.email,
            adhar_no: data?.adhar_no,
            pan_no: data?.pan_no,
            dl_no: data?.dl_no,
            dl_issue_date: data?.dl_issue_date,
            dl_expiry_date: data?.dl_expiry_date,
            profile_img: data?.profile_img,
            vehicle_type: data?.vehicle_type,
            vehicle_feature: data?.vehicle_feature,
            adhar_verified: data?.adhar_verified,
            age: data?.age,
        })
        setIsUpdate(true)
        setOpen(true);
        handleClose()
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
            <TableContainer component={Paper}>
                <Box className="flex my-2 justify-between px-4">
                    <Typography variant="h6" component="div">
                        All Drivers
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
                            <TableCell className="!text-center">Aadhar Number</TableCell>
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
                        {driverListResponse?.data?.map((data, index) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {(params?.page - 1) * 10 + index + 1
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
                                        {data?.adhar_no}
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.dl_no}
                                    </TableCell>
                                    <TableCell className="text-nowrap">
                                        {dayjs(data?.dl_issue_date).format('DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell className="!text-center text-nowrap">
                                        {dayjs(data?.dl_expiry_date).format('DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.experience}
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.status
                                        }
                                    </TableCell>
                                    <TableCell

                                    >
                                        {data?.vehicle_type}
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <IconButton
                                                onClick={(e) => handleClick(e)}
                                            >
                                                <FaEllipsisVertical />
                                            </IconButton>
                                            <Popover
                                                open={openPopover}
                                                onClose={handleClose}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "left",
                                                }}
                                            >
                                                <Box className=" flex flex-col">
                                                    <Button
                                                        className="!px-4"
                                                        onClick={() => handleUpdateDriver(data)}
                                                    >
                                                        Update Driver
                                                    </Button>
                                                    <Button
                                                        className="!px-4"
                                                        onClick={() => handleDelete(data?._id)}
                                                    >
                                                        Delete Driver
                                                    </Button>
                                                    {
                                                        bookingId && <Button
                                                            className="!px-4"
                                                            onClick={() => { handleAssign(data?._id) }}
                                                        >
                                                            Assign Driver
                                                        </Button>
                                                    }

                                                </Box>
                                            </Popover>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Stack spacing={2} className="!py-4 !w-full" direction={'row'} justifyContent={'center'}>
                    <Box>
                        <Pagination count={driverListResponse?.metadata[0]?.total_page} variant="outlined" shape="rounded" onChange={handlePagination} />
                    </Box>
                </Stack>
            </TableContainer >
            <Drawer open={open} anchor="right">
                <Box className="!pt-20 !pb-4 px-5">
                    <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6" component="div">
                            {isUpdate ? 'Update Driver' : 'Create Driver'}
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
                                name="full_name"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Full Name"
                                        className="w-full"
                                        error={!!errors.full_name}
                                        helperText={errors.full_name?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="mobile_no"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Mobile No."
                                        className="w-full"
                                        error={!!errors.mobile_no}
                                        helperText={errors.mobile_no?.message}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email ID"
                                        className="w-full"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="dob"
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="D.O.B" {...field} renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors.dob}
                                                helperText={errors.dob?.message}
                                            />
                                        )}
                                            className="w-full"
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="adhar_no"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Aadhar Number"
                                        className="w-full"
                                        error={!!errors.adhar_no}
                                        helperText={errors.adhar_no?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="dl_no"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="DL Number"
                                        className="w-full"
                                        error={!!errors.dl_no}
                                        helperText={errors.dl_no?.message}
                                    />
                                )}
                            />

                        </Stack>
                        <Stack direction={"row"} className="!mb-4" gap={2}>
                            <Controller
                                control={control}
                                name="age"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Age"
                                        className="w-full"
                                        error={!!errors.pan_no}
                                        helperText={errors.pan_no?.message}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="dl_issue_date"
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="DL Issue Date" {...field} renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors.dl_issue_date}
                                                helperText={errors.dl_issue_date?.message}
                                            />
                                        )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                            <Controller
                                control={control}
                                name="dl_expiry_date"
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="DL Expiry Date" {...field} renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors.dl_expiry_date}
                                                helperText={errors.dl_expiry_date?.message}
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
                                        error={!!errors.experience}
                                        helperText={errors.experience?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="vehicle_type"
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                                        <Select
                                            labelId="vehicle-type-label"
                                            id="vehicle-type-select"
                                            label="Vehicle Type"
                                            {...field}
                                        >
                                            <MenuItem value="Luxury">Luxury</MenuItem>
                                            <MenuItem value="Normal">Normal</MenuItem>
                                            <MenuItem value="Both">Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Stack>

                        <Stack direction={"row"} className="!mb-4" gap={2}>
                            <Controller
                                control={control}
                                name="pan_no"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="PAN Number"
                                        className="w-full"
                                        error={!!errors.pan_no}
                                        helperText={errors.pan_no?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="vehicle_feature"
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="vehicle-Feature-label">Vehicle Feature</InputLabel>
                                        <Select
                                            labelId="vehicle-Feature-label"
                                            id="vehicle-Feature-label"
                                            label="Vehicle Feature"
                                            {...field}
                                        >
                                            <MenuItem value="Manual">Manual</MenuItem>
                                            <MenuItem value="Automate">Automate</MenuItem>
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
            <DeleteDriver open={isDelete} handleClose={() => setIsDelete(false)} handleConfirm={handleDeleteDriver} />
        </>
    )
}

export default Drivers;
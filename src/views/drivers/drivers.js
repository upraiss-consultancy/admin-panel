import { Button, Typography, IconButton, Stack, InputLabel, FormControl, Avatar, TableContainer, Paper, Box, TextField, InputAdornment, TableCell, MenuItem, TableRow, Pagination, Popover, Select, Table, TableHead, TableBody } from "@mui/material";
import { getDriverList, deleteDriver } from "../../api/services/driver";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { assignRide } from "../../api/services/ride";
import showToast from "../../utils/toast";
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
import { State, City, Country } from 'country-state-city';
import CountryCodes from '../../CountryCodes.json';
function Drivers() {
    const [driverListResponse, setDriverListResponse] = useState({
        data: [],
        metadata: []
    });
    const [params, setAllParams] = useState({
        page: 1,
        limit: 10,
        search: '',
        active_status: '',
        state: '',
        city: ""
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
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [bookId, setBookId] = useState('')

    useEffect(() => {
        const stateData = State.getStatesOfCountry('IN');
        setStates(stateData);
    }, []);


    useEffect(() => {

        fetchRides();
    }, [params]);
    const handleAssign = async (_id) => {
        const response = await assignRide(ASSIGN_RIDE, { bookingId: bookingId, userId: bookId });
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
            adhar_verified: false,
            state: '',
            city: ''
        },
        resolver: yupResolver(CreateDriverSchema)
    });
    const state = watch('state');
    useEffect(() => {
        if (state) {
            const cityData = City.getCitiesOfState('IN', state);
            setCities(cityData);
        } else {
            setCities([]);
        }
    }, [state]);

    const handleCities = (StateValue, StateName) => {
        setAllParams(prevState => ({ ...prevState, state: StateName }))
        if (StateValue) {
            const cityData = City.getCitiesOfState('IN', StateValue);
            setCities(cityData);
        } else {
            setCities([]);
        }
    }

    const onSubmit = async (data) => {
        const response = await createDriver(CREATE_DRIVER, data);
        if (response?.responseCode === 200) {
            showToast('Driver created successfully', 'success');
            setOpen(false);
            reset();
            fetchRides()
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
        setDriverId(bookId)
        setIsDelete(true)
    }
    const openPopover = Boolean(anchorEl);
    const handleClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUpdateDriver = (data) => {
        setIsUpdate(true)
        reset({
            mobile_no: data?.mobile_no,
            full_name: data?.full_name,
            dob: dayjs(data?.dob),
            email: data?.email,
            adhar_no: data?.adhar_no,
            pan_no: data?.pan_no,
            dl_no: data?.dl_no,
            dl_issue_date: dayjs(data?.dl_issue_date),
            dl_expiry_date: dayjs(data?.dl_expiry_date),
            profile_img: data?.profile_img,
            vehicle_type: data?.vehicle_type,
            vehicle_feature: data?.vehicle_feature,
            adhar_verified: data?.adhar_verified,
            age: data?.age,
            address: data?.address,
            pin_code: data?.pin_code,
            city: data?.city,
            state: data?.state,
            experience: data?.experience
        })

    }

    const handleViewDriver = (id) => {
        navigate(`/profile/${id}`)
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
                {/* <Box className="flex my-2 justify-between px-4">
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

                    <Select defaultValue={''} className=" min-w-36 !max-h-10"
                        onChange={(e) => setAllParams(prevState => ({ ...prevState, active_status: e.target.value }))}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={'online'}>Online</MenuItem>
                        <MenuItem value={'offline'}>Offline</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        className="!bg-[#DD781E]"
                        onClick={() => setOpen(true)}
                    >
                        Create Driver
                    </Button>
                </Box>
                <Box className="flex">

                    <FormControl fullWidth >
                        <InputLabel>State</InputLabel>
                        <Select label="State" className=" max-w-36 !max-h-10">
                            {states.map((state) => (
                                <MenuItem key={state.isoCode} value={state.isoCode} onClick={() => handleCities(state.isoCode, state.name)}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select label="city" className=" max-w-36 !max-h-10">
                            {cities.map((city) => (
                                <MenuItem key={city.name} value={city.name} onClick={() => setAllParams(prevState => ({ ...prevState, city: city.name }))}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box> */}
                <Box sx={{ py: 3, px: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Top Section: Search and Filters */}
                    {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' }, flexGrow: 1 }}>
            All Drivers
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexGrow: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
            <TextField
                placeholder="Search Drivers..."
                variant="outlined"
                sx={{
                    maxWidth: { xs: '100%', sm: '300px' },
                    '& .MuiInputBase-root': {
                        height: 40,
                        borderRadius: 2,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setAllParams(prevState => ({ ...prevState, search }))}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Select
                defaultValue=""
                displayEmpty
                sx={{
                    width: { xs: '100%', sm: '150px' },
                    height: 40,
                    borderRadius: 2,
                    '& .MuiSelect-select': {
                        padding: '8px',
                    },
                }}
                onChange={(e) => setAllParams(prevState => ({ ...prevState, active_status: e.target.value }))}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
            </Select>

            <Button
                variant="contained"
                sx={{
                    height: 40,
                    backgroundColor: '#DD781E',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#c16a1a',
                    },
                }}
                onClick={() => setOpen(true)}
            >
                Create Driver
            </Button>
        </Box>
    </Box> */}
                    <Box sx={{ px: { xs: 2, md: 1 }, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' }, flexGrow: 1 }}>
                            All Drivers
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', flexGrow: 2 }}>
                            {/* Search Bar */}
                            <TextField
                                placeholder="Search Drivers..."
                                variant="outlined"
                                sx={{
                                    maxWidth: { xs: '100%', md: '220px' },
                                    flexGrow: 1,
                                    '& .MuiInputBase-root': {
                                        height: 40,
                                        borderRadius: 2,
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setAllParams(prevState => ({ ...prevState, search }))}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* State Dropdown */}
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>State</InputLabel>
                                <Select
                                    label="State"
                                    onChange={(e) => handleCities(e.target.value)}
                                    sx={{
                                        height: 40,  // Consistent height for dropdown
                                        '& .MuiSelect-select': {

                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                        borderRadius: 2,
                                    }}
                                >
                                    {states.map((state) => (
                                        <MenuItem key={state.isoCode} value={state.isoCode}>
                                            {state.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* City Dropdown */}
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>City</InputLabel>
                                <Select
                                    label="City"
                                    onChange={(e) => setAllParams(prevState => ({ ...prevState, city: e.target.value }))}
                                    sx={{
                                        height: 40,
                                        borderRadius: 2,
                                    }}
                                >
                                    {cities.map((city) => (
                                        <MenuItem key={city.name} value={city.name}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Status Dropdown */}
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    defaultValue=""
                                    label="Status"
                                    onChange={(e) => setAllParams(prevState => ({ ...prevState, active_status: e.target.value }))}
                                    sx={{
                                        height: 40,
                                        borderRadius: 2,
                                    }}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="online">Online</MenuItem>
                                    <MenuItem value="offline">Offline</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Create Driver Button */}
                        <Button
                            variant="contained"
                            sx={{
                                height: 40,
                                backgroundColor: '#DD781E',
                                textTransform: 'none',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#c16a1a',
                                },
                            }}
                            onClick={() => setOpen(true)}
                        >
                            Create Driver
                        </Button>
                    </Box>


                    {/* Second Section: State and City Select */}
                    {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
        <FormControl fullWidth sx={{ maxWidth: { xs: '100%', sm: '250px' } }}>
            <InputLabel>State</InputLabel>
            <Select
                label="State"
                onChange={(e) => handleCities(e.target.value)}
                sx={{
                    height: 40,
                    borderRadius: 2,
                }}
            >
                {states.map((state) => (
                    <MenuItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl fullWidth sx={{ maxWidth: { xs: '100%', sm: '250px' } }}>
            <InputLabel>City</InputLabel>
            <Select
                label="City"
                onChange={(e) => setAllParams(prevState => ({ ...prevState, city: e.target.value }))}
                sx={{
                    height: 40,
                    borderRadius: 2,
                }}
            >
                {cities.map((city) => (
                    <MenuItem key={city.name} value={city.name}>
                        {city.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box> */}
                </Box>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Profile Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Mobile No.</TableCell>

                            <TableCell className="!text-center">Driving License Number</TableCell>

                            <TableCell>Experience</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Active Status</TableCell>
                            <TableCell>Vehicle Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {driverListResponse?.data?.map((driver, index) => {
                            return (
                                <TableRow onClick={() => handleViewDriver(driver?._id)}>
                                    <TableCell>
                                        {(params?.page - 1) * 10 + index + 1
                                        }</TableCell>
                                    <TableCell>
                                        <Avatar src={driver?.profile_img} />
                                        {/* {data?.pass_name} */}
                                    </TableCell>
                                    <TableCell>
                                        {driver?.full_name}
                                    </TableCell>
                                    <TableCell>
                                        {driver?.mobile_no}
                                    </TableCell>


                                    <TableCell className="!text-center">
                                        {driver?.dl_no}
                                    </TableCell>

                                    <TableCell className="!text-center">
                                        {driver?.experience ? driver?.experience + " years" : "N/A"}
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            driver?.status
                                        }
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            driver?.active_status || 'N/A'
                                        }
                                    </TableCell>
                                    <TableCell

                                    >
                                        {driver?.vehicle_type}
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <IconButton
                                                onClick={(e) => { handleClick(e); e.stopPropagation(); handleUpdateDriver(driver); setBookId(driver?._id) }}
                                            >
                                                <FaEllipsisVertical />
                                            </IconButton>
                                            <Popover
                                                open={openPopover}
                                                onClose={(e) => handleClose(e)}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "left",
                                                }}
                                            >
                                                <Box className=" flex flex-col">
                                                    <Button
                                                        className="!px-4"
                                                        onClick={(e) => { setOpen(true); e.stopPropagation() }}
                                                    >
                                                        Update Driver
                                                    </Button>
                                                    <Button
                                                        className="!px-4"
                                                        onClick={(e) => { handleDelete(driver?._id); e.stopPropagation() }}
                                                    >
                                                        Delete Driver
                                                    </Button>
                                                    {
                                                        bookingId && <Button
                                                            className="!px-4"
                                                            onClick={(e) => { handleAssign(driver?._id); e.stopPropagation() }}
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
                        <IconButton onClick={() => { setOpen(false); reset() }}>
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
                                    <div className="w-full flex">
                                        {/* <Controller
                                            name="country_code"
                                            control={control}
                                            render={({ field: countryField }) => (
                                                <TextField
                                                    {...countryField}
                                                    select
                                                    label="Code"
                                                    variant="outlined"
                                                    style={{ width: '100px' }}
                                                    error={!!errors.country_code}
                                                    helperText={errors.country_code?.message}
                                                >
                                                    {
                                                        CountryCodes?.map((data) =>   <MenuItem value="+1">{data?.dial_code} {`(${data?.code})`}</MenuItem>)   
                                                    }
                                                </TextField>
                                            )}
                                        /> */}
                                        <TextField
                                            {...field}
                                            label="Mobile No."
                                            className="w-full"
                                            error={!!errors.mobile_no}
                                            helperText={errors.mobile_no?.message}
                                        />
                                    </div>
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
                                name="address"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Address"
                                        className="w-full"
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="pin_code"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Pin Code"
                                        className="w-full"
                                        error={!!errors.pin_code}
                                        helperText={errors.pin_code?.message}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="state"
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>State</InputLabel>
                                        <Select label="State" {...field}>
                                            {states.map((state) => (
                                                <MenuItem key={state.isoCode} value={state.isoCode}>
                                                    {state.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>City</InputLabel>
                                        <Select label="city" {...field}>
                                            {cities.map((city) => (
                                                <MenuItem key={city.name} value={city.name}>
                                                    {city.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
import { Button, Typography, IconButton, Stack, TableContainer, Paper, Box, Slide, TextField, InputAdornment, TableCell, MenuItem, TableRow, Pagination, Popover, Select, Table, TableHead, TableBody, FormControl, InputLabel, Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import showToast from "../../utils/toast";
import SearchIcon from '@mui/icons-material/Search';
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { CreatePackageSchema } from "../../validations/PackagesValidation";
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEllipsisVertical } from "react-icons/fa6";
import { createPackage, getAllPackageList, deletePackage } from "../../api/services/packages";
import DeletePackages from './PackagesDeleteDialogue';
import { State, City } from 'country-state-city';


const { CREATE_PACKAGES, GET_ALL_PACKAGE_LIST, DELETE_PACKAGE } = END_POINTS;



function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}
function Packages() {
    const [allPackages, setAllPackages] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [params, setAllParams] = useState({
        limit: 10,
        page: 1,
        search: ""
    });
    const [paginationData, setPaginationData] = useState([])
    const [open, setOpen] = useState(false)
    const [isDelete, setIsDelete] = useState(false);
    const [packageId, setPackageId] = useState(null);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [dropOffCity, setDropOffCities] = useState([]);
    const [alert, setAlert] = useState(false)


    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            _id: null,
            package_type: 'Day',
            driver_charge: 0,
            convience_charge: 0,
            company_charge: 0
        },
        resolver: yupResolver(CreatePackageSchema)
    });


    const pickupState = watch('pickup_state');
    const dropOffState = watch('dropoff_state');
    const bookingType = watch('booking_type');
    const tripType = watch('trip_type');
    let TotalBasic = Number(watch('driver_charge')) + Number(watch('convience_charge'));
    let TotalAmount = TotalBasic + Number(watch('company_charge')) + (Number(watch('company_charge')) * Number(watch('gst')) / 100);

    const fetchPackages = async (paramsData) => {
        const response = await getAllPackageList(GET_ALL_PACKAGE_LIST, {
            params: {
                ...paramsData,
            }
        });
        if (response) {
            if (response?.data?.responseCode === 200) {
                showToast(response?.data?.message, 'success')
                setAllPackages(response?.data?.responseData[0]?.data)
                setPaginationData(response?.data?.responseData[0]?.metadata)
            } else {
                showToast(response?.data?.message, 'error')
            }
        }
    };

    useEffect(() => {
        fetchPackages(params);
        const stateData = State.getStatesOfCountry('IN');
        setStates(stateData);
    }, []);

    useEffect(() => {
        if (pickupState) {
            const cityData = City.getCitiesOfState('IN', pickupState);
            setCities(cityData);
        } else {
            setCities([]);
        }
    }, [pickupState]);



    useEffect(() => {
        if (pickupState) {
            const cityData = City.getCitiesOfState('IN', pickupState);
            setCities(cityData);
        } else {
            setCities([]);
        }
    }, [pickupState]);

    useEffect(() => {
        if (dropOffState) {
            const cityData = City.getCitiesOfState('IN', dropOffState);
            setDropOffCities(cityData);
        } else {
            setDropOffCities([]);
        }
    }, [dropOffState]);

    const onSubmit = async (data) => {
        const payload = { ...data, basic_total: TotalBasic, total: TotalAmount }
        const response = await createPackage(CREATE_PACKAGES, payload);
        if (response?.data?.responseCode === 200) {
            showToast(response?.data?.message, 'success')
            reset();
            setOpen(false)
            fetchPackages(params)
        } else {
            showToast(response?.data?.message, 'error')
        }

    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const openPopover = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdatePackage = (data) => {
        console.log(data, "Data")
        reset({
            _id: data?._id,
            package_name: data?.package_name,
            booking_type: data?.booking_type,
            car_type: data?.car_type,
            trip_type: data?.trip_type,
            pickup_state: data?.pickup_state,
            pickup_city: data?.pickup_city,
            dropoff_state: data?.dropoff_state,
            dropoff_city: data?.dropoff_city,
            hours_package: data?.hours_package,
            days_package: data?.days_package,
            max_distance: data?.max_distance,
            extra_charge: data?.extra_charge?.$numberDecimal,
            driver_charge: data?.driver_charge?.$numberDecimal,
            other_charge: data?.other_charge?.$numberDecimal,
            company_charge: data?.company_charge?.$numberDecimal,
            convience_charge: data?.convience_charge?.$numberDecimal,
            gst: data?.gst?.$numberDecimal,
            basic_total: data?.basic_price?.$numberDecimal,
            total: data?.basic_price?.$numberDecimal,
        })
        setIsUpdate(true)
        setOpen(true);
        handleClose()
    }

    const handlePagination = (event) => {
        setAllParams(prevState => ({ ...prevState, page: event.currentTarget.textContent }));
        fetchPackages(params);
    }

    const handleSearch = () => {
        fetchPackages(params);
    }
    const handleDelete = (packageId) => {
        setPackageId(packageId)
        setIsDelete(true)
    }
    const handleConfirmDelete = async (remarks) => {
        if (remarks === '') {
            setAlert(true)
            return;
        }
        const response = await deletePackage(DELETE_PACKAGE, {
            data: {
                package_id: packageId,
                remarks: remarks
            }
        });
        if (response?.status === 200) {
            showToast(response?.data?.message, 'success');
            fetchPackages(params)
            setIsDelete(false)
        } else {
            showToast(response?.data?.message, 'error')
        }
    }
    const handleCloseAlert = () => setAlert(false);
    return (
        <>

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
                    <TextField placeholder="Search Packages..." sx={{
                        '& .MuiInputBase-root': {
                            height: 40,  // Set the height you need
                        },
                    }} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>

                        )
                    }}
                        onChange={
                            (e) => setAllParams(prevState => ({ ...prevState, search: e.target.value }))
                        }
                    />
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
                            <TableCell>Booking Type</TableCell>
                            <TableCell>Car Type</TableCell>
                            <TableCell>Way Type</TableCell>
                            <TableCell className="text-nowrap">Pick-Up State</TableCell>
                            <TableCell className="text-nowrap">Pick-Up City</TableCell>
                            <TableCell className="text-nowrap">Drop-Off State</TableCell>
                            <TableCell className="text-nowrap">Drop-Off City</TableCell>
                            <TableCell>Hours Package</TableCell>
                            <TableCell>Days Package</TableCell>

                            <TableCell>Maximum Distance</TableCell>
                            <TableCell>Driver Charge</TableCell>
                            <TableCell>Night Charge</TableCell>

                            <TableCell className="!text-center">Convenience Charge</TableCell>
                            <TableCell>GST</TableCell>
                            <TableCell>Basic Price</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPackages?.map((data, index) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {index + 1
                                        }</TableCell>
                                    <TableCell>
                                        {data?.package_name}
                                    </TableCell>
                                    <TableCell className="text-nowrap">
                                        {
                                            data?.booking_type
                                        }

                                    </TableCell>
                                    <TableCell>
                                        {data?.car_type}
                                    </TableCell>

                                    <TableCell>
                                        {data?.trip_type}

                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.pickup_state ? data?.pickup_state : "N.A."}

                                    </TableCell>
                                    <TableCell>
                                        {data?.pickup_city ? data?.pickup_city : "N.A."}


                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.dropoff_state ? data?.dropoff_state : 'N.A.'
                                        }
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.dropoff_city ? data?.dropoff_city : 'N.A.'
                                        }

                                    </TableCell>
                                    <TableCell className="!text-center text-nowrap">
                                        {
                                            data?.hours_package ? data?.hours_package : 'N.A.'
                                        }

                                    </TableCell>
                                    <TableCell className="!text-center">

                                        {
                                            data?.days_package ? data?.days_package : 'N.A.'
                                        }
                                    </TableCell>

                                    <TableCell className="!text-center">
                                        {
                                            data?.max_distance ? data?.max_distance : 'N.A.'
                                        }
                                    </TableCell>
                                    <TableCell
                                    >
                                        {data?.driver_charge?.$numberDecimal ? data?.driver_charge?.$numberDecimal : 'N.A.'}
                                    </TableCell>
                                    <TableCell>
                                        {data?.night_charge?.$numberDecimal ? data?.night_charge?.$numberDecimal : "N.A."}
                                    </TableCell>


                                    <TableCell>
                                        {data?.convience_charge?.$numberDecimal ? data?.convience_charge?.$numberDecimal : "N.A."}
                                    </TableCell>
                                    <TableCell>{data?.gst?.$numberDecimal ? data?.gst?.$numberDecimal : "N.A."}</TableCell>
                                    <TableCell>{data?.basic_total?.$numberDecimal ? data?.basic_total?.$numberDecimal : "N.A."}</TableCell>
                                    <TableCell>{data?.total?.$numberDecimal ? data?.total?.$numberDecimal : "N.A."}</TableCell>
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
                                                        onClick={() => handleUpdatePackage(data)}
                                                    >
                                                        Update Package
                                                    </Button>
                                                    <Button
                                                        className="!px-4"
                                                        onClick={() => handleDelete(data?._id)}
                                                    >
                                                        Delete Package
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
                <Stack spacing={2} className="!py-4 !w-full" direction={'row'} justifyContent={'center'}>
                    <Box>
                        <Pagination count={paginationData[0]?.total_page} variant="outlined" shape="rounded" onChange={handlePagination} />
                    </Box>
                </Stack>
            </TableContainer >
            <Drawer open={open} anchor="right">
                <Box className="!pt-20 !pb-4 px-5">
                    <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6" component="div">
                            {isUpdate ? 'Update' : 'Create'} Package
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
                                name="booking_type"
                                render={({ field }) => (
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Booking Type</InputLabel>
                                        <Select {...field} className="!w-full" labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Booking Type"

                                        >
                                            <MenuItem value="Local">Local</MenuItem>
                                            <MenuItem value="Outstation">Out Station</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="trip_type"
                                render={({ field }) => (
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Way Type</InputLabel>
                                        <Select {...field} className="!w-full" labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Package Type"
                                        >
                                            <MenuItem value="One Way">One Way</MenuItem>
                                            <MenuItem value="Round Trip">Round Trip</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name="car_type"
                                render={({ field }) => (
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Car Type</InputLabel>
                                        <Select {...field} className="!w-full" labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Car Type"
                                        >
                                            <MenuItem value="Hatchback">Hatchback</MenuItem>
                                            <MenuItem value="Sedan">Sedan</MenuItem>
                                            <MenuItem value="Luxury">Luxury</MenuItem>
                                            <MenuItem value="Suv">Suv</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Stack>
                        {
                            ((bookingType === 'Local' || bookingType === "Outstation") && tripType === "One Way") && <>
                                <Stack direction={"row"} gap={2} className="!mb-4">
                                    <Controller
                                        control={control}
                                        name="pickup_state"
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <InputLabel>Pick-Up State</InputLabel>
                                                <Select label="Pick-Up State" {...field}>
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
                                        name="pickup_city"
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <InputLabel>City</InputLabel>
                                                <Select label="Pick-Up City" {...field}>
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
                            </>
                        }

                        {
                            ((bookingType === 'Local' || bookingType === "Outstation") && tripType === "One Way") && <>
                                <Stack direction={"row"} gap={2} className="!mb-4">
                                    <Controller
                                        control={control}
                                        name="dropoff_state"
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <InputLabel>Drop-Off State</InputLabel>
                                                <Select label="Drop-Off State" {...field}>
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
                                        name="dropoff_city"
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <InputLabel>Drop Off City</InputLabel>
                                                <Select label="Pick-Up City" {...field}>
                                                    {dropOffCity.map((city) => (
                                                        <MenuItem key={city.name} value={city.name}>
                                                            {city.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Stack>
                            </>
                        }

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
                                name="convience_charge"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Convenience Charge"
                                        className="w-full"
                                        error={!!errors.convience_charge}
                                        helperText={errors.convience_charge?.message}
                                    />
                                )}
                            />
                            {/* <Controller
                                control={control}
                                name="days_package"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Days Package"
                                        className="w-full"
                                        error={!!errors.days_package}
                                        helperText={errors.days_package?.message}
                                    />
                                )}
                            /> */}
                            {/* <Controller
                                control={control}
                                name="hours_package"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Hours Package"
                                        className="w-full"
                                        error={!!errors.hours_package}
                                        helperText={errors.hours_package?.message}
                                    />
                                )}
                            /> */}

                        </Stack>
                        <Stack>
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
                        {
                            (bookingType === "Local" && tripType === "One Way") && (
                                <>
                                    <Stack direction={"row"} gap={2} className="!mb-4">
                                        <Controller
                                            control={control}
                                            name="max_distance"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Maximum Distance"
                                                    className="w-full"
                                                    error={!!errors.max_distance}
                                                    helperText={errors.max_distance?.message}
                                                />
                                            )}
                                        />


                                        {/* <Controller
                                control={control}
                                name="days_package"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Days Package"
                                        className="w-full"
                                        error={!!errors.days_package}
                                        helperText={errors.days_package?.message}
                                    />
                                )}
                            /> */}
                                        {/* <Controller
                                control={control}
                                name="hours_package"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Hours Package"
                                        className="w-full"
                                        error={!!errors.hours_package}
                                        helperText={errors.hours_package?.message}
                                    />
                                )}
                            /> */}

                                    </Stack>
                                </>
                            )
                        }


                        <Stack direction={"row"} className="!mb-4" gap={2}>
                            {
                                bookingType === "Local" ? <Controller
                                    control={control}
                                    name="hours_package"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Hours Package"
                                            className="w-full"
                                            error={!!errors.hours_package}
                                            helperText={errors.hours_package?.message}
                                        />
                                    )}
                                /> : <Controller
                                    control={control}
                                    name="days_package"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Days Package"
                                            className="w-full"
                                            error={!!errors.days_package}
                                            helperText={errors.days_package?.message}
                                        />
                                    )}
                                />
                            }
                            {
                                (bookingType === "Local" && tripType === "One Way") ? <Controller
                                    control={control}
                                    name="extra_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Extra Charge Per Distance"
                                            className="w-full"
                                            error={!!errors.extra_charge}
                                            helperText={errors.extra_charge?.message}
                                        />
                                    )}
                                /> : (bookingType === "Local" && tripType === "Round Trip") ? <Controller
                                    control={control}
                                    name="extra_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Extra Charge Per Hour"
                                            className="w-full"
                                            error={!!errors.extra_charge}
                                            helperText={errors.extra_charge?.message}
                                        />
                                    )}
                                /> : (bookingType === "Outstation" && tripType === "One Way") ? <Controller
                                    control={control}
                                    name="extra_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Extra Charge Per Days"
                                            className="w-full"
                                            error={!!errors.extra_charge}
                                            helperText={errors.extra_charge?.message}
                                        />
                                    )}
                                /> : <Controller
                                    control={control}
                                    name="extra_charge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Extra Charge Per Days"
                                            className="w-full"
                                            error={!!errors.extra_charge}
                                            helperText={errors.extra_charge?.message}
                                        />
                                    )}
                                />
                            }

                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="travelling_charge"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Other Charges"
                                        className="w-full"
                                        error={!!errors.travelling_charge}
                                        helperText={errors.travelling_charge?.message}
                                    />
                                )}
                            />

                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={TotalBasic}
                                label="Basic Amount"
                                className="w-full"

                            />


                        </Stack>

                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <Controller
                                control={control}
                                name="company_charge"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Company Charges"
                                        className="w-full"
                                        error={!!errors.company_charge}
                                        helperText={errors.company_charge?.message}
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
                                        error={!!errors.gst}
                                        helperText={errors.gst?.message}
                                    />
                                )}
                            />

                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            <TextField
                                label="Total Price"
                                className="w-full"
                                value={TotalAmount}
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
            <DeletePackages open={isDelete} handleClose={() => setIsDelete(false)} handleConfirm={handleConfirmDelete} />
            <Snackbar open={alert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="warning">Please add at least one remarks</Alert>
            </Snackbar>

        </>
    )
}

export default Packages;
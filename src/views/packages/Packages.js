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
import DeletePackages from './PackagesDeleteDialogue'

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
            package_type: 'Day'
        },
        resolver: yupResolver(CreatePackageSchema)
    });

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
    }, []);


    const onSubmit = async (data) => {
        const response = await createPackage(CREATE_PACKAGES, data);
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
        reset({
            _id: data?._id,
            package_name: data?.package_name,
            package_type: data?.type,
            driver_charge: data?.driver_charge?.$numberDecimal,
            night_charge: data?.night_charge?.$numberDecimal,
            kilometer: data?.kilometer?.$numberDecimal,
            hours: data?.hours,
            days: data?.days,
            extra_charge_kilometer: data?.kilometer?.$numberDecimal,
            extra_charge: data?.extra_charge_kilometer?.$numberDecimal,
            gst: data?.gst?.$numberDecimal,
            basic_price: data?.basic_price?.$numberDecimal,
            total_price: data?.total_price?.$numberDecimal,
            way_type: data?.way_type,
            range: data?.range
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
    const packageType = watch('package_type')
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
                                    <TableCell>
                                        {index + 1
                                        }</TableCell>
                                    <TableCell>
                                        {data?.package_name}
                                    </TableCell>
                                    <TableCell>
                                        {data?.package_type}
                                    </TableCell>
                                    <TableCell className="text-nowrap">
                                        {data?.driver_charge?.$numberDecimal}
                                    </TableCell>
                                    <TableCell>
                                        {data?.night_charge?.$numberDecimal}
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.kilometer?.$numberDecimal}
                                    </TableCell>
                                    <TableCell>
                                        {data?.hours ? data?.hours : "N.A."} 
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.days ? data?.days : 'N.A.'
                                        }
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {data?.extra_charge_kilometer?.$numberDecimal}
                                    </TableCell>
                                    <TableCell className="!text-center text-nowrap">
                                        {data?.gst?.$numberDecimal} %
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.basic_price?.$numberDecimal
                                        }
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.total_price?.$numberDecimal
                                        }
                                    </TableCell>
                                    <TableCell className="!text-center">
                                        {
                                            data?.way_type}
                                    </TableCell>
                                    <TableCell
                                    >
                                        {data?.range}
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
                                name="package_type"
                                render={({ field }) => (
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Package Type</InputLabel>
                                        <Select {...field} className="!w-full" labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Package Type"
                                        >
                                            <MenuItem value="Day">Day</MenuItem>
                                            <MenuItem value="Hour">Hour</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
                            {
                                packageType === 'Day' ? <Controller
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
                                /> : <Controller
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
                            }

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
                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
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

                        </Stack>
                        <Stack direction={"row"} gap={2} className="!mb-4">
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
                            {
                                packageType === 'day' ?
                                    <Controller
                                        control={control}
                                        name="extra_charge"
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Extra charges of per day"
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
                                                label="Extra charges of per hour"
                                                className="w-full"
                                                error={!!errors.extra_charge}
                                                helperText={errors.extra_charge?.message}
                                            />
                                        )}
                                    />
                            }
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
                                            <MenuItem value="One Way">One Way</MenuItem>
                                            <MenuItem value="Round Trip">Round Trip</MenuItem>
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
                                            <MenuItem value="Local">Local</MenuItem>
                                            <MenuItem value="Outstation">Out Station</MenuItem>
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
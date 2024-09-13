import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllRides, deleteRide, cancelRide, createRide } from "../../api/services/ride";
import END_POINTS from "../../constants/endpoints";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  Typography,
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  IconButton,
  Pagination,
  Popover,
  Select,
  MenuItem,
  TablePagination,
  FormControl,
  InputLabel,
  Avatar,
  Grid
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CloseIcon from "@mui/icons-material/Close";
import { FaEllipsisVertical } from "react-icons/fa6";
import showToast from "../../utils/toast";
import { CreateRideSchema } from "../../validations/RideValidation";
import { yupResolver } from '@hookform/resolvers/yup';
import AssignRideDialog from "./assignRideDialog";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import CancelRideDialog from "./cancelRideDialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { getPackages } from "../../api/services/packages";
import { State, City } from 'country-state-city';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const CarType = ["Hatchback", "Sedan", "Suv", "Luxury"]
function AllRides() {
  const [allRides, setAllRides] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    setValue,
    getValues,
    trigger
  } = useForm({
    defaultValues: {
      _id: null,
      way_type: 'One Way',
      booking_type: 'Local',
      return_state: '',
      return_city: '',
      pickup_state: '',
      pickup_city: '',
      travel_allowance: 0,
      decrement_percentage: 0,
      increment_percentage: 0

    },
    resolver: yupResolver(CreateRideSchema)
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { BOOKING_LIST, ADMIN_DELETE_BOOKING, ADMIN_CANCEL_BOOKING, CREATE_BOOKING, GET_ALL_PACKAGES } =
    END_POINTS;
  const [bookingID, setBookingID] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState([]);
  const [packages, setAllPackages] = useState([]);
  const [selectPackage, setSelectPackage] = useState(false)
  const [allParams, setAllParams] = useState({
    booking_type: '',
    way_type: '',
    search: '',
    status: '',
    startDate: '',
    endDate: "",
    city: "",
    state: ""
  })
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [dropOffStates, setDropOffStates] = useState([])
  const [dropOffCity, setDropOffCity] = useState([]);
  const [isLoading, setISLoading] = useState(false);
  const [remarks, setRemarks] = useState('');

  const fetchRides = async () => {
    const data = await getAllRides(BOOKING_LIST,
      {
        params: {
          ...allParams,
          page: currentPage,
          limit: 10,
        }
      }
    );
    console.log(data, "data 12121")
    if (data?.data?.length > 0) {
      setAllRides(data?.data);
      setPaginationData(data?.metadata)
    } else {
      setAllRides([]);
    }
  };
  console.log(watch(), "Check Watch Values")
  const fetchPackage = async () => {
    // const { booking_type, trip_type, pickup_city
    //   , pickup_state, dropoff_city, dropoff_state } = watch();
    // console.log(booking_type)
    const response = await getPackages(GET_ALL_PACKAGES);
    if (response?.data?.responseCode === 200) {
      setAllPackages(response?.data?.responseData)
    }
  };

  const pickupState = watch('pickup_state');
  const dropOffState = watch('return_state');

  useEffect(() => {
    const stateData = State.getStatesOfCountry('IN');
    setDropOffStates(stateData)
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
    if (dropOffState) {
      const cityData = City.getCitiesOfState('IN', dropOffState);
      setDropOffCity(cityData);
    } else {
      setDropOffCity([]);
    }
  }, [dropOffState])
  const handleCity = (value) => {

    if (value) {
      const cityData = City.getCitiesOfState('IN', value);
      setDropOffCity(cityData);
    } else {
      setDropOffCity([]);
    }
  }

  useEffect(() => {
    fetchRides();
  }, [currentPage, allParams]);
  const watchAllFields = watch();
  // useEffect(() => {
  //   fetchPackage()
  // }, [])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openPopover = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hanldeDeleteRide = async (id) => {
    handleClose();
    const data = await deleteRide(ADMIN_DELETE_BOOKING, {
      bookingId: id,
      remarks: "NO Idea"
    });
    if (data?.responseCode === 200) {
      showToast(data?.message, 'success');
      fetchRides();
    }
  };

  const handleCancelRide = async () => {
    if (remarks.trim() === "") {
      showToast('Please add remarks before cancel ride.', 'error');
      return;
    }
    handleClose();
    const data = await cancelRide(ADMIN_CANCEL_BOOKING, { bookingId: bookingID, remarks: remarks });
    if (data?.responseCode === 200) {
      showToast(data?.message, 'success');
      fetchRides();
    }
    setIsCancel(false)
  };
  const onSubmit = async (data) => {
    setISLoading(true)
    const pickupformattedDate = dayjs(data.pickup_date).format('YYYY-MM-DD');
    const returnformattedDate = dayjs(data.return_date).format('YYYY-MM-DD');
    const transformedData = {
      ...data,
      pickup_date: pickupformattedDate,
      return_date: returnformattedDate,
    };
    const response = await createRide(CREATE_BOOKING, transformedData);
    if (response?.message) {
      if (data?._id === null) {
        setISLoading(false)
        setBookingID(response?.bookingId)
        setDialogOpen(true);
      } else {
        setIsUpdate(false)
      }
      showToast(response?.message, 'success')
      fetchRides();
      setOpen(false);
      reset();
    }
  };
  const handleNavigate = () => {
    const queryParams = new URLSearchParams({ bookingId: bookingID });
    navigate(`/drivers?${queryParams.toString()}`);
    setDialogOpen(false)
  }

  const handleRedirect = (boolean) => {
    if (boolean === true) {
      const queryParams = new URLSearchParams({ bookingId: bookingID });
      navigate(`/drivers?${queryParams.toString()}`);
      setDialogOpen(false)
    } else {
      setDialogOpen(false)
    }
  }

  const handleUpdateRide = (data) => {
    reset({
      _id: data['_id'],
      booking_type: data['booking_type'],
      way_type: data['way_type'],
      pass_name: data['pass_name'],
      pass_mobile_no: data['pass_mobile_no'],
      pickup_time: dayjs(data['pickup_time']),
      return_time: dayjs(data['return_time']),
      return_date: dayjs(data['return_date']),
      pickup_date: dayjs(data['pickup_date']),
      pickup_address: data['pickup_address'],
      pickup_state: data['pickup_state'],
      pickup_city: data['pickup_city'],
      pickup_pin: data['pickup_pin'],
      return_address: data['return_address'],
      return_state: data['return_state'],
      return_city: data['return_city'],
      package_id: data['package_id'],
      return_pin: data['return_pin'],
      car_type: data['car_type'],
      pass_whatsapp_no: data['pass_whatsapp_no'],
      payment_type: data['payment_type'],
      alreadypaid_amount: data['alreadypaid_amount'],
      email: data['email'],
      travel_allowance: data['travel_allowance']
    })
    setIsUpdate(true)
    setOpen(true);
    handleClose()
  }

  const handlePagination = (event) => {
    setCurrentPage(event.currentTarget.textContent)
  }

  const handleViewRideDetail = (_booking_id, data) => {
    const queryParams = new URLSearchParams({ bookingId: _booking_id });
    navigate(`/ride-detail?${queryParams.toString()}`, { state: data });
  }

  const [search, setSearch] = useState('');
  const wayType = watch('way_type', 'One Way');
  const paymentType = watch('payment_type')
  const date = new Date();
  const handleRideNumberChange = async (value) => {
    if (value?.length === 10) {
      const response = await getAllRides(BOOKING_LIST, {
        params: {
          search: value
        }
      });
      if (response?.data?.length > 0) {
        console.log(response?.data[0]['way_type'], "WAY TYPE")
        reset({
          // _id: data['_id'],
          booking_type: response?.data[0]['booking_type'],
          way_type: response?.data[0]['way_type'],
          pass_name: response?.data[0]['pass_name'],
          pass_mobile_no: response?.data[0]['pass_mobile_no'],
          pickup_time: dayjs(response?.data[0]['pickup_time']),
          return_time: dayjs(response?.data[0]['return_time']),
          return_date: dayjs(response?.data[0]['return_date']),
          pickup_date: dayjs(response?.data[0]['pickup_date']),
          pickup_address: response?.data[0]['pickup_address'],
          pickup_state: response?.data[0]['pickup_state'],
          pickup_city: response?.data[0]['pickup_city'],
          pickup_pin: response?.data[0]['pickup_pin'],
          return_address: response?.data[0]['return_address'],
          return_state: response?.data[0]['return_state'],
          return_city: response?.data[0]['return_city'],
          package_id: response?.data[0]['package_id'],
          return_pin: response?.data[0]['return_pin'],
          car_type: response?.data[0]['car_type'],
          pass_whatsapp_no: response?.data[0]['pass_whatsapp_no'],
          payment_type: response?.data[0]['payment_type'],
          alreadypaid_amount: response?.data[0]['alreadypaid_amount'],
          email: response?.data[0]['email'],
          travel_allowance: response?.data[0]['travel_allowance']
        })
      }
    }
  };
  const allValue = getValues();

  const { way_type, booking_type, pickup_city, pickup_state, return_city, return_state } = allValue;
  const handlePackage = async () => {
    const response = await getPackages(GET_ALL_PACKAGES, {
      params: {
        trip_type: way_type,
        pickup_city: pickup_city,
        pickup_state: pickup_state,
        dropoff_city: return_city,
        dropoff_state: return_state,
        booking_type: booking_type
      }
    });
    if (response?.data?.responseCode === 200) {
      setAllPackages(response?.data?.responseData)
    }
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Box className="flex my-2 justify-between px-4  gap-4">
          <Typography variant="h6" component="div">
            Ride Bookings
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#DD781E', height: 40 }}
            onClick={() => setOpen(true)}
          >
            Create Ride
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'wrap' }} className=" !px-4 !my-4">

          {/* Search Field */}
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              placeholder="Search Ride..."
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setAllParams(prevState => ({ ...prevState, search }))}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          {/* From Date */}
          <Grid item xs={12} sm={4} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"

                onChange={(value) => setAllParams({ ...allParams, startDate: dayjs(value).format('YYYY-MM-DD') })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ '& .MuiInputBase-root': { height: 40 } }} // Adjust height
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* To Date */}
          <Grid item xs={12} sm={4} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To"
                onChange={(value) => setAllParams({ ...allParams, endDate: dayjs(value).format('YYYY-MM-DD') })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ '& .MuiInputBase-root': { height: 40 } }} // Adjust height
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* State Dropdown */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select label="State" >
                {dropOffStates.map((state) => (
                  <MenuItem key={state.name} value={state.isoCode} onClick={(e) => { setAllParams({ ...allParams, state: state.name }); handleCity(state.isoCode) }}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* City Dropdown */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select label="City" >
                {dropOffCity.map((city) => (
                  <MenuItem key={city.name} value={city.name} onClick={(e) => { setAllParams({ ...allParams, city: city.name }) }}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>

          {/* Booking Type Dropdown */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>Booking Type</InputLabel>
              <Select
                label="Booking Type"
                value={allParams.booking_type || 'All'}
                onChange={(e) => setAllParams({ ...allParams, booking_type: e.target.value })}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'Local'}>Local</MenuItem>
                <MenuItem value={'Outstation'}>Outstation</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Way Type Dropdown */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>Way Type</InputLabel>
              <Select
                label="Way Type"
                value={allParams.way_type || 'All'}
                onChange={(e) => setAllParams({ ...allParams, way_type: e.target.value })}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'One Way'}>One Way</MenuItem>
                <MenuItem value={'Round Trip'}>Round Trip</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Status Dropdown */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={allParams.status || 'All'}
                onChange={(e) => setAllParams({ ...allParams, status: e.target.value })}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'complete'}>Complete</MenuItem>
                <MenuItem value={'interested'}>Interested</MenuItem>
                <MenuItem value={'approved'}>Approved</MenuItem>
                <MenuItem value={'pending'}>Pending</MenuItem>
                <MenuItem value={'cancel'}>Cancel</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Passenger Mobile No.</TableCell>
              <TableCell>Passenger Whatsapp No.</TableCell>
              <TableCell>Booking Type</TableCell>
              <TableCell>Way Type</TableCell>
              <TableCell className="!text-center">Pick-up</TableCell>
              <TableCell className="!text-center">Pick-up Date</TableCell>
              <TableCell className="!text-center">Pick-up Time</TableCell>
              <TableCell className="!text-center">Drop-off</TableCell>
              <TableCell className="!text-center">Drop-off Date</TableCell>
              <TableCell className="!text-center">Interested Driver</TableCell>
              <TableCell className="!text-center">Assigned Driver Name</TableCell>
              <TableCell className="!text-center">Assigned Driver Number</TableCell>
              <TableCell className="!text-center">Fare</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {
            allRides?.length > 0 ? <TableBody>

              {allRides?.map((data, index) => {
                return (
                  <TableRow
                    onClick={() => handleViewRideDetail(data?._id, data)}
                  >
                    {console.log(data, 'data123123', index)}
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{data?.pass_name}</TableCell>
                    <TableCell>{data?.pass_mobile_no}</TableCell>
                    <TableCell>{data?.pass_whatsapp_no}</TableCell>
                    <TableCell>{data?.booking_type}</TableCell>
                    <TableCell>{data?.way_type}</TableCell>
                    <TableCell className="!text-center">{
                      data?.pickup_address +
                      " " +
                      data?.pickup_city +
                      ", " +
                      data?.pickup_pin}

                    </TableCell>
                    <TableCell>
                      {
                        date.toISOString(data?.pickup_date).split('T')[0]
                      }
                    </TableCell>
                    <TableCell>
                      {dayjs(data?.pickup_time).utc().format('HH:mm:ss')}

                    </TableCell>
                    <TableCell>
                      {data?.return_address !== undefined ? data?.return_address +
                        " " +
                        data?.return_city +
                        ", " +
                        data?.return_pin : 'N.A.'}
                    </TableCell>
                    <TableCell>


                      {
                        data?.return_date ? date.toISOString(data?.return_date).split('T')[0] : 'N.A.'
                      }
                    </TableCell>
                    <TableCell className="!text-center">
                      {
                        data?.request_count > 0 ? <Button endIcon={<VisibilityIcon />} onClick={(e) => { handleViewRideDetail(data?._id, data); e.stopPropagation(); }} >{data?.request_count}</Button> : <Button endIcon={<VisibilityIcon />} disabled={true}>0</Button>
                      }
                    </TableCell>
                    <TableCell className="!text-center">{data?.user?.full_name ? data?.user?.full_name : "Pending"}</TableCell>
                    <TableCell className="!text-center">{data?.user?.full_name ? data?.user?.mobile_no : "Pending"}</TableCell>
                    <TableCell className="!text-center">{data?.fare[0]?.amount ? parseFloat(data?.fare[0]?.amount).toFixed(2) : 'N/A'}</TableCell>
                    <TableCell
                      className={
                        data?.booking_status === "pending"
                          ? " !text-orange-400 capitalize"
                          : data?.booking_status === "approved" ? '!text-green-500 ' : data?.booking_status === "cancel" ? '!text-red-600 capitalize' : ''
                      }
                    >
                      {data?.booking_status === "approved" ? 'Assigned' : data?.booking_status}
                    </TableCell>
                    {/* {console.log(data , "DATA HAIN KYA ??")} */}
                    <TableCell>
                      <Box>
                        <IconButton onClick={(e) => { handleClick(e); e.stopPropagation(); setBookingID(data?._id); }}>
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
                              onClick={(e) => { handleUpdateRide(data); e.stopPropagation() }}
                            >
                              Update Ride
                            </Button>
                            <Button
                              className="!px-4"
                              onClick={(e) => { hanldeDeleteRide(data?._id); e.stopPropagation() }}
                            >
                              Delete Ride
                            </Button>
                            <Button
                              className="!px-4"
                              onClick={(e) => { setIsCancel(true); handleClose(); e.stopPropagation() }}
                            >
                              Cancel Ride
                            </Button>
                            <Button
                              className="!px-4"
                              onClick={async (e) => {
                                handleNavigate(data?._id)
                                e.stopPropagation()
                              }}
                            >
                              Assign Ride
                            </Button>
                          </Box>
                        </Popover>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody> :

              <Typography className=" text-nowrap text-center">No Data Found</Typography>
          }

        </Table>
        <Stack spacing={2} className="!py-4 !w-full" direction={'row'} justifyContent={'center'}>
          <Box>
            <Pagination count={paginationData[0]?.total_page} variant="outlined" shape="rounded" onChange={handlePagination} />
          </Box>
        </Stack>
      </TableContainer >
      <Box>
        <Drawer open={open} anchor={"right"}>
          <Box className="!pt-20 !pb-4 px-5">
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="h6" component="div">
                Create Ride
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
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="pass_mobile_no"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleRideNumberChange(e.target.value);
                      }}
                      label="Mobile No."
                      className="w-full"
                      error={!!errors.pass_mobile_no}
                      helperText={errors.pass_mobile_no?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="pass_whatsapp_no"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Whatsapp Number"
                      className="w-full"
                      error={!!errors.pass_whatsapp_no}
                      helperText={errors.pass_whatsapp_no?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      className="w-full"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="booking_type"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Booking Type</InputLabel>
                      <Select {...field} className="w-full" defaultValue="Local" label="Booking Type">
                        <MenuItem value={'Local'}>Local</MenuItem>
                        <MenuItem value={'Outstation'}>Out Station</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="way_type"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Way Type</InputLabel>
                      <Select {...field} className="w-full" defaultValue="One Way" label="Packages">
                        <MenuItem value={'One Way'}>One Way</MenuItem>
                        <MenuItem value={'Round Trip'}>Round Trip</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
              {
                watch('booking_type') === "Outstation" &&
                <Stack direction={"row"} gap={2} className="!mb-4">
                  <Controller
                    control={control}
                    name=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Number of Days"
                        className="w-full"
                        error={!!errors.alreadypaid_amount}
                        helperText={errors.alreadypaid_amount?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Stack>
              }
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="payment_type"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Payment Type</InputLabel>
                      <Select {...field} className="w-full" defaultValue="Local" label="Booking Type">
                        <MenuItem value={'Prepaid'}>Prepaid</MenuItem>
                        <MenuItem value={'Postpaid'}>Postpaid</MenuItem>
                        <MenuItem value={'Partially Paid'}>Partially Paid</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                {
                  (paymentType === "Prepaid" || paymentType === "Partially Paid") &&
                  <Controller
                    control={control}
                    name="alreadypaid_amount"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Payment Amount"
                        className="w-full"
                        error={!!errors.alreadypaid_amount}
                        helperText={errors.alreadypaid_amount?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                }
              </Stack>
              <Stack direction={"row"} gap={2} alignItems={'center'}>
                <Controller
                  control={control}
                  name="pickup_date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Pick-up Date"  {...field} renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          error={!!errors.pickup_date}
                          helperText={errors.pickup_date?.message}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                      />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  control={control}
                  name="pickup_time"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker label="Pick-up Time" {...field} className=" !mb-2" />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">

                <Controller
                  control={control}
                  name="pickup_state"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Pickup State</InputLabel>
                      <Select label="Pick-up State" {...field}>
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
                      <InputLabel>Pick-up City</InputLabel>
                      <Select label="Pick-up City" {...field}>
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
                  name="pickup_address"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Pick-up address"
                      className="w-full"
                      error={!!errors.pickup_address}
                      helperText={errors.pickup_address?.message}
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Stack>
              {
                wayType === "One Way" && (
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
                                InputLabelProps={{ shrink: true }}
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
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker label="Drop-off Time" {...field} render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Drop-off Time"
                                  className="w-full"
                                  error={!!errors.return_time}
                                  helperText={errors.return_time?.message}
                                  InputLabelProps={{ shrink: true }}
                                />
                              )} />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
                    </Stack>
                    <Stack direction={"row"} gap={2} className="!mb-4">
                      <Controller
                        control={control}
                        name="return_state"
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <InputLabel>Drop-off State</InputLabel>
                            <Select label="Drop-off State" {...field}>
                              {dropOffStates.map((state) => (
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
                        name="return_city"
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <InputLabel>Drop-off City</InputLabel>
                            <Select label="Drop-off City" {...field}>
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
                            InputLabelProps={{ shrink: true }}
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
              }

              <Stack direction={"row"} className="!mb-4" gap={2}>
                <Controller
                  control={control}
                  name="car_type"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Car Type</InputLabel>
                      <Select {...field} className="w-full" label="Car Type">
                        {
                          CarType?.map((carType) => <MenuItem value={carType}>
                            {carType}
                          </MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  )}
                />
                {
                  !selectPackage && <Button onClick={() => { setSelectPackage(true); handlePackage() }} variant="contained" disabled={
                    (!way_type || !booking_type || !pickup_city || !pickup_state) ?
                      true : false
                  }>
                    Select Package
                  </Button>
                }

                {
                  selectPackage && (

                    <Controller
                      control={control}
                      name="package_id"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Packages</InputLabel>
                          <Select {...field} className="w-full" label="Packages">
                            {

                              packages?.map((data) => <MenuItem value={data?._id}>
                                {data?.package_name}
                              </MenuItem>)
                            }
                          </Select>
                        </FormControl>
                      )}
                    />
                  )
                }
              </Stack>
              <Stack direction={"row"} className="!mb-4" gap={2}>
                <Controller
                  control={control}
                  name="travel_allowance"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Travel Allowance"
                      className="w-full"
                      error={!!errors.travel_allowance}
                      helperText={errors.travel_allowance?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="increment_percentage"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Add Surcharge (in %)"
                      className="w-full"
                      error={!!errors.increment_percentage}
                      helperText={errors.increment_percentage?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Stack>
              <Stack direction={"row"} className="!mb-4" gap={2}>
                <Controller
                  control={control}
                  name="decrement_percentage"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Discount (in %)"
                      className="w-full"
                      error={!!errors.decrement_percentage}
                      helperText={errors.decrement_percentage?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />

                <TextField
                  value={Number(watch('travel_allowance')) + Number((watch('travel_allowance') * watch('increment_percentage') / 100)) - Number(((watch('travel_allowance') * watch('decrement_percentage')) / 100))}
                  label="Total Fare"
                  className="w-full"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                />

              </Stack>
              <Box className="flex" gap={2}>
                <Button variant="outlined" className="!w-full" type="reset">
                  Reset
                </Button>
                {
                  isUpdate ? <Button variant="contained" type="submit" className="!w-full !bg-[#DD781E]">
                    Update
                  </Button> : <Button variant="contained" type="submit" className="!w-full !bg-[#DD781E]" disabled={isLoading}>
                    Submit
                  </Button>
                }
              </Box>
            </Box>
          </Box>
        </Drawer>

      </Box>
      <AssignRideDialog dialogOpen={dialogOpen} handleNavigate={handleRedirect} />
      <CancelRideDialog open={isCancel} remarksChange={(value) => setRemarks(value)} handleClose={() => setIsCancel(false)} handleConfirm={handleCancelRide} />
    </>
  );
}

export default AllRides;

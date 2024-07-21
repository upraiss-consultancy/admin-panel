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
  TablePagination
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
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
function AllRides() {
  const [allRides, setAllRides] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },

  } = useForm({
    defaultValues: {
      _id: null,
      way_type: 'one',
      area_type: 'local',

    },
    resolver: yupResolver(CreateRideSchema)
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { BOOKING_LIST, ADMIN_DELETE_BOOKING, ADMIN_CANCEL_BOOKING, CREATE_BOOKING } =
    END_POINTS;
  const [bookingID, setBookingID] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState([]);
  const [allParams, setAllParams] = useState({
    booking_type: 'live',
    area_type: 'local',
    way_type: 'one',
    search: ''
  })
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
    if (data?.data?.length > 0) {
      setAllRides(data?.data);
      setPaginationData(data?.metadata)
    } else {
      setAllRides([]);
    }
  };
  useEffect(() => {
    fetchRides();
  }, [currentPage, allParams]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openPopover = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hanldeDeleteRide = async (id) => {
    handleClose();
    const data = await deleteRide(ADMIN_DELETE_BOOKING, id);
    if (data?.responseCode === 200) {
      showToast(data?.message, 'success');
      fetchRides();
    }
  };

  const handleCancelRide = async () => {
    handleClose();
    const data = await cancelRide(ADMIN_CANCEL_BOOKING, bookingID);
    if (data?.responseCode === 200) {
      showToast(data?.message, 'success');
      fetchRides();
    }
    setIsCancel(false)
  };
  const onSubmit = async (data) => {

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
  const handleNavigate = (params) => {
    if (params) {
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
      area_type: data['area_type'],
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
      return_city: data['return_state'],
      amount: data['amount']?.$numberDecimal,
      return_pin: data['return_pin']
    })
    setIsUpdate(true)
    setOpen(true);
    handleClose()
  }

  const handlePagination = (event) => {
    setCurrentPage(event.currentTarget.textContent)
  }

  const handleViewRideDetail = (_booking_id) => {
    const queryParams = new URLSearchParams({ bookingId: _booking_id });
    navigate(`/ride-detail?${queryParams.toString()}`);
  }

  const [search, setSearch] = useState('')
  const wayType = watch('way_type', 'one')
  return (
    <>
      <TableContainer component={Paper}>
        <Box className="flex my-2 justify-between px-4">
          <Typography variant="h6" component="div">
            Ride Bookings
          </Typography>
          {/* <Controller name="" control={control} render={({ field }) =>  */}
          <TextField placeholder="Search Ride..." sx={{
            '& .MuiInputBase-root': {
              height: 40,  // Set the height you need
            },
          }} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                  // if (search.trim() !== "") {
                    setAllParams(prevState => ({ ...prevState, search: search }))
                  // }
                }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>

            )
          }} onChange={(e) => setSearch(e.target.value)} />
          {/* } /> */}
          <Select defaultValue={'live'} className=" min-w-36 !max-h-10" onChange={(e) => setAllParams(prevState => ({ ...prevState, booking_type: e.target.value }))}>
            <MenuItem value={'live'}>Live</MenuItem>
            {/* <MenuItem value={'out-station'}>Out Station</MenuItem> */}
          </Select>
          <Select defaultValue={'local'} className=" min-w-36 !max-h-10" onChange={(e) => setAllParams(prevState => ({ ...prevState, area_type: e.target.value }))}>
            <MenuItem value={'local'}>Local</MenuItem>
            <MenuItem value={'out-station'}>Out Station</MenuItem>
          </Select>
          <Select defaultValue={'one'} className=" min-w-36 !max-h-10" onChange={(e) => setAllParams(prevState => ({ ...prevState, way_type: e.target.value }))}>
            <MenuItem value={'one'}>One</MenuItem>
            <MenuItem value={'rounded'}>Rounded</MenuItem>
          </Select>
          <Button
            variant="contained"
            className="!bg-[#DD781E]"
            onClick={() => setOpen(true)}
          >
            Create Ride
          </Button>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Passenger Mobile No.</TableCell>
              <TableCell>Booking Type</TableCell>
              <TableCell>Way Type</TableCell>
              <TableCell className="!text-center">Pick-up</TableCell>
              <TableCell className="!text-center">Drop-off</TableCell>
              <TableCell className="!text-center">Interested Driver</TableCell>
              <TableCell className="!text-center">Assigned Driver Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRides?.map((data, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data?.pass_name}</TableCell>
                  <TableCell>{data?.pass_mobile_no}</TableCell>
                  <TableCell>{data?.booking_type}</TableCell>
                  <TableCell>{data?.area_type}</TableCell>
                  <TableCell className="!text-center">
                    {data?.pickup_address +
                      " " +
                      data?.pickup_city +
                      ", " +
                      data?.pickup_pin}
                  </TableCell>
                  <TableCell>
                    {data?.return_address +
                      " " +
                      data?.return_city +
                      ", " +
                      data?.return_pin}
                  </TableCell>
                  <TableCell className="!text-center">
                    {
                      data?.request_count > 0 ? <Button endIcon={<VisibilityIcon />} onClick={() => handleViewRideDetail(data?._id)} >{data?.request_count}</Button> : "N.A."
                    }
                  </TableCell>
                  <TableCell className="!text-center">N.A.</TableCell>
                  <TableCell
                    className={
                      data?.booking_status === "pending"
                        ? " !text-orange-400 capitalize"
                        : data?.booking_status === "approved" ? '!text-green-500 ' : data?.booking_status === "cancel" ? '!text-red-600 capitalize' : ''
                    }
                  >
                    {data?.booking_status === "approved" ? 'Assigned' : data?.booking_status}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <IconButton onClick={(e) => handleClick(e)}>
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
                            onClick={() => handleUpdateRide(data)}
                          >
                            Update Ride
                          </Button>
                          <Button
                            className="!px-4"
                            onClick={() => hanldeDeleteRide(data?._id)}
                          >
                            Delete Ride
                          </Button>
                          <Button
                            className="!px-4"
                            onClick={() => { setBookingID(data?._id); setIsCancel(true); handleClose() }}
                          >
                            Cancel Ride
                          </Button>
                          <Button
                            className="!px-4"
                            onClick={() => { setBookingID(data?._id); handleNavigate(true) }}
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
          </TableBody>
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
                />
                <Controller
                  control={control}
                  name="way_type"
                  render={({ field }) => (
                    <Select {...field} className="w-full" defaultValue="one">
                      <MenuItem value={'one'}>One</MenuItem>
                      <MenuItem value={'rounded'}>Rounded</MenuItem>
                    </Select>
                    // <TextField {...field} label="Way Type" className="w-full" error={!!errors.way_type}
                    //   helperText={errors.way_type?.message} />
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="pickup_date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Pick-up Date" {...field} renderInput={(params) => (
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
                  name="pickup_time"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker label="Pick-up Time" {...field} renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          error={!!errors.pickup_time}
                          helperText={errors.pickup_time?.message}
                        />
                      )} />
                    </LocalizationProvider>
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
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="pickup_state"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Pick-up state"
                      className="w-full"
                      error={!!errors.pickup_state}
                      helperText={errors.pickup_state?.message}
                    />
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">
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
              </Stack>
              {
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
              }

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

      </Box>
      <AssignRideDialog dialogOpen={dialogOpen} handleNavigate={handleNavigate} />
      <CancelRideDialog open={isCancel} handleClose={() => setIsCancel(false)} handleConfirm={handleCancelRide} />
    </>
  );
}

export default AllRides;

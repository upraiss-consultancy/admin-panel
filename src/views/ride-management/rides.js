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
      _id: null
    },
    resolver: yupResolver(CreateRideSchema)
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { BOOKING_LIST, ADMIN_DELETE_BOOKING, ADMIN_CANCEL_BOOKING, CREATE_BOOKING } =
    END_POINTS;
  const [bookingID, setBookingID] = useState('')
  const navigate = useNavigate()
  const fetchRides = async () => {
    const data = await getAllRides(BOOKING_LIST);
    if (data?.length > 0) {
      setAllRides(data);
    }
  };
  useEffect(() => {
    fetchRides();
  }, []);
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

  const handleCancelRide = async (id) => {
    handleClose();
    const data = await cancelRide(ADMIN_CANCEL_BOOKING, id);
    if (data?.responseCode === 200) {
      showToast(data?.message, 'success');
      fetchRides();
    }
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
      showToast(response?.message, 'success')
      fetchRides();
      setDialogOpen(true);
      setOpen(false);
      reset();
      setBookingID(response?.bookingId)
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
  return (
    <>
      <TableContainer component={Paper}>
        <Box className="flex my-2 justify-between px-4">
          <Typography variant="h6" component="div">
            Ride Bookings
          </Typography>
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
                  <TableCell
                    className={
                      data?.booking_status === "pending"
                        ? " !text-orange-400 capitalize"
                        : ""
                    }
                  >
                    {data?.booking_status}
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
                            onClick={() => hanldeDeleteRide(data?._id)}
                          >
                            Delete Ride
                          </Button>
                          <Button
                            className="!px-4"
                            onClick={() => handleCancelRide(data?._id)}
                          >
                            Cancel Ride
                          </Button>
                          <Button
                            className="!px-4"
                            onClick={() => handleCancelRide(data?._id)}
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
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Box>
        </Stack>
      </TableContainer>
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
                    <TextField
                      {...field}
                      label="Area Type"
                      className="w-full"
                      error={!!errors.area_type}
                      helperText={errors.area_type?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="way_type"
                  render={({ field }) => (
                    <TextField {...field} label="Way Type" className="w-full" error={!!errors.way_type}
                      helperText={errors.way_type?.message} />
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="pickup_date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Pick-up Date" {...field} disablePast renderInput={(params) => (
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
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="return_date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Drop-off Date" {...field} disablePast render={({ field }) => (
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
                <Button variant="contained" type="submit" className="!w-full !bg-[#DD781E]">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Drawer>

      </Box>
      <AssignRideDialog dialogOpen={dialogOpen} handleNavigate={handleNavigate} />
    </>
  );
}

export default AllRides;

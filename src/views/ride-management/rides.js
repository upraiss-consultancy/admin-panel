import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllRides, deleteRide, cancelRide } from "../../api/services/ride";
import END_POINTS from "../../constants/endpoints";
import {
  Typography,
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { FaEllipsisVertical } from "react-icons/fa6";

function AllRides() {
  const [allRides, setAllRides] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(AdminLoginSchema)
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { BOOKING_LIST, ADMIN_DELETE_BOOKING, ADMIN_CANCEL_BOOKING } =
    END_POINTS;
  useEffect(() => {
    const fetchRides = async () => {
      const data = await getAllRides(BOOKING_LIST);
      if (data?.length > 0) {
        setAllRides(data);
      }
    };
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
      alert(data?.message);
    }
  };

  const handleCancelRide = async (id) => {
    handleClose();
    const data = await cancelRide(ADMIN_CANCEL_BOOKING, id);
    if (data?.responseCode === 200) {
      alert(data?.message);
    }
  };
  const onSubmit = (data) => {
    console.log(data, "data");
  };


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
              className=" flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
              onReset={() => reset()}
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
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="way_type"
                  render={({ field }) => (
                    <TextField {...field} label="Way Type" className="w-full" />
                  )}
                />
              </Stack>
              <Stack direction={"row"} gap={2} className="!mb-4">
                <Controller
                  control={control}
                  name="pickup_date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Pick-up Date" {...field} />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  control={control}
                  name="pickup_time"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker label="Pick-up Time" {...field} />
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
                      <DatePicker label="Drop-off Date" {...field} />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  control={control}
                  name="return_time"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker label="Drop-off Time" {...field} />
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
                    />
                  )}
                />
              </Stack>
              <Stack direction={"row"} className="!mb-4">
                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <TextField {...field} label="Amount" className="w-full" />
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
    </>
  );
}

export default AllRides;

import {
  Paper,
  Grid,
  Box,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDriver } from "../../api/services/driver";
import END_POINTS from "../../constants/endpoints";
import dayjs from "dayjs";

const SuccessChip = styled(Chip)`
  @apply !bg-green-500 !text-white;
`;

const Profile = () => {
  const params = useParams();
  const [driverDetail, setDriverDetail] = useState({
    bookingData: [],
    userDetail: {},
  });
  const { GET_USER_DRIVER } = END_POINTS;

  const fetchRides = async () => {
    const responseData = await getDriver(GET_USER_DRIVER, {
      params: {
        user_id: params.id,
      },
    });
    if (responseData) {
      setDriverDetail(responseData);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <Paper className="px-5 py-5 ">
    {Object.keys(driverDetail?.userDetail).length !== 0 ? (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box mt={2}>
            <Avatar
              src={driverDetail?.userDetail?.profile_img}
              className="!w-32 !h-32"
            />
            <Typography variant="h6" mt={2}>
              {driverDetail?.userDetail?.full_name}
            </Typography>
            <Typography variant="caption">
              Last sign in 4 minutes ago
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">
              {driverDetail?.userDetail?.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Phone
            </Typography>
            <Typography variant="body1">
              {driverDetail?.userDetail?.mobile_no}
            </Typography>
          </Box>
          <Paper className="px-5 py-5 mt-5">
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  D.O.B.
                </Typography>
                <Typography variant="body1">
                  {dayjs(driverDetail?.userDetail?.dob).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Address
                </Typography>
                <Typography variant="body1">
                  {`${driverDetail?.userDetail?.address}, ${driverDetail?.userDetail?.city}, ${driverDetail?.userDetail?.state}`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Experience
                </Typography>
                <Typography variant="body1">
                  {driverDetail?.userDetail?.experience}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  DL No.
                </Typography>
                <Typography variant="body1">
                  {driverDetail?.userDetail?.dl_no}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  DL Issue Date
                </Typography>
                <Typography variant="body1">
                  {dayjs(
                    driverDetail?.userDetail?.dl_issue_date
                  ).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  DL Expiry Date
                </Typography>
                <Typography variant="body1">
                  {dayjs(
                    driverDetail?.userDetail?.dl_expiry_date
                  ).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Vehicle Type
                </Typography>
                <Typography variant="body1">
                  {driverDetail?.userDetail?.vehicle_type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Vehicle Feature
                </Typography>
                <Typography variant="body1">
                  {driverDetail?.userDetail?.vehicle_feature}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} className="h-[calc(100vh-160px)] overflow-y-scroll">
          <Paper className="px-5 py-5">
            <Typography variant="h6" gutterBottom>
              All Rides
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Booking Id</TableCell>
                    <TableCell align="right">Pick up</TableCell>
                    <TableCell align="right">Drop off</TableCell>
                    <TableCell align="right">Way Type</TableCell>
                    <TableCell align="right">Booking Type</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {driverDetail?.bookingData[0]?.data?.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="right">{data?.bookingId}</TableCell>
                      <TableCell align="right">
                        {`${data?.bookings?.pickup_address}, ${data?.bookings?.pickup_city}, ${data?.bookings?.pickup_state}`}
                      </TableCell>
                      <TableCell align="right">
                        {data?.bookings?.return_address
                          ? `${data?.bookings?.return_address}, ${data?.bookings?.return_city}, ${data?.bookings?.return_state}`
                          : "N.A."}
                      </TableCell>
                      <TableCell align="right">
                        {data?.bookings?.way_type}
                      </TableCell>
                      <TableCell align="right">
                        {data?.bookings?.booking_type}
                      </TableCell>
                      <TableCell align="right">
                        {data?.bookings?.booking_status === "pending" ? (
                          <Chip
                            label="Pending"
                            className="!bg-orange-500 !text-white"
                          />
                        ) : data?.bookings?.booking_status === "success" ||
                          data?.bookings?.booking_status === "completed" ? (
                          <Chip
                            label={data?.bookings?.booking_status}
                            className="!bg-green-500 !text-white"
                          />
                        ) : (
                          <Chip
                            label={data?.bookings?.booking_status}
                            className="!bg-red-500 !text-white"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    ) : (
      <Box className="flex items-center justify-center h-full">
        <CircularProgress />
      </Box>
    )}
  </Paper>
  );
};

export default Profile;

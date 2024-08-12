import { Controller, useForm } from "react-hook-form";
import { Paper, Grid, TextField, Box, Avatar, Container, Typography, List, ListItem, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDriver } from "../../api/services/driver";
import END_POINTS from "../../constants/endpoints";
import dayjs from "dayjs";
const SuccessChip = styled(Chip)`
  @apply !bg-green-500 !text-white;
`;

const PendingChip = styled(Chip)`
  @apply bg-yellow-500 text-white;
`;

function Profile() {
  const params = useParams();
  const [driverDetail, setDriverDetail] = useState({
    bookingData: [],
    userDetail: {}
  })
  const { GET_USER_DRIVER } = END_POINTS;
  const fetchRides = async () => {
    const responseData = await getDriver(GET_USER_DRIVER, {
      params: {
        user_id: params.id
      }
    });
    console.log(responseData, 'responseData')
    if (responseData) {
      console.log(responseData, 'Response')
      setDriverDetail(responseData)
    }
  };
  useEffect(() => {
    fetchRides()
  }, [])
  return (
    <Paper className=" px-5 py-5 h-[calc(100vh-160px)]  overflow-y-hidden">
      {
        Object.keys(driverDetail?.userDetail).length !== 0
          ? <Grid container spacing={2}>
            <Grid item xs={4}>
              <Avatar src={driverDetail?.userDetail?.profile_img} className=" !w-32 !h-32" />
              <Box>
                <Typography variant="h6" component={'h1'}>
                  {driverDetail?.userDetail?.email}
                </Typography>
                <Typography variant="caption" component={'p'}>
                  Last sign in 4 minutes ago
                </Typography>
              </Box>
              {/* <List>
            <ListItem>

            </ListItem>
          </List> */}
            </Grid>
            <Grid item xs={8} className="h-[calc(100vh-160px)] overflow-y-scroll">
              <Paper className=" px-5 py-5">
                <Typography variant="h6" component="h1" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <label className=" mb-2 block">Full Name</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.full_name} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">D.O.B.</label>
                    <TextField className=" w-full" value={dayjs(driverDetail?.userDetail?.dob).format('DD-MM-YYYY')} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">Email</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.email} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">Phone</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.mobile_no} />
                  </Grid>
                  <Grid item xs={12}>
                    <label className=" mb-2 block">Address</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.address + ", " + driverDetail?.userDetail?.city + ", " + driverDetail?.userDetail?.state} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">Experience</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.experience} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">DL No.</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.dl_no} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">DL Issue Date</label>
                    <TextField className=" w-full" value={dayjs(driverDetail?.userDetail?.dl_issue_date).format('DD-MM-YYYY')} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">DL Expiry Date</label>
                    <TextField className=" w-full" value={dayjs(driverDetail?.userDetail?.dl_expiry_date).format('DD-MM-YYYY')} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">Vehicle Type</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.vehicle_type} />
                  </Grid>
                  <Grid item xs={6}>
                    <label className=" mb-2 block">Vehicle Feature</label>
                    <TextField className=" w-full" value={driverDetail?.userDetail?.vehicle_feature} />
                  </Grid>
                </Grid>
              </Paper>

              <Paper className=" px-5 py-5 mt-5">
                <Typography variant="h6" component="h1" gutterBottom>
                  All Rides
                </Typography>
                <TableContainer>
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
                        {
                          driverDetail?.bookingData[0]?.data?.map((data) => {
                            return (
                              <TableRow
                                // key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                {console.log(data, "Check Data Hain ?? 45454")}
                                <TableCell component="th" scope="row">
                                  1
                                </TableCell>
                                <TableCell align="right">{data?.bookingId}</TableCell>
                                <TableCell align="right">{data?.bookings?.pickup_address + "," + data?.bookings?.pickup_city + ", " + data?.bookings?.pickup_state}</TableCell>
                                <TableCell align="right">{data?.bookings?.return_address ? data?.bookings?.return_address + "," + data?.bookings?.return_city + ", " + data?.bookings?.return_state : 'N.A.'}</TableCell>
                                <TableCell align="right">{data?.bookings?.way_type}</TableCell>
                                <TableCell align="right">{data?.bookings?.booking_type}</TableCell>
                                <TableCell align="right">
                                  {/* <SuccessChip label="Success"/> */}
                                  {
                                    data?.bookings?.booking_status === "pending" ? <Chip label="Pending" className="!bg-orange-500 !text-white" /> : (data?.bookings?.booking_status === "success" || data?.bookings?.booking_status === "completed") ? <Chip label={data?.bookings?.booking_status} className="!bg-green-500 !text-white" /> : <Chip label={data?.bookings?.booking_status} className="!bg-red-500 !text-white" />
                                  }
                                </TableCell>
                              </TableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableContainer>
              </Paper>



              {/* <Paper className=" px-5 py-5 mt-5">
            <Typography variant="h6" component="h1" gutterBottom>
              All Transactions
            </Typography>
            <TableContainer>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No.</TableCell>
                      <TableCell align="right">Pick up</TableCell>
                      <TableCell align="right">Drop off</TableCell>
                      <TableCell align="right">Way Type</TableCell>
                      <TableCell align="right">Booking Type</TableCell>
                      <TableCell align="right">Payment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow
               
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">Kashmiri Gate</TableCell>
                      <TableCell align="right">Cannaught Place</TableCell>
                      <TableCell align="right">One Way</TableCell>
                      <TableCell align="right">Local</TableCell>
                      <TableCell align="right">
                     
                        <Chip label="Success" className="!bg-green-500 !text-white" />
                      </TableCell>
                    </TableRow>
                    <TableRow
                   
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">Kashmiri Gate</TableCell>
                      <TableCell align="right">Cannaught Place</TableCell>
                      <TableCell align="right">One Way</TableCell>
                      <TableCell align="right">Local</TableCell>
                      <TableCell align="right">
                        <Chip label="Success" className="!bg-green-500 !text-white" />
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">Kashmiri Gate</TableCell>
                      <TableCell align="right">Cannaught Place</TableCell>
                      <TableCell align="right">One Way</TableCell>
                      <TableCell align="right">Local</TableCell>
                      <TableCell align="right">
                        <Chip label="Success" className="!bg-green-500 !text-white" />
                      </TableCell>
                    </TableRow>
                    <TableRow
                
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">Kashmiri Gate</TableCell>
                      <TableCell align="right">Cannaught Place</TableCell>
                      <TableCell align="right">One Way</TableCell>
                      <TableCell align="right">Local</TableCell>
                      <TableCell align="right">
                      
                        <Chip label="Success" className="!bg-green-500 !text-white" />
                      </TableCell>
                    </TableRow>
                    <TableRow
        
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">Kashmiri Gate</TableCell>
                      <TableCell align="right">Cannaught Place</TableCell>
                      <TableCell align="right">One Way</TableCell>
                      <TableCell align="right">Local</TableCell>
                      <TableCell align="right">
                        <Chip label="Success" className="!bg-green-500 !text-white" />
                      </TableCell>
                    </TableRow>


                  </TableBody>
                </Table>
              </TableContainer>
            </TableContainer>
          </Paper> */}
            </Grid>
          </Grid> : <Box className="flex items-center justify-center h-full">
            <CircularProgress />
          </Box>
      }

    </Paper>
  );
}

export default Profile;

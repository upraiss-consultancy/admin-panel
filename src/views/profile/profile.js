import { Controller, useForm } from "react-hook-form";
import { Paper, Grid, TextField, Box, Avatar, Container, Typography, List, ListItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
const SuccessChip = styled(Chip)`
  @apply !bg-green-500 !text-white;
`;

const PendingChip = styled(Chip)`
  @apply bg-yellow-500 text-white;
`;

// const CancelChip = styled(Chip)`
//   @apply bg-red-500 text-white;
// `;
function Profile() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: ""
    }
  })
  return (
    <Paper className=" px-5 py-5 h-[calc(100vh-160px)]  overflow-y-hidden">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar src="https://mui.com/static/images/avatar/1.jpg" className=" !w-32 !h-32" />
          <Box>
            <Typography variant="h6" component={'h1'}>
              kanhaiya@gmail.com
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
                <Controller control={control} name="name" render={({ field }) => (
                  <>
                    <label className=" mb-2 block">Label</label>
                    <TextField className=" w-full" />
                  </>
                )} />
              </Grid>
              <Grid item xs={6}>
                <Controller control={control} name="name" render={({ field }) => (
                  <>
                    <label className=" mb-2 block">Label</label>
                    <TextField className=" w-full" />
                  </>
                )} />
              </Grid>
              <Grid item xs={6}>
                <Controller control={control} name="name" render={({ field }) => (
                  <>
                    <label className=" mb-2 block">Label</label>
                    <TextField className=" w-full" />
                  </>
                )} />
              </Grid>
              <Grid item xs={6}>
                <Controller control={control} name="name" render={({ field }) => (
                  <>
                    <label className=" mb-2 block">Label</label>
                    <TextField className=" w-full" />
                  </>
                )} />
              </Grid>
              <Grid item xs={6}>
                <Controller control={control} name="name" render={({ field }) => (
                  <>
                    <label className=" mb-2 block">Label</label>
                    <TextField className=" w-full" />
                  </>
                )} />
              </Grid>
              <Grid item xs={6}>
                <Controller control={control} name="name" render={({ field }) => (
                  <>
                    <label className=" mb-2 block">Label</label>
                    <TextField className=" w-full" />
                  </>
                )} />
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
                      <TableCell align="right">Pick up</TableCell>
                      <TableCell align="right">Drop off</TableCell>
                      <TableCell align="right">Way Type</TableCell>
                      <TableCell align="right">Booking Type</TableCell>
                      <TableCell align="right">Payment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>


                  </TableBody>
                </Table>
              </TableContainer>
            </TableContainer>
          </Paper>


          
          <Paper className=" px-5 py-5 mt-5">
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
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      // key={row.name}
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
                        {/* <SuccessChip label="Success"/> */}
                        <Chip label="Success" className="!bg-green-500 !text-white"/>
                      </TableCell>
                    </TableRow>
                    

                  </TableBody>
                </Table>
              </TableContainer>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;

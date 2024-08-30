import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
    TextField,
    Grid,
    TablePagination,
    Typography,
    Box,
    IconButton,
    Drawer,
    InputAdornment

} from '@mui/material';
import PaymentForm from './CreatePayment';
import END_POINTS from '../../constants/endpoints';
import { getPaymentRequestList, paymentRequestAction } from '../../api/services/payment';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import PhoneNumberDialog from './PhoneDialog';
const { PAYMENT_REQUEST_LIST, PAYMENT_ACTION } = END_POINTS;
const TransactionTable = ({ transactionData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paymentRequest, setPaymentRequest] = useState([]);
    const [metaData, setMetaData] = useState([]);
    const [driverData , setDeriverData] = useState({})
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset to the first page when search term changes
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page changes
    };

    // const filteredData = transactionData.filter(transaction =>
    //     transaction.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     transaction.amount.toString().includes(searchTerm)
    // );

    // const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleApprove = async (transactionId) => {
        // Handle approve action
        const response = await paymentRequestAction(PAYMENT_ACTION, {
            _id: transactionId,
            remarks: "565",
            status: "approved"
        })
        console.log(response, "transactionId  ")
    };

    const handleReject = async (transactionId) => {
        // Handle reject action
        const response = await paymentRequestAction(PAYMENT_ACTION, {
            _id: transactionId,
            remarks: "565",
            status: "cancel"
        })
        console.log('Rejected transaction ID:', response, transactionId);
    };
    const fetchPaymentRequests = async () => {
        const response = await getPaymentRequestList(PAYMENT_REQUEST_LIST, {
            params: {
                search: searchTerm,
                page: page,
                limit: rowsPerPage
            }
        });

        if (response) {
            setPaymentRequest(response?.data)
            setMetaData(response?.metadata)

        }
    }

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        // Handle the next button action
        //   console.log('Phone Number:', phoneNumber);
        setOpen(false); // Close the dialog
    };


    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };
    const getHandleDriverData = (data) => {
        setDeriverData(data)
    }
    useEffect(() => {
        fetchPaymentRequests()
    }, []);
    return (
        <>

            <Paper className="!pt-2 !pr-2">
                <Box className="flex gap-2 items-center  justify-between">
                    {/* <IconButton >
                    <KeyboardBackspaceIcon />
                </IconButton> */}
                    <Typography variant="h6" component="div" className=' pl-2'>
                        Payment History
                    </Typography>
                    <TextField placeholder="Search Ride..." sx={{
                        '& .MuiInputBase-root': {
                            height: 40,  // Set the height you need
                        },
                    }} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => {
                                    handleSearch()
                                }}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>

                        )
                    }} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        className="!bg-[#DD781E]">
                        Create Payment
                    </Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Transaction Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Request Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentRequest?.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>
                                        <Avatar src={transaction.user.profile_img} alt={transaction.user.full_name} />
                                    </TableCell>
                                    <TableCell>{transaction.user.full_name}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.transaction_type}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>{new Date(transaction.request_date).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleApprove(transaction._id)}
                                            sx={{ marginRight: 1 }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleReject(transaction._id)}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={metaData[0]?.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <PaymentForm driverData={driverData} toggleDrawer={toggleDrawer}/>
            </Drawer>
            <PhoneNumberDialog open={open} handleClose={handleClose} setOpen={setOpen} toggleDrawer={toggleDrawer} getHandleDriverData={getHandleDriverData}/>
        </>
    );
};

// Example usage with the provided data
const TransactionHistory = () => {

    return <TransactionTable />;
};

export default TransactionHistory;

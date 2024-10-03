import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Box, TextField, InputAdornment, IconButton, Avatar } from '@mui/material';
import { getTransactionHistoryList } from '../../api/services/payment';
import END_POINTS from '../../constants/endpoints';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const { TRANSACTION_HISTORY_LIST } = END_POINTS;

// Sample data for demonstration
const sampleData = [
    { user_name: 'Alice', wallet_address: '0x1234...', amount: 100, userId: '1', bookingId: '10', is_deleted: false, is_blocked: false, created_by: 'admin', updated_by: 'admin' },
    // Add more sample data as needed
];

const columns = [
    { id: 'user_name', label: 'Profile' },
    { id: 'user_name', label: 'User Name' },
    { id: 'transaction_type', label: 'Mobile No.' },
    { id: 'transaction_type', label: 'Transaction Type' },
    { id: 'transaction_type', label: 'Payment Method' },
    { id: 'amount', label: 'Amount' },
    { id: 'status', label: 'Status' },
];

const TransactionHistoryList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [params, setAllParams] = useState({
        search: "",
        limit: 10,
        page: 1,
        startDate: "",
        endDate: ''
    })

    const handleChangePage = (event, newPage) => {
        setAllParams(prevState => ({ ...prevState, limit: parseInt(event.target.value, 10), page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setAllParams(prevState => ({ ...prevState, limit: parseInt(event.target.value, 10), page: 0 }));
    };

    const fetchTransactionHistory = async () => {
        try {
            const response = await getTransactionHistoryList(TRANSACTION_HISTORY_LIST, {
                params: {
                    ...params
                }
            })
            setData(response?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchTransactionHistory()
    }, [params])

    return (
        <Paper style={{ padding: 16 }}>
            <Box className="flex justify-between items-start md:items-center flex-wrap gap-4 flex-col md:flex-row">
                <Typography variant="h6" gutterBottom>
                    Transaction History
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="From"
                        // value={fromDate}  
                        onChange={(newValue) =>  setAllParams(prevState => ({ ...prevState, startDate: newValue }))}   
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 40,  // Set the height you need
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{  '& .MuiInputBase-root': { height: 40 } }}
                            />
                        )}
                        
                    />
                </LocalizationProvider>

                {/* To Date Filter */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="To"
                        // value={toDate} 
                        onChange={(newValue) =>  setAllParams(prevState => ({ ...prevState,  endDate: newValue }))}  
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 40,  // Set the height you need
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{  '& .MuiInputBase-root': { height: 40 } }}
                            />
                        )}
                    />
                </LocalizationProvider>
                <TextField placeholder="Search Transaction..." sx={{
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
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => (

                            <TableRow key={index}>
                                {console.log(row?.user?.mobile_no, row,'NUMBER Hain ??')}
                                <TableCell>
                                    <Avatar src={row?.user?.profile_img} />
                                </TableCell>
                                <TableCell>
                                    {row?.user?.full_name}
                                </TableCell>
                                <TableCell>
                                    {row?.user?.mobile_no || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {row?.type || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {row?.transaction_type || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {row?.amount || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {row?.status || 'N/A'}
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.length}
                    rowsPerPage={params?.limit}
                    page={params?.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
};

export default TransactionHistoryList;

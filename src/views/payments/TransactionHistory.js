import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { getTransactionHistoryList } from '../../api/services/payment';
import END_POINTS from '../../constants/endpoints';
import SearchIcon from '@mui/icons-material/Search';
const { TRANSACTION_HISTORY_LIST } = END_POINTS;

// Sample data for demonstration
const sampleData = [
    { user_name: 'Alice', wallet_address: '0x1234...', amount: 100, userId: '1', bookingId: '10', is_deleted: false, is_blocked: false, created_by: 'admin', updated_by: 'admin' },
    // Add more sample data as needed
];

const columns = [
    { id: 'user_name', label: 'User Name' },
    { id: 'walletId', label: 'Wallet Address' },
    { id: 'amount', label: 'Amount' },
    { id: 'balance', label: 'Balance' },
    { id: 'userId', label: 'User ID' },
    { id: 'transaction_type', label: 'Transaction Type' },
    { id: 'created_by', label: 'Created By' },
    { id: 'updated_by', label: 'Updated By' },
    { id: 'status', label: 'Status' },
];

const TransactionHistoryList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('')
    const [params, setAllParams] = useState({
        search: ""
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
    }, [])

    return (
        <Paper style={{ padding: 16 }}>
            <Box className="flex justify-between items-center">
                <Typography variant="h6" gutterBottom>
                    Transaction History
                </Typography>
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
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <>
                                        {
                                            column.id === 'user_name' ? <TableCell>
                                                {row['user']?.full_name}
                                            </TableCell> : <TableCell key={column.id}>{row[column.id]?.toString() || 'N/A'}</TableCell>
                                        }

                                    </>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
};

export default TransactionHistoryList;

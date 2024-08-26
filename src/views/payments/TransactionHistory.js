import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Box } from '@mui/material';
import { getTransactionHistoryList } from '../../api/services/payment';
import END_POINTS from '../../constants/endpoints';
const { TRANSACTION_HISTORY_LIST } = END_POINTS;

// Sample data for demonstration
const sampleData = [
    { user_name: 'Alice', wallet_address: '0x1234...', amount: 100, userId: '1', bookingId: '10', is_deleted: false, is_blocked: false, created_by: 'admin', updated_by: 'admin' },
    // Add more sample data as needed
];

const columns = [
    { id: 'user_name', label: 'User Name' },
    { id: 'wallet_address', label: 'Wallet Address' },
    { id: 'amount', label: 'Amount' },
    { id: 'userId', label: 'User ID' },
    { id: 'bookingId', label: 'Booking ID' },
    { id: 'is_deleted', label: 'Is Deleted' },
    { id: 'is_blocked', label: 'Is Blocked' },
    { id: 'created_by', label: 'Created By' },
    { id: 'updated_by', label: 'Updated By' },
];

const TransactionHistoryList = () => {
    const [data, setData] = useState(sampleData);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        // Fetch data from API or database here and update state
        // For demonstration, we're using static data
        // setData(fetchedData);
    }, []);

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

                }
            })
        } catch (error) {

        }
    }

    useEffect(() => {

    }, [])

    return (
        <Paper style={{ padding: 16 }}>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Transaction History
                </Typography>
            
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
                                    <TableCell key={column.id}>{row[column.id]?.toString() || 'N/A'}</TableCell>
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

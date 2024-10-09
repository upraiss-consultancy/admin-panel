import React, { useState, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Invoice from '../../components/invoice/pdfGenerator';
import { generatePDF } from '../../components/invoice/pdfGenerator';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
    gstNo: yup
        .string(),
});
const BillToPopup = ({ rowData }) => {
    const [open, setOpen] = useState(false);
    const { handleSubmit, control, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const invoiceRef = useRef();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        setOpenConfirmation(true);
        handleClose(); // Close the popup after submission
    };

    const handleCloseConfirmation = () => {
        generatePDF(invoiceRef)
        setOpenConfirmation(false);
        reset()
    };
    const formData = watch();
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Bill To
            </Button>
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <Invoice ref={invoiceRef} data={rowData} billToData={formData} />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bill To</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Address"
                                    fullWidth
                                    variant="outlined"
                                    required
                                    error={!!errors.address}
                                    helperText={errors.address ? errors.address.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name="gstNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="GST No"
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.gstNo}
                                    helperText={errors.gstNo ? errors.gstNo.message : ''}
                                />
                            )}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}  variant='outlined'>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openConfirmation} onClose={handleCloseConfirmation} maxWidth="sm" fullWidth>
                <DialogTitle>Confirm Details</DialogTitle>
                <DialogContent>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Address:</strong> {formData.address}</p>
                    <p><strong>GST No:</strong> {formData.gstNo}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BillToPopup;

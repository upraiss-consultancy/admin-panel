import React, { useState } from "react";
import {
    Drawer,
    Button,
    TextField,
    Typography,
    Box,
    Grid,
    MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import END_POINTS from "../../constants/endpoints";
import { UpdateFare } from "../../api/services/ride";
import showToast from "../../utils/toast";
const { UPDATE_FARE } =
    END_POINTS;

const validationSchema = yup.object().shape({
    payment_status: yup.string().required("Payment Status is required"),
    payment_mode: yup.string().required("Payment Mode is required"),
    payment_mode_remark: yup.string().nullable(),
    comment: yup.string().nullable(),
    amount: yup.number().required("Amount is required").min(0, "Must be 0 or more"),
    paidAmount: yup.number().required("Paid Amount is required").min(0, "Must be 0 or more"),
    pendingAmount: yup.number().required("Pending Amount is required").min(0, "Must be 0 or more"),
});

const PaymentFormDrawer = ({ open, setOpen, bookingId }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            payment_status: "",
            payment_mode: "",
            payment_mode_remark: null,
            comment: null,
            amount: 0,
            paidAmount: 0,
            pendingAmount: 0,
        },
    });

    const onSubmit = async (data) => {
        let transformedData = {
            ...data,
            bookingId: bookingId
        }
        const response = await UpdateFare(UPDATE_FARE, transformedData)
        if (response?.responseCode === 200) {
            showToast(response?.message, 'success')
            reset()
            setOpen(false);
        } else {
            showToast('Something went wrong', 'error');
        }
    };

    return (
        <>
            <Drawer anchor="right" open={open} onClose={() => { reset(); setOpen(false); }}>
                <Box sx={{ maxWidth: 550, padding: 3, width: '100%' }} className="!pt-20">
                    <Typography variant="h6" gutterBottom>
                        Payment Form
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} pt={2}>
                            <Grid item xs={6}>
                                <Controller
                                    name="payment_status"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Payment Status"
                                            fullWidth
                                            error={!!errors.payment_status}
                                            helperText={errors.payment_status?.message}
                                        >
                                            <MenuItem value="Recived">Received</MenuItem>
                                            <MenuItem value="Not Recived">Not Received</MenuItem>
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Failed">Failed</MenuItem>
                                            <MenuItem value="Partially Paid">Partially Paid</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            {
                                watch('payment_status') === "Recived" && (
                                    <Grid item xs={6}>

                                        <Controller
                                            name="payment_status"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    label="Received From"
                                                    fullWidth
                                                    error={!!errors.payment_status}
                                                    helperText={errors.payment_status?.message}
                                                >
                                                    <MenuItem value="Recived">Company</MenuItem>
                                                    <MenuItem value="Not Recived">Driver</MenuItem>
                                                </TextField>
                                            )}
                                        />
                                    </Grid>
                                )}{

                                watch('payment_status') === "Not Recived" && (
                                    <Grid item xs={6}>

                                        <Controller
                                            name="payment_status"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    label="Received To"
                                                    fullWidth
                                                    error={!!errors.payment_status}
                                                    helperText={errors.payment_status?.message}
                                                >
                                                    <MenuItem value="Recived">Company</MenuItem>
                                                    <MenuItem value="Not Recived">Driver</MenuItem>
                                                </TextField>
                                            )}
                                        />
                                    </Grid>
                                )
                            }

                            <Grid item xs={6}>
                                <Controller
                                    name="payment_mode"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Payment Mode"
                                            fullWidth
                                            error={!!errors.payment_mode}
                                            helperText={errors.payment_mode?.message}
                                        >
                                            <MenuItem value="Online">Online</MenuItem>
                                            <MenuItem value="Cash">Cash</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>



                            {/* <Grid item xs={12}>
                                <Controller
                                    name="comment"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Comment"
                                            fullWidth
                                            error={!!errors.comment}
                                            helperText={errors.comment?.message}
                                        />
                                    )}
                                />
                            </Grid> */}

                            <Grid item xs={6}>
                                <Controller
                                    name="amount"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Amount"
                                            type="number"
                                            fullWidth
                                            error={!!errors.amount}
                                            helperText={errors.amount?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="paidAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Paid Amount"
                                            type="number"
                                            fullWidth
                                            error={!!errors.paidAmount}
                                            helperText={errors.paidAmount?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="pendingAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Pending Amount"
                                            type="number"
                                            fullWidth
                                            error={!!errors.pendingAmount}
                                            helperText={errors.pendingAmount?.message}
                                        />
                                    )}
                                />
                            </Grid>

                        </Grid>
                        <Grid item xs={12} pt={2}>
                            <Controller
                                name="payment_mode_remark"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Payment Mode Remark"
                                        fullWidth
                                        error={!!errors.payment_mode_remark}
                                        helperText={errors.payment_mode_remark?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Box mt={3}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Drawer>
        </>
    );
};

export default PaymentFormDrawer;

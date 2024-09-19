import React, { useEffect, useMemo, useState } from "react";
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
    paidAmount: yup.number().required("Paid Amount is required").min(0, "Must be 0 or more"),
    pendingAmount: yup.number().required("Pending Amount is required").min(0, "Must be 0 or more"),
});

const PaymentFormDrawer = ({ open, setOpen, bookingId, fareData }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            payment_status: "",
            payment_mode: "",
            payment_mode_remark: null,
            comment: null,
            paidAmount: 0,
            pendingAmount: 0,
        },
    });
    const [disableInput, setDisableInput] = useState({
        totalAmountInput: false,
        paidInput: false,
        pendingAmountInput: false
    })
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
    const handleChange = (value) => {
        switch (value) {
            case "Recived":
                setDisableInput(prevState => ({ ...prevState, totalAmountInput: true, paidInput: true, pendingAmountInput: true }));
                setValue('paidAmount', fareData?.paidAmount?.toFixed(2))
                setValue('pendingAmount', fareData?.pendingAmount?.toFixed(2))
                break;
            case "Not Recived":
                setDisableInput(prevState => ({ ...prevState, totalAmountInput: true, paidInput: true, pendingAmountInput: true }));
                setValue('paidAmount', fareData?.paidAmount?.toFixed(2))
                setValue('pendingAmount', fareData?.pendingAmount?.toFixed(2))
                break;
            case "Partially Paid":
                setDisableInput(prevState => ({ ...prevState, totalAmountInput: true, paidInput: false, pendingAmountInput: true }));
                setValue('paidAmount', fareData?.paidAmount?.toFixed(2))
                setValue('pendingAmount', fareData?.pendingAmount?.toFixed(2))
                break;
        }
    }

    const handlePaidAmountChange = (value) => {
        if (value <= fareData?.amount) {
            let pendingAmount = fareData?.amount - value;
            setValue('pendingAmount', pendingAmount);
        } else {
            showToast('Please write correct amount', 'error')
        }
    }
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
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                                handleChange(e.target.value)
                                            }}
                                            select
                                            label="Payment Status"
                                            fullWidth
                                            error={!!errors.payment_status}
                                            helperText={errors.payment_status?.message}
                                        >
                                            <MenuItem value="Recived">Received</MenuItem>
                                            <MenuItem value="Not Recived">Not Received</MenuItem>
                                            <MenuItem value="Partially Paid">Partially Paid</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>


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
                            <Grid item xs={6}>

                                <TextField
                                    value={fareData?.amount?.toFixed(2)}
                                    label="Amount"
                                    type="number"
                                    fullWidth
                                    error={!!errors.amount}
                                    helperText={errors.amount?.message}
                                    disabled={disableInput?.totalAmountInput}
                                />

                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="paidAmount"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChange={(e) => {
                                                if (fareData?.amount >= e.target.value) {
                                                    onChange(e.target.value);
                                                    handlePaidAmountChange(e.target.value)
                                                }
                                            }}
                                            label="Paid Amount"
                                            type="number"
                                            fullWidth
                                            error={!!errors.paidAmount}
                                            helperText={errors.paidAmount?.message}
                                            disabled={disableInput?.paidInput}
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
                                            disabled={disableInput?.pendingAmountInput}
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

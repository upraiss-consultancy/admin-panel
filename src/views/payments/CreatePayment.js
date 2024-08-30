import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import END_POINTS from '../../constants/endpoints';
import { createPayment } from '../../api/services/payment';
import * as Yup from 'yup';
import showToast from '../../utils/toast';
const { CREATE_PAYMENT_BY_ADMIN } = END_POINTS;

const validationSchema = Yup.object().shape({
  userId: Yup.string(),
  amount: Yup.number()
    .required('Payment Amount is required')
    .min(0, 'Amount should be greater than 0'),
  paymentType: Yup.string().required('Payment Type is required'),
  paymentMethod: Yup.string().required('Payment Method is required'),
  decription: Yup.string()
    .required('Payment Description is required')
    .min(10, 'Description should be at least 10 characters long'),
  mobileNumber: Yup.string()
    .required('Phone number is required')
});

const PaymentForm = ({ driverData, toggleDrawer }) => {
  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  console.log(getValues(), errors, 'ERRORS')
  const onSubmit = async (data) => {
    console.log(data, 'Submitted Data');
    try {
      const response = await createPayment(CREATE_PAYMENT_BY_ADMIN, data);
      if (response?.responseCode === 200) {
        reset()
        showToast(response?.message, 'success')
        toggleDrawer(false);
      }
      // Handle success here, e.g., show a success message or redirect
    } catch (error) {
      showToast('Error creating payment', 'errors')
      // Handle error here, e.g., show an error message
    }
  };

  useEffect(() => {
    if (driverData) {
      setValue('mobileNumber', driverData?.mobile_no);
      setValue('userId', driverData?._id);
    }
  }, [driverData, setValue]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '80px' }}>
      <Typography variant="h5" align="left" gutterBottom>
        Payment Request Form
      </Typography>

      {/* Use the form element and attach handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Driver Name"
              fullWidth
              value={driverData?.full_name}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          {/* Payment Amount */}
          <Grid item xs={12}>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Payment Amount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors?.amount}
                  helperText={errors?.amount?.message}
                />
              )}
            />
          </Grid>

          {/* Payment Type */}
          <Grid item xs={12}>
            <Controller
              name="paymentType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Payment Type"
                  select
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors?.paymentType}
                  helperText={errors?.paymentType?.message}
                >
                  <MenuItem value="credit">Credit</MenuItem>
                  <MenuItem value="debit">Debit</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="paymentMethod"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Payment Method"
                  select
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors?.paymentMethod}
                  helperText={errors?.paymentMethod?.message}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Cheque">Cheque</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Payment Description */}
          <Grid item xs={12}>
            <Controller
              name="decription"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Payment Description"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  error={!!errors?.decription}
                  helperText={errors?.decription?.message}
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth className="!bg-[#DD781E]">
              Raise Payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PaymentForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  driverName: Yup.string().required('Driver name is required'),
  amount: Yup.number()
    .required('Payment Amount is required')
    .min(0, 'Amount should be greater than 0'),
  paymentType: Yup.string().required('Payment Type is required'),
  paymentMethod: Yup.string().required('Payment Method is required'),
  description: Yup.string()
    .required('Payment Description is required')
    .min(10, 'Description should be at least 10 characters long'),
});
const PaymentForm = ({ driver }) => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Handle the form submission, e.g., sending data to your backend
    console.log('Payment Request Data:', data);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '80px' }}>
      <Typography variant="h5" align="left" gutterBottom>
        Payment Request Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Driver's Name */}
          <Grid item xs={12}>
            <Controller
              name="driverName"
              control={control}
              //   defaultValue={driver.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Driver Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors?.driverName}
                  helperText={errors?.driverName?.message}
                />
              )}
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
                  <MenuItem value="Credit">Credit</MenuItem>
                  <MenuItem value="Debit">Debit</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="paymentType"
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
              name="description"
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
                  error={!!errors?.description}
                  helperText={errors?.description?.message}
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

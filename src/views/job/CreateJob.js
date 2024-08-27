import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Slider, Select, InputLabel, FormControl, Box, Typography, IconButton, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { createJob } from '../../api/services/job';
import END_POINTS from '../../constants/endpoints';
import showToast from '../../utils/toast';
import * as yup from 'yup';
import { State, City } from 'country-state-city';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const schema = yup.object().shape({
  _id: yup.string()
    .nullable()
    .notRequired(),
  title: yup.string().required('Title is required'),
  pay_from: yup.number().required('Pay from is required').min(0, 'Must be greater than or equal to 0'),
  pay_to: yup.number().required('Pay to is required').min(yup.ref('pay_from'), 'Pay to must be greater than Pay from'),
  duration: yup.string().required('Duration are required'),
  location: yup.string().required('Address is required'),
  working_hours: yup.string().required('Working hours are required'),
  job_type: yup.string().required('Job type is required'),
  shift: yup.string().required('Shift is required'),
  car_name: yup.string().required('Car name is required'),
  car_type: yup.string().required('Car type is required'),
  description: yup.string().required('Description is required'),
  area: yup.string().required('Area is required'),
  experience: yup.string().required('Experience is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required')
});

const { CREATE_JOB } = END_POINTS;

export default function JobForm({ setOpen, updateJobData }) {
  const { control, handleSubmit, formState: { errors }, reset, watch, getValues, } = useForm({
    resolver: yupResolver(schema),
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const onSubmit = async (data) => {
    const response = await createJob(CREATE_JOB, data);
    if (response?.responseCode === 200) {
      reset();
      showToast(response?.message, 'success');
      setOpen(false)
    }
  };

  const stateValue = watch('state');

  useEffect(() => {
    const stateData = State.getStatesOfCountry('IN');
    setStates(stateData);
  }, []);

  useEffect(() => {
    if (stateValue) {
      const cityData = City.getCitiesOfState('IN', stateValue);
      setCities(cityData);
    } else {
      setCities([]);
    }
  }, [stateValue]);
  const handleUpdate = () => {
    reset({
      _id: updateJobData?._id,
      title: updateJobData?.title,
      pay_from: updateJobData?.pay_from,
      pay_to: updateJobData?.pay_to,
      duration: updateJobData?.duration,
      job_type: updateJobData?.job_type,
      shift: updateJobData?.shift,
      car_name: updateJobData?.car_name,
      car_type: updateJobData?.car_type,
      description: updateJobData?.description,
      area: updateJobData?.area,
      experience: updateJobData?.experience,
      job_type: updateJobData?.job_type,
      working_hours: updateJobData?.working_hours
    })
  }
  useEffect(() => {
    if (Object.keys(updateJobData).length > 0) {
      handleUpdate()
    }
  }, [updateJobData, reset]);
  return (
    <Box className="!px-2">
      <Box className="flex gap-2 items-center">
        <IconButton onClick={() => setOpen(false)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Create Job
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>

          {/* Title */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Job Type */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="job_type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.job_type}>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    {...field}

                    label="Job Type"
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Shift */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="shift"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.shift}>
                  <InputLabel>Shift</InputLabel>
                  <Select
                    {...field}
                    label="Shift"
                  >
                    <MenuItem value="Day Shift">Day Shift</MenuItem>
                    <MenuItem value="Night Shift">Night Shift</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="working_hours"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Working Hours"
                  error={!!errors.working_hours}
                  helperText={errors.working_hours ? errors.working_hours.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duration"
                  error={!!errors.duration}
                  helperText={errors.duration ? errors.duration.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Pay From */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="pay_from"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pay From"
                  type="number"
                  error={!!errors.pay_from}
                  helperText={errors.pay_from ? errors.pay_from.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Pay To */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="pay_to"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pay To"
                  type="number"
                  error={!!errors.pay_to}
                  helperText={errors.pay_to ? errors.pay_to.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Pay Type */}
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duration"
                  error={!!errors.pay_type}
                  helperText={errors.pay_type ? errors.pay_type.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid> */}

          {/* Working Hours */}


          {/* Job Details */}
          {/* <Grid item xs={12}>
            <Controller
              name="job_details"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Details"
                  error={!!errors.job_details}
                  helperText={errors.job_details ? errors.job_details.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid> */}

          {/* Description */}
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel shrink>Description</InputLabel>
                  <CKEditor
                    editor={ClassicEditor}
                    data={field.value || ''}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      field.onChange(data);
                    }}
                    onBlur={(event, editor) => {
                      field.onBlur();
                    }}
                  />
                  {errors.description && (
                    <p style={{ color: 'red', fontSize: '12px' }}>
                      {errors.description.message}
                    </p>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Experience */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <>
                  <Typography gutterBottom>Experience (years)</Typography>
                  <Slider
                    {...field}
                    value={field.value || 0} // Default value
                    onChange={(_, value) => field.onChange(value)}
                    aria-labelledby="experience-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                  />
                  {errors.experience && (
                    <Typography color="error" variant="caption">
                      {errors.experience.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          {/* License */}
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="license"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="License"
                  error={!!errors.license}
                  helperText={errors.license ? errors.license.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid> */}

          {/* Car Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="car_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Car Name"
                  error={!!errors.car_name}
                  helperText={errors.car_name ? errors.car_name.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Car Type */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="car_type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Car Type</InputLabel>
                  <Select
                    {...field}
                    error={!!errors.car_type}
                    label="Car Type"
                  >
                    <MenuItem value="Automatic">Automatic</MenuItem>
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Location - State */}
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select label="State" {...field} error={!!errors.location?.state}>
                    {states.map((state) => (
                      <MenuItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Location - City */}
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select label="City" {...field}>
                    {cities.map((city) => (
                      <MenuItem key={city.name} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Area"
                  error={!!errors.car_name}
                  helperText={errors.car_name ? errors.car_name.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Location - Address */}
          <Grid item xs={12}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  error={!!errors.location?.address}
                  helperText={errors.location?.address ? errors.location.address.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {Object.keys(updateJobData).length > 0 ? 'Update' : 'Submit'}
            </Button>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
}

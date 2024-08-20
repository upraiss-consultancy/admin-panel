import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    _id: Yup.mixed().nullable(), // ID can be null or a string (if provided)
    
    title: Yup.string()
      .required('Title is required')
      .max(50, 'Title must be at most 50 characters'),
  
    pay_from: Yup.number()
      .required('Minimum pay is required')
      .min(0, 'Minimum pay must be at least 0'),
  
    pay_to: Yup.number()
      .required('Maximum pay is required')
      .min(Yup.ref('pay_from'), 'Maximum pay must be greater than or equal to minimum pay'),
  
    job_details: Yup.string()
      .required('Job details are required')
      .max(100, 'Job details must be at most 100 characters'),
  
    // location: Yup.array().of(
    //   Yup.object().shape({
    //     city: Yup.string().required('City is required'),
    //     state: Yup.string().required('State is required'),
    //     address: Yup.string().required('Address is required'),
    //   })
    // ).required('Location is required').min(1, 'At least one location is required'),
  
    working_hours: Yup.array().of(
      Yup.string().required('Working hours are required')
    ).required('Working hours are required').min(1, 'At least one working hour is required'),
  
    job_type: Yup.array().of(
      Yup.string().oneOf(['Full Time', 'Part Time'], 'Invalid job type')
    ).required('Job type is required').min(1, 'At least one job type is required'),
  
    shift: Yup.array().of(
      Yup.string().oneOf(['Day Shift', 'Night Shift'], 'Invalid shift type')
    ).required('Shift is required').min(1, 'At least one shift is required'),
  
    car_name: Yup.array().of(
      Yup.string().required('Car name is required')
    ).required('Car name is required').min(1, 'At least one car name is required'),
  
    car_type: Yup.array().of(
      Yup.string().oneOf(['Manual', 'Automatic'], 'Invalid car type')
    ).required('Car type is required').min(1, 'At least one car type is required'),
  
    description: Yup.array().of(
      Yup.string().required('Description is required')
    ).required('Description is required').min(1, 'At least one description is required'),
  
    pay_type: Yup.array().of(
      Yup.string().required('Pay type is required')
    ).required('Pay type is required').min(1, 'At least one pay type is required'),
  
    experience: Yup.array().of(
      Yup.string().required('Experience is required')
    ).required('Experience is required').min(1, 'At least one experience is required'),
  
    license: Yup.array().of(
      Yup.string().required('License is required')
    ).required('License is required').min(1, 'At least one license is required'),
  });
  
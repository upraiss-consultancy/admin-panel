import * as Yup from 'yup';

export const CreateRideSchema =  Yup.object().shape({
    area_type: Yup.string().required('Area type is required'),
    way_type: Yup.string().required('Way type is required'),
    pass_name: Yup.string().required('Passenger name is required'),
    pass_mobile_no: Yup.string().required('Passenger mobile number  is required'),
    pickup_time: Yup.string().required('Pick-up time is required'),
    return_time: Yup.string().required('Return time is required'),
    pickup_date: Yup.string().required('Pick-up date is required'),
    return_date: Yup.string().required('Return date is required'),
    pickup_address: Yup.string().required('Pick-up address is required'),
    pickup_state: Yup.string().required('Pick-up state is required'),
    pickup_city: Yup.string().required('Pick-up city is required'),
    pickup_pin: Yup.string().required('Pick-up pin is required'),
    return_address: Yup.string().required('Return address is required'),
    return_state: Yup.string().required('Return state is required'),
    return_city: Yup.string().required('Return city is required'),
    return_pin: Yup.string().required('Return pin is required'),
    amount: Yup.number().required('Return amount is required')
})


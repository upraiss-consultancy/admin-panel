import * as Yup from 'yup';

export const CreateRideSchema = Yup.object().shape({
    booking_type: Yup.string().required('Area type is required'),
    car_type: Yup.string().required("Car Type is required"),
    way_type: Yup.string().required('Way type is required'),
    pass_name: Yup.string().required('Passenger name is required'),
    pass_mobile_no: Yup.string().required('Passenger mobile number  is required'),
    pickup_time: Yup.string().required('Pick-up time is required'),
    return_time: Yup.string().when('way_type', {
        is: 'One Way',
        then: () => Yup.string().required('Return time is required'),
    }),
    payment_type: Yup.string().required('Payment type is required'),
    alreadypaid_amount: Yup.string().when('payment_type', {
        is: (payment_type) => payment_type === 'Partially Paid' || payment_type === 'Prepaid',
        then: () => Yup.string().required('Payment amount is required'),
    }),
    pickup_date: Yup.string().required('Pick-up date is required'),
    return_date: Yup.string().when('way_type', {
        is: 'One Way',
        then: () => Yup.string().required('Return date is required'),
    }),
    pickup_address: Yup.string().required('Pick-up address is required'),
    pickup_state: Yup.string().required('Pick-up state is required'),
    pickup_city: Yup.string().required('Pick-up city is required'),
    pickup_pin: Yup.string().required('Pick-up pin is required'),
    return_address: Yup.string().when('way_type', {
        is: 'One Way',
        then: () => Yup.string().required('Return address is required')
    }),
    return_state: Yup.string().when('way_type', {
        is: 'One Way',
        then: () => Yup.string().required('Return state is required')
    }),
    return_city: Yup.string().when('way_type', {
        is: 'One Way',
        then: () =>
            Yup.string().required('Return city is required'),
    }),
    return_pin: Yup.string().when('way_type', {
        is: 'One Way',
        then: () =>
            Yup.string().required('Return pin is required'),
    }),
    package_id: Yup.string().required('Please select package'),
    pass_whatsapp_no: Yup.string().required('Passenger whatsapp number  is required'),
    email: Yup.string(),
    travel_allowance: Yup.number().required('Travel allowance is required.'),
    decrement_percentage: Yup.number(),
    increment_percentage: Yup.number(),
    days_package: Yup.number(),
    total_price: Yup.number()
})


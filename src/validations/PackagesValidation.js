import * as Yup from 'yup';

export const CreatePackageSchema = Yup.object().shape({
    package_name: Yup.string().required("Package name is required"),
    booking_type: Yup.string().required("Package type is required"),
    car_type: Yup.string().required("Car type is required"),
    trip_type: Yup.string().required("Car type is required"),
    pickup_state: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && booking_type === 'Local',
        then: () => Yup.string().required('Pick-Up State is required')
    }),
    pickup_city: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && booking_type === 'Local',
        then: () => Yup.string().required('Pick-Up City is required')
    }),
    dropoff_state: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && booking_type === 'Local',
        then: () => Yup.string().required('Drop off state is required')
    }),
    dropoff_city: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && booking_type === 'Local',
        then: () => Yup.string().required('Drop off city is required')
    }),
    hours_package: Yup.number().required('Hours Package is required'),
    days_package: Yup.number().required('Days Package is required'),
    min_distance: Yup.number().required('Minimum Distance is required'),
    max_distance: Yup.number().required('Max Distance is required'),
    time: Yup.string().required('Time is required'),
    driver_charge: Yup.number().required('Driver Charge is required'),
    travelling_charge: Yup.number(),
    extra_charge: Yup.number(),
    convience_charge: Yup.number(),
    gst: Yup.number().required('GST is required.'),
    total: Yup.string(),
})
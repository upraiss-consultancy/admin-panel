import * as Yup from 'yup';

export const CreatePackageSchema = Yup.object().shape({
    package_name: Yup.string().required("Package name is required"),
    booking_type: Yup.string().required("Package type is required"),
    car_type: Yup.string().required("Car type is required"),
    trip_type: Yup.string().required("Car type is required"),
    pickup_state: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && (booking_type === 'Local' || booking_type === "Outstation"),
        then: () => Yup.string().required('Pick-Up State is required')
    }),
    pickup_city: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && (booking_type === 'Local' || booking_type === "Outstation"),
        then: () => Yup.string().required('Pick-Up City is required')
    }),
    dropoff_state: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && (booking_type === 'Local' || booking_type === "Outstation"),
        then: () => Yup.string().required('Drop off state is required')
    }),
    dropoff_city: Yup.string().when(['trip_type', 'booking_type'], {
        is: (trip_type, booking_type) => trip_type === 'One Way' && (booking_type === 'Local' || booking_type === "Outstation"),
        then: () => Yup.string().required('Drop off city is required')
    }),
    hours_package: Yup.number(),
    days_package: Yup.number(),
    max_distance: Yup.number(),
    driver_charge: Yup.number().required('Driver Charge is required'),
    extra_charge: Yup.number(),
    convience_charge: Yup.number(),
    company_charge: Yup.number(),
    basic_total: Yup.number(),
    gst: Yup.number().required('GST is required.'),
    total: Yup.string(),
})
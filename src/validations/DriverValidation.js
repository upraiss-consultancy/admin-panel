import * as Yup from 'yup';

export const CreateDriverSchema = Yup.object().shape({
    mobile_no: Yup.string().required('Mobile number is required'),
    full_name: Yup.string().required("Name is required"),
    dob: Yup.date().required("D.O.B is required"),
    email: Yup.string().required("Email id is required"),
    adhar_no: Yup.string().required("Aadhar number is required"),
    pan_no: Yup.string(),
    dl_no: Yup.string().required("Driving license number is required"),
    dl_issue_date: Yup.string().required("Driving license issue date is required"),
    dl_expiry_date: Yup.string().required("Driving license expiry date is required"),
    profile_img: Yup.string(),
    vehicle_type: Yup.string().required("Vehicle type is required"),
    vehicle_feature: Yup.string().required("Vehicle feature is required"),
    adhar_verified: Yup.boolean(),
    age: Yup.number().required("Age is required"),
    address: Yup.string().required('Address is required'),
    pin_code:Yup.string().required('Pincode is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
})
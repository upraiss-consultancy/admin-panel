import * as Yup from 'yup';

export const AdminRegisterSchema = Yup.object().shape({
    full_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile_no: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
    password: Yup.string().required('Password is required').min(8, "Password must be at least 8 characters"),
    address: Yup.string().required('Address is required'),
    department: Yup.string().oneOf(['Sales' , 'Manager']).required('Department is required')
});

export const AdminLoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required').min(4, "Password must be at least 8 characters")
});

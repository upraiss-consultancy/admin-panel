import * as Yup from 'yup';

export const CreatePackageSchema = Yup.object().shape({
    package_name: Yup.string().required("Package name is required"),
    package_type: Yup.string().required("Package type is required"),
    driver_charge: Yup.number().required("Driver charge is required"),
    night_charge: Yup.number(),
    kilometer: Yup.number().required('Kilometer is required'),
    hours: Yup.string(),
    days: Yup.string(),
    extra_charge_kilometer: Yup.number(),
    extra_charge: Yup.number(),
    gst: Yup.number(),
    basic_price: Yup.number(),
    total_price: Yup.number(),
    way_type: Yup.string(),
    range: Yup.string()
})
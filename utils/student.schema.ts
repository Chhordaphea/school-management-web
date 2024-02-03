import * as Yup from "yup";
export const studentSchema = Yup.object()
.shape({
    fullname: Yup.string().required("Full name is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").notRequired(),
})

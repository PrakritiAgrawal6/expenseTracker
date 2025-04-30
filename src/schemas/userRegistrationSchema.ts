import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Enter minimum 3 characters")
    .max(30, "Max 30 characters allowed")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "atleast 6")
    .max(13, "max 13 character")
    .required("Required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  sapId: Yup.string()
    .matches(/^\d{8}$/, "SAP ID must be 8 digits")
    .required("SAP ID is required"),
});

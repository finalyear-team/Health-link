import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  DOB: Yup.date().required("*Date of Birth is required").nullable(),
  gender: Yup.string().oneOf(['male', 'female']).required('*Gender is required'),
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .max(20, "*Password must be at most 20 characters")
    .required("*Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
  email: Yup.string().email("Invalid email").required("*Email is required!"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "*Passwords must match")
    .required("*Confirm Password is required!"),
  address: Yup.string().required("*Address is required"),
  phone: Yup.string()
  .matches(
    /^\+251[79]\d{8}$|^(07|09)\d{8}$/,
    "*Invalid Ethiopian phone number"
  )
  .required("*Phone number is required"),
  profilePicture: Yup.mixed().required("Profile picture is required"),
  specialization: Yup.string().required("Specialization is required"),
  consultationFee: Yup.number()
    .typeError("Consultation fee must be a number")
    .required("Consultation fee is required"),
  education: Yup.string().required("Education information is required"),
  license: Yup.string().matches(/^\d{10}$/, "License number must be 10 digits").required("License number is required"),
  experiance: Yup.number()
    .typeError("Experience must be a number")
    .positive("Experience must be a positive number")
    .integer("Experience must be a whole number")
    .required("Experience is required")
});

export default validationSchema;

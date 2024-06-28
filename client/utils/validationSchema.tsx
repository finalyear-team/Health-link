import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const validationSchemaAddInfo = Yup.object().shape({
  consultationFee: Yup.number()
    .typeError("Consultation fee must be a number")
    .required("Consultation fee is required")
    .positive("Consultation fee must be a positive amount"),
  license: Yup.string()
    .matches(/^\d{10}$/, "License number must be 10 digits")
    .required("License number is required"),
  experiance: Yup.number()
    .typeError("Experience must be a number")
    .positive("Experience must be a positive number")
    .integer("Experience must be a whole number")
    .max(50, "Experience cannot be more than 50 years")
    .required("Experience is required"),
  agreedToTerms: Yup.boolean()
    .required("You must agree to the terms and conditions")
    .test(
      "agreed",
      "You must agree to the terms and conditions",
      (value) => value === true
    ),
  graduationYear: Yup.number()
    .typeError("Graduation year must be a number")
    .min(1900, "Graduation year cannot be earlier than 1900")
    .max(currentYear, `Graduation year cannot be later than ${currentYear}`)
    .required("Graduation year is required"),
  institution: Yup.string().required("Institution is required"),
});

export const validationSchemaContInfo = Yup.object().shape({
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .max(20, "*Password must be at most 20 characters")
    .required("*Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
  email: Yup.string().email("Invalid email").required("*Email is required!"),
  address: Yup.string().required("*Address is required"),
  phone: Yup.string()
    .matches(
      /^\+251[79]\d{8}$|^(07|09)\d{8}$/,
      "*Invalid Ethiopian phone number"
    )
    .required("*Phone number is required"),
});

export const validationSchemaPersInfo = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  userName: Yup.string().required("*User Name is required"),
  DOB: Yup.date()
    .required("*Date of Birth is required")
    .nullable()
    .test("DOB", "You must be at least 18 years old", function (value) {
      if (!value) return false; // if value is not defined
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();

      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  gender: Yup.string()
    .oneOf(["male", "female"])
    .required("*Gender is required"),
});

export const codeValidation = Yup.object().shape({
  code: Yup.string()
    .matches(/^[0-9]{6,6}$/, "Must be a 6-digit number")
    .required("This field is required"),
});

export const validationSchemaAgreeToTerms: any = Yup.object().shape({
  // profilePicture: Yup.mixed().required("Profile picture is required"),
  agreedToTerms: Yup.boolean()
    .required("You must agree to the terms and conditions")
    .test(
      "agreed",
      "You must agree to the terms and conditions",
      (value) => value === true
    ),
});

export const validatePersEditInfo: any = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  userName: Yup.string().required("*User Name is required"),
});

export const validateContEditInfo: any = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("*Email is required!"),
  address: Yup.string().required("*Address is required"),
  phone: Yup.string()
    .matches(
      /^\+251[79]\d{8}$|^(07|09)\d{8}$/,
      "*Invalid Ethiopian phone number"
    )
    .required("*Phone number is required"),
});

export const validatePassEditInfo: any = Yup.object().shape({
  previousPassword: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .max(20, "*Password must be at most 20 characters")
    .required("*Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
  newPassword: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .max(20, "*Password must be at most 20 characters")
    .required("*Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "*Passwords must match")
    .required("*Confirm Password is required!"),
});

export const validateAppointmentBooking: any = Yup.object().shape({
  date: Yup.date().required("Required"),
  time: Yup.string()
    .matches(/^([0-9]{2}):([0-9]{2}) (AM|PM)$/, "Invalid time format")
    .required("Required"),
  reason: Yup.string().required("Required"),
});

export const validatePaymentInformation: any = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  email: Yup.string().email("Invalid email").required("*Email is required!"),
  phone: Yup.string()
    .matches(
      /^\+251[79]\d{8}$|^(07|09)\d{8}$/,
      "*Invalid Ethiopian phone number"
    )
    .required("*Phone number is required"),
});

export const validateSetAvailability: any = Yup.object().shape({
  startTime: Yup.string()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format")
    .required("Start time is required"),
  endTime: Yup.string()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format")
    .required("End time is required")
    .test("is-after", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      return startTime < value;
    }),
  weekday: Yup.array()
    .of(
      Yup.string().oneOf([
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ])
    )
    .min(1, "Select at least one weekday")
    .required("Weekdays are required"),
});

export const validateCertificateInputs: any = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  description: Yup.string().max(
    200,
    "Description must be less than 200 characters"
  ),
  certificateId: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{5,20}$/,
      "Certificate ID must be 5-20 alphanumeric characters"
    )
    .required("Certificate ID is required"),

  issueDate: Yup.date()
    .required("Certificate issue date is required")
    .max(new Date(), "Issue date cannot be in the future"),
});

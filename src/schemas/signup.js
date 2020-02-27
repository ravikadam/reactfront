import * as Yup from 'yup'

export const reginitValues = {
  mobile: '',
  otp: '',
  isAdmin: false
}

export const regAdminInitValues = {
  mobile: '',
  otp: '',
  isAdmin: true
}

export const validationSchemaMobile = Yup.object().shape({
  mobile: Yup.string('Enter Mobile Number')
    .required('Mobile Number is required')
    .matches(/^\d{10}$/, {
      message: 'Please enter a Mobile Number of 10 digits',
      excludeEmptyString: false
    })
})

export const validationSchemaOTP = Yup.object().shape({
  otp: Yup.string('Enter OTP')
    .required('OTP is required')
    .matches(/^\d{6}$/, {
      message: 'Please enter OTP having 6 digits',
      excludeEmptyString: false
    })
})

export const validationSchemaPwd = Yup.object().shape({
  email: Yup.string('Enter a parent email').email('Enter a valid email'),
  parentName: Yup.string("Enter the parent's name"),
  name: Yup.string("Enter the kid's name"),
  password: Yup.string('Pick your password').required('Password is required'),
  confirmPassword: Yup.string('Confirm your password').oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  grade: Yup.string("Select the kid's grade")
    .required("Kid's Grade is required")
    .notOneOf(['0', 0], "Kid's Grade is required")
})

export const validationSchema = Yup.object().shape({
  email: Yup.string('Enter a parent email')
    .required('Email is required')
    .email('Enter a valid email'),
  parentName: Yup.string("Enter the parent's name").required(
    "Parent's name is required"
  ),
  name: Yup.string("Enter the kid's name").required("Kid's name is required"),
  mobile: Yup.string('Enter Mobile Number')
    .required('Mobile Number is required')
    .matches(/^\d{10}$/, {
      message: 'Please enter a Mobile Number of 10 digits',
      excludeEmptyString: false
    }),
  grade: Yup.string("Select the kid's grade")
    .required("Kid's Grade is required")
    .notOneOf(['0', 0], "Kid's Grade is required")
})

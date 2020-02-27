import * as Yup from 'yup'

export const initValues = {
  mobile: '',
  password: ''
}

export const validationSchema = Yup.object().shape({
  mobile: Yup.string('Enter Mobile Number')
    .required('Mobile Number is required')
    .matches(/^\d{10}$/, {
      message: 'Please enter a Mobile Number of 10 digits',
      excludeEmptyString: false
    }),
  password: Yup.string('Enter the password').required('This field is required.')
})

import * as Yup from 'yup'
export const validationSchemaEndSession = Yup.object().shape({
  otp: Yup.string('Enter Comment').required('Comment is required')
})

export const initValues = {
  comment: ''
}

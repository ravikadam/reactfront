import React from 'react'
import Button from '@material-ui/core/Button'
import FormTextField from './FormTextField'
import FormSelectField from './FormSelectField'
import { withStyles } from '@material-ui/core/styles'
import Grades from '../../constants/Grades'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  dense: {
    marginTop: 19
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: 'white',
    fontWeight: 'bold'
  }
})

const DetailsForm = props => {
  const {
    values,
    errors,
    touched,
    classes,
    handleSubmit,
    handleChange,
    setFieldTouched,
    setFieldValue,
    reduxIsSubmitting,
    submitCount,
    loggedInUser,
    isValid
  } = props

  const change = (name, flgBlur, e) => {
    e.persist()
    handleChange(e)
    flgBlur && trimValuesOnBlur(name, e)
    setFieldTouched(name, true, false)
  }

  const trimValuesOnBlur = (name, e) => {
    setFieldValue(name, e.target.value.trim(), true)
  }

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      {false && !loggedInUser.socialId && (
        <FormTextField
          label='Pick Your Password'
          id='password'
          onChange={change}
          errors={errors}
          required={true}
          type='password'
          touched={touched}
          values={values}
        />
      )}
      {false && !loggedInUser.socialId && (
        <FormTextField
          label='Confirm Password'
          id='confirmPassword'
          onChange={change}
          errors={errors}
          required={true}
          type='password'
          touched={touched}
          values={values}
        />
      )}
      {!loggedInUser.grade && (
        <FormSelectField
          label="Student's Grade"
          id='grade'
          onChange={change}
          errors={errors}
          touched={touched}
          options={Grades}
          values={values}
        />
      )}
      {!loggedInUser.grade && (
        <FormTextField
          label="Student's Name"
          id='name'
          onChange={change}
          errors={errors}
          required={true}
          touched={touched}
          values={values}
        />
      )}
      {!loggedInUser.grade && (
        <FormTextField
          label='Your Name'
          id='parentName'
          onChange={change}
          errors={errors}
          required={true}
          touched={touched}
          submitCount={submitCount}
          values={values}
        />
      )}
      {!loggedInUser.grade && (
        <FormTextField
          label='Your Email ID'
          id='email'
          onChange={change}
          errors={errors}
          required={true}
          touched={touched}
          submitCount={submitCount}
          values={values}
        />
      )}
      {!loggedInUser.grade && !loggedInUser.mobile && (
        <FormTextField
          label='Your Phone Number'
          id='mobile'
          onChange={change}
          errors={errors}
          required={true}
          touched={touched}
          submitCount={submitCount}
          values={values}
        />
      )}
      <Button
        type='submit'
        color='secondary'
        margin='normal'
        variant='contained'
        disabled={reduxIsSubmitting || !isValid}
        className={classes.submit}
      >
        Let's Go
      </Button>
    </form>
  )
}

export default withStyles(styles)(DetailsForm)

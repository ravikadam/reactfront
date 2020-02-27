import React from 'react'
import Button from '@material-ui/core/Button'
import FormTextField from './FormTextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '80%'
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

const LoginForm = props => {
  const {
    values,
    errors,
    touched,
    classes,
    handleSubmit,
    handleChange,
    setFieldTouched,
    reduxIsSubmitting,
    submitCount
  } = props

  const change = (name, flgBlur, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate='novalidate'
      className={classes.container}
    >
      <FormTextField
        label='Phone Number'
        id='mobile'
        onChange={change}
        errors={errors}
        touched={touched}
        required={true}
        submitCount={submitCount}
        values={values}
      />
      <FormTextField
        type='password'
        label='Password'
        id='password'
        onChange={change}
        required={true}
        errors={errors}
        touched={touched}
        submitCount={submitCount}
        values={values}
      />
      <Button
        type='submit'
        color='primary'
        margin='normal'
        variant='contained'
        className={classes.submit}
        disabled={reduxIsSubmitting}
      >
        SIGN IN
      </Button>
    </form>
  )
}

export default withStyles(styles)(LoginForm)

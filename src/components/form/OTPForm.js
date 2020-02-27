import React from 'react'
import Button from '@material-ui/core/Button'
import FormTextField from './FormTextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  signinfb: {
    marginTop: 38,
    backgroundColor: '#3b5998',
    color: '#FFFFFF',
    textTransform: 'none'
  },
  signing: {
    marginTop: 38,
    backgroundColor: '#dd4b39',
    color: '#FFFFFF',
    textTransform: 'none'
  },
  signinli: {
    marginTop: 38,
    backgroundColor: '#007bb6',
    color: '#FFFFFF',
    textTransform: 'none'
  },
  dense: {
    marginTop: '19px!important'
  },
  dense2: {
    marginTop: '9px!important',
    height: 1
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: 'white',
    fontWeight: 'bold'
  },
  fblg: {
    width: '20px'
  }
})

const OTPForm = props => {
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
      <FormTextField
        label='OTP'
        id='otp'
        onChange={change}
        errors={errors}
        required={true}
        touched={touched}
        type='password'
        submitCount={submitCount}
        values={values}
      />
      <Button
        type='submit'
        color='secondary'
        margin='normal'
        variant='contained'
        disabled={reduxIsSubmitting || !isValid}
        className={classes.submit}
      >
        Verify
      </Button>
      <div className={classes.dense2}>&nbsp;</div>
    </form>
  )
}

export default withStyles(styles)(OTPForm)

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

const SignUpForm = props => {
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
    changingPassword,
    isAdmin,
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
      <input type='hidden' value={isAdmin} />
      <FormTextField
        label='Phone Number'
        id='mobile'
        onChange={change}
        errors={errors}
        required={true}
        touched={touched}
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
        {!changingPassword && <span>Sign Up</span>}
        {changingPassword && <span>Submit</span>}
      </Button>
      <div className={classes.dense2}>&nbsp;</div>
    </form>
  )
}

export default withStyles(styles)(SignUpForm)

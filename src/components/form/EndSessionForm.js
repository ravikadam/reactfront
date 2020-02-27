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

const EndSessionForm = props => {
  const {
    values,
    errors,
    touched,
    classes,
    handleSubmit,
    handleChange,
    setFieldTouched,
    setFieldValue,
    isValid,
    isTrial
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
        label='Session Comment'
        id='comment'
        onChange={change}
        errors={errors}
        required={true}
        touched={touched}
        values={values}
      />

      <Button
        type='submit'
        color='secondary'
        margin='normal'
        variant='contained'
        disabled={!isValid}
        className={classes.submit}
      >
        Submit
      </Button>
    </form>
  )
}

export default withStyles(styles)(EndSessionForm)

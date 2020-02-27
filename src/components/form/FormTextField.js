import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  textField: {}
})

const FormTextField = props => {
  const {
    id,
    label,
    touched,
    errors,
    onChange,
    classes,
    type,
    values,
    required = false
  } = props

  return (
    <TextField
      type={type}
      required={required}
      name={id}
      id={id}
      label={label}
      helperText={touched[id] ? errors[id] : ''}
      error={touched[id] && Boolean(errors[id])}
      onChange={onChange.bind(null, id, false)}
      onBlur={onChange.bind(null, id, true)}
      value={values[id]}
      margin='normal'
      className={classes.textField}
    />
  )
}

export default withStyles(styles)(FormTextField)

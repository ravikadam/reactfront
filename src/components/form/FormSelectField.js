import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  textField: {}
})

const FormSelectField = props => {
  const {
    id,
    label,
    touched,
    errors,
    onChange,
    classes,
    options,
    values
  } = props

  return (
    <TextField
      select
      required
      name={id}
      id={id}
      value={values[id]}
      label={label}
      helperText={touched[id] ? errors[id] : ''}
      error={touched[id] && Boolean(errors[id])}
      onChange={onChange.bind(null, id, false)}
      margin='normal'
      className={classes.textField}
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu
        }
      }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  )
}

export default withStyles(styles)(FormSelectField)

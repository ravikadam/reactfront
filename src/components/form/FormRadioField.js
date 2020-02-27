import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
  textField: {},
  groupLabel: {
    flexWrap: 'wrap',
    display: 'flex'
  },
  group: {
    flexDirection: 'row',
    display: 'flex'
  }
})

const FormRadioField = props => {
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
    <FormControl
      component='fieldset'
      className={classes.textField}
      margin='normal'
    >
      <FormLabel component='legend' className={classes.groupLabel} required>
        {label}
      </FormLabel>
      <RadioGroup
        name={id}
        id={id}
        className={classes.group}
        required
        helperText={touched[id] ? errors[id] : ''}
        onChange={onChange.bind(null, id, false)}
        value={values[id]}
      >
        {options.map(option => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default withStyles(styles)(FormRadioField)

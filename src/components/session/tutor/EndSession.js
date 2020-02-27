import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import { Formik } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import EndSessionForm from '../../form/EndSessionForm'
import {
  validationSchemaEndSession,
  initValues
} from '../../../schemas/session'
const styles = theme => ({
  headline: {
    fontFamily: 'Fjalla One'
  },
  root: {
    flexGrow: 1
  },
  cancel: {
    color: 'red',
    backgroundColor: 'white'
  },
  confirm: {
    color: 'white'
  },
  dense: {
    marginTop: 19
  },
  paper: {
    height: 40,
    width: 200
  },
  button: {
    marginTop: 5
  },
  slot_container: {
    margin: 10
  },
  selected_date: {
    width: '95%'
  }
})

class EndSessionComponent extends Component {
  componentDidMount() {}

  render() {
    const {
      classes,
      onClose,
      selectedDate,
      selectedTime,
      open,
      onSubmit,
      ...other
    } = this.props

    const handleSubmit = values => {
      //const finValues = trimInputs(values)
      //setValues(finValues, false)
      //handleSubmit(values)
      console.log(values)
    }
    return (
      <div>
        <Dialog
          aria-labelledby='simple-dialog-title'
          {...other}
          fullWidth={true}
          open={open}
        >
          <DialogContent>
            <Formik
              render={props => {
                return <EndSessionForm {...props} />
              }}
              onSubmit={onSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(EndSessionComponent)

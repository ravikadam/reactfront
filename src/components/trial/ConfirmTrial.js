import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { byFormat } from '../../helpers/dateHelper'

import Dialog from '@material-ui/core/Dialog'
import { formatDate } from '../../helpers/utils'
const displayFormat = 'hh:mm A'
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

class ConfirmTrialComponent extends Component {
  componentDidMount() {
    window.mixpanel.track('Trial Confirmation Loaded')
    window.fbq('track', 'trial confirmation requested')
  }

  render() {
    const {
      classes,
      onClose,
      selectedDate,
      selectedTime,
      ...other
    } = this.props

    return (
      <div>
        <Dialog
          aria-labelledby='simple-dialog-title'
          {...other}
          fullWidth={true}
        >
          <DialogContent>
            <Grid
              container
              className={classes.root}
              spacing={16}
              direction='column'
              alignItems='center'
              alignContent='center'
            >
              <Grid item>
                <Typography variant='h6' className={classes.headline}>
                  You have selected
                </Typography>
              </Grid>
              <Grid item className={classes.selected_date}>
                <Typography align='center' variant='h6' color='secondary'>
                  {formatDate(selectedDate)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography align='center' variant='h6' color='primary'>
                  {byFormat(selectedTime.start_date, displayFormat)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography align='center' style={{ fontSize: '17px' }}>
                  Trial slot can't be rescheduled after booking.
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions align='center'>
            <Grid
              container
              className={classes.root}
              spacing={16}
              direction='row'
              alignItems='center'
              justify='center'
            >
              <Grid item>
                <Button
                  className={classes.cancel}
                  variant='contained'
                  onClick={() => onClose('cancel')}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.confirm}
                  variant='contained'
                  color='primary'
                  onClick={() => onClose('confirm')}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ConfirmTrialComponent)

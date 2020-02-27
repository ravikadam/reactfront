// Global
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import FailedTrialBookingComponent from '../components/trial/FailedTrialBooking'
import SuccessTrialComponent from '../components/trial/SuccessTrialBooking'
import Topbar from '../components/common/Topbar'
import { getMenu } from '../helpers/utils'
import {
  getSelectedTrialDateSlot,
  getSelectedTrialTimeSlot,
  getTrialBookingStatus
} from '../reducers'
import { connect } from 'react-redux'
const backgroundShape = require('../images/shape.svg')

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      marginTop: `${theme.spacing.unit * 2}px`
    }
  },
  grid: {
    margin: `0 ${theme.spacing.unit}px`
  },
  innerTop: {
    maxWidth: '1100px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    backgroundColor: theme.palette.background.paper
  }
})

const TrialBookingComplete = props => {
  const { classes, selectedDate, selectedTime, bookingStatus } = props
  const setupSession = () => {
    let path = `/setup`
    props.history.push(path)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar menuItems={getMenu(true)} />
      <div align='center' className={classes.root}>
        <div align='left' className={classes.innerTop}>
          <Grid
            container
            spacing={0}
            direction='row'
            justify='center'
            alignItems='center'
          >
            {bookingStatus === 'SUCCESS' ? (
              <Grid item xs={12} md={4}>
                <SuccessTrialComponent
                  classes={classes}
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                  setupSession={setupSession}
                />
              </Grid>
            ) : (
              ''
            )}
            {bookingStatus === 'FAILURE' ? (
              <Grid item xs={4}>
                <FailedTrialBookingComponent
                  classes={classes}
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                />
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedDate: getSelectedTrialDateSlot(state),
    selectedTime: getSelectedTrialTimeSlot(state),
    bookingStatus: getTrialBookingStatus(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(TrialBookingComplete)))

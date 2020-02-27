import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { formatDate, helpDeskNumber } from '../../helpers/utils'
import { byFormat } from '../../helpers/dateHelper'
import { getLoggedInUser } from '../../reducers'

const displayFormat = 'hh:mm A'
const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingRight: 19,
    paddingLeft: 19
  },
  grid: {},
  button: {
    marginTop: 5,
    color: '#33CAFF'
  },
  schedule_description: {
    margin: 10
  },
  selected_date: {
    width: '95%'
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  primary: {
    color: theme.palette.primary.main
  },
  innerTop: {},
  paper: {},
  lineHeight: {
    lineHeight: '22pt'
  },
  text: {
    paddingTop: 19,
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: '17pt',
    fontFamily: 'Fjalla One',
    fontWeight: '600'
  }
})

class TrialBookingConfirmationComponent extends Component {
  componentDidMount() {
    window.mixpanel.track('Trial Booked')
    window.fbq('track', 'class scheduled')
  }

  render() {
    const { classes, selectedDate, selectedTime, loggedInUser } = this.props

    return (
      <div>
        <Paper>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <Grid
            container
            className={classes.root}
            spacing={16}
            direction='column'
            alignItems='center'
          >
            <Grid item>
              <Typography className={classes.text}>
                Congratulations{' '}
                <span className={classes.secondary}>
                  {loggedInUser.parentName}
                </span>
                !!!
              </Typography>
            </Grid>

            <Grid item className={classes.schedule_description}>
              <Typography
                className={classes.lineHeight}
                variant='h6'
                align='center'
              >
                Your session is scheduled from{' '}
                <span className={classes.primary}>
                  {byFormat(selectedTime.start_date, displayFormat)}
                </span>{' '}
                on{' '}
                <span className={classes.secondary}>
                  {formatDate(selectedDate)}{' '}
                </span>
              </Typography>
              <Typography>&nbsp;</Typography>
              <Typography variant='body1' align='center'>
                We have sent you details of how to join the class at the
                scheduled time on &nbsp;
                <span className={classes.primary}>
                  <b>{loggedInUser.email}</b>
                </span>
              </Typography>
              <Typography>&nbsp;</Typography>
              <Typography variant='body1' align='center'>
                Call us at &nbsp;
                <span className={classes.secondary}>
                  <b>{helpDeskNumber}</b>
                </span>{' '}
                for any help required.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' align='center'>
                Please remember trial session cannot be re-scheduled.
              </Typography>
            </Grid>
          </Grid>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </Paper>
      </div>
    )
  }
}

TrialBookingConfirmationComponent.propTypes = {
  loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: getLoggedInUser(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(TrialBookingConfirmationComponent)))

import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import UpcomingSession from '../../components/panes/UpcomingSession'
import CreditsPane from '../../components/panes/CreditsPane'
import RefundPane from '../../components/panes/RefundPane'
import MiniSchedule from '../../components/panes/MiniScheduler'
import { connect } from 'react-redux'
import { getMenu } from '../../helpers/utils'
import {
  getTotalTrialCredits,
  getTotalPaidCredits,
  studentByBookingId,
  slotByBookingId,
  tutorByBookingId,
  isNextBooking,
  getBookingIds,
  getNextBookingId,
  isScheduleLoading,
  isMiniSchedularToggle,
  sessionDetailsByBookingId,
  actvitiesByBookingIdAndType,
  miniSchedularActivityTab,
  sessionByBookingId
} from '../../reducers'
import {
  trialCredits,
  paidCredits,
  bookings,
  miniSchedular,
  startSession
} from '../../actions'
import Topbar from '../../components/common/Topbar'

const backgroundShape = require('../../images/shape.svg')
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    background: `url(${backgroundShape}) no-repeat`,
    overflow: 'hidden',
    backgroundSize: 'cover'
  },
  gap: {
    height: 16
  },
  grid: {
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  innerTop: {
    maxWidth: '1100px'
  },
  item: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'inherit'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'inherit'
    }
  }
})

class TutorDashbaord extends Component {
  componentDidMount() {
    this.getBookings()
  }

  getBookings() {
    const { getBookings } = this.props
    getBookings()
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={getMenu(false, true)} />
        <div align='center' className={classes.root}>
          <div align='left' className={classes.innerTop}>
            <Grid container justify='center'>
              <Grid
                spacing={24}
                alignItems='center'
                justify='center'
                container
                className={classes.grid}
              >
                <Grid className={classes.item} item xs={12} md={4}>
                  <UpcomingSession {...this.props} />
                </Grid>
                <Grid className={classes.item} item xs={12} md={4}>
                  <CreditsPane {...this.props} />
                </Grid>
                <Grid className={classes.item} item xs={12} md={4}>
                  <RefundPane {...this.props} />
                </Grid>
              </Grid>
              <Grid
                spacing={24}
                alignItems='center'
                justify='center'
                container
                className={classes.grid}
              >
                <Grid className={classes.item} item xs={12} md={12}>
                  <MiniSchedule {...this.props} />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

TutorDashbaord.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    tutorByBookingId: tutorByBookingId(state),
    sessionDetailsByBookingId: sessionDetailsByBookingId(state),
    totalTrialCredits: getTotalTrialCredits(state),
    totalPaidCredits: getTotalPaidCredits(state),
    getUserDetailsById: studentByBookingId(state),
    getBookingIds: getBookingIds(state),
    getSlotDetailsById: slotByBookingId(state),
    isNextBooking: isNextBooking(state),
    nextBookingId: getNextBookingId(state),
    isScheduleLoading: isScheduleLoading(state),
    isMiniSchedularToggle: isMiniSchedularToggle(state),
    dessionDetailsByBookingId: sessionDetailsByBookingId(state),
    actvitiesByBookingIdAndType: actvitiesByBookingIdAndType(state),
    miniSchedularActivityTab: miniSchedularActivityTab(state),
    sessionByBookingId: sessionByBookingId(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTrialCredits: data => {
      dispatch(trialCredits.request(data))
    },
    getPaidCredits: data => {
      dispatch(paidCredits.request(data))
    },
    getBookings: data => {
      dispatch(bookings.request({ limit: 10 }))
    },
    toggleMiniSchedular: data => {
      dispatch(miniSchedular.toggle(data))
    },
    activityTabSwitch: data => {
      dispatch(miniSchedular.actvityTabSwitch(data))
    },
    startSession: id => {
      dispatch(startSession.request({ id: id }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(TutorDashbaord)))

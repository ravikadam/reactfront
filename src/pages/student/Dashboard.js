import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import SessionContentPane from '../../components/panes/SessionContentPane'
import UpcomingSession from '../../components/panes/UpcomingSession'
import HalfPane from '../../components/panes/HalfPane'
import MiniSchedule from '../../components/panes/MiniScheduler'
import { getMenu } from '../../helpers/utils'
import {
  getTotalPaidCredits,
  tutorByBookingId,
  slotByBookingId,
  isNextBooking,
  getBookingIds,
  getNextBookingId,
  isScheduleLoading,
  isMiniSchedularToggle,
  actvitiesByBookingIdAndType,
  miniSchedularActivityTab,
  getAllMasterSessions,
  isMasterSessionLoading,
  getActiveSessionIndex,
  getLoggedInUser,
  getTotalStars,
  sessionDetailsByBookingId,
  sessionByBookingId
} from '../../reducers'
import {
  sessionMaster,
  paidCredits,
  bookings,
  miniSchedular,
  sessionContent,
  totalStar,
  startSession
} from '../../actions'

import Topbar from '../../components/common/Topbar'
const backgroundShape = require('../../images/shape.svg')

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.grey['100'],
    background: `url(${backgroundShape}) no-repeat`
  },
  innerTop: {
    maxWidth: '1100px'
  },
  gap: {
    height: 16
  },
  grid: {
    margin: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  item: {
    height: 'inherit',
    [theme.breakpoints.down('sm')]: {
      height: 'inherit'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'inherit'
    }
  }
})

class StudentDashboard extends Component {
  componentDidMount() {
    this.getBookings()
    this.getMasterSessions()
    this.getTotalStars()
    this.getTotalCredits()
  }

  getBookings() {
    const { getBookings } = this.props
    getBookings()
  }

  getMasterSessions() {
    const { sendRequestForMasterSession } = this.props
    sendRequestForMasterSession()
  }

  getTotalStars() {
    const { getTotalStars } = this.props
    getTotalStars()
  }

  getTotalCredits() {
    const { getPaidCredits } = this.props
    getPaidCredits()
  }

  render() {
    const {
      classes,
      loggedInUser,
      totalPaidCredits,
      totalStars,
      ...rest
    } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={getMenu(loggedInUser.course.status !== 'PAID')} />
        <div align='center' className={classes.root}>
          <div align='left' className={classes.innerTop}>
            <div>
              <Grid container justify='center'>
                <Grid
                  spacing={24}
                  alignItems='center'
                  justify='center'
                  container
                  className={classes.grid}
                >
                  <Grid item xs={12} md={12} container spacing={16}>
                    <Grid className={classes.item} item xs={12} md={6}>
                      <UpcomingSession {...rest} />
                    </Grid>
                    <Grid className={classes.item} item xs={12} md={6}>
                      <HalfPane
                        title='Sessions'
                        value={totalPaidCredits}
                        href='https://www.instamojo.com/purpletutor'
                        target='_blank'
                        buttonText='Buy Sessions'
                      />
                      <div className={classes.gap}>&nbsp;</div>
                      <HalfPane
                        title='Rewards (Stars Collected)'
                        value={totalStars}
                        buttonText='Redeem'
                        disabled={true}
                      />
                    </Grid>
                    {/*                 <Grid className={classes.item} item xs={12} md={12}>
                      <SessionContentPane {...rest} />
                    </Grid> */}
                    <Grid className={classes.item} item xs={12} md={12}>
                      <MiniSchedule hidePhone={true} {...rest} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    tutorByBookingId: tutorByBookingId(state),
    sessionDetailsByBookingId: sessionDetailsByBookingId(state),
    totalPaidCredits: getTotalPaidCredits(state),
    getUserDetailsById: tutorByBookingId(state),
    getBookingIds: getBookingIds(state),
    getSlotDetailsById: slotByBookingId(state),
    isNextBooking: isNextBooking(state),
    nextBookingId: getNextBookingId(state),
    isScheduleLoading: isScheduleLoading(state),
    isMiniSchedularToggle: isMiniSchedularToggle(state),
    sessionByBookingId: sessionByBookingId(state),
    actvitiesByBookingIdAndType: actvitiesByBookingIdAndType(state),
    miniSchedularActivityTab: miniSchedularActivityTab(state),
    getAllMasterSessions: getAllMasterSessions(state),
    isMasterSessionLoading: isMasterSessionLoading(state),
    activeSessionIndex: getActiveSessionIndex(state),
    totalStars: getTotalStars(state),
    loggedInUser: getLoggedInUser(state)
  }
}

StudentDashboard.propTypes = {
  loggedInUser: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
    sendRequestForMasterSession: data => {
      dispatch(sessionMaster.request(data))
    },
    selectSessionIndex: ind => {
      dispatch(sessionContent.activeSession(ind))
    },
    getTotalStars: ind => {
      dispatch(totalStar.request())
    },
    startSession: id => {
      dispatch(startSession.request({ id: id }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(StudentDashboard)))

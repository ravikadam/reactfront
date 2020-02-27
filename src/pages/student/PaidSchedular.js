import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Topbar from '../../components/common/Topbar'
import Typography from '@material-ui/core/Typography'
import TutorList from '../../components/schedular/TutorList'
import { withSnackbar } from 'notistack'
import { getMenu } from '../../helpers/utils'

import {
  slots,
  slotsSave,
  errorMessage,
  slotMenu,
  slotsCopy,
  latestBookedTutor,
  topAvailableTutors,
  studentBookedSlots,
  tutorSlots,
  bookings,
  nextSession,
  createBooking,
  cancelBooking
} from '../../actions'
import {
  isSlotsFetched,
  getAllSlotsforDay,
  isSlotBooked,
  isSlotClosed,
  isSlotOpen,
  getSlotStartDate,
  getSlotEndDate,
  getSlotCurrentWeek,
  countBookedSlotsByWeek,
  openAllSlotsForDay,
  isSlotDisabled,
  getCommonErrorMessage,
  getSlotMenuAnchorElem,
  getSlotsByDateRange,
  getAllTutorList,
  isTutorSelected,
  getNextSessionMasterId,
  isBookingProcessing,
  getBookingIdBySlot,
  getSessionIdBySlot
} from '../../reducers'
import DateRangeSlot from '../../components/slots/DateRangeSlot'

const backgroundShape = require('../../images/shape.svg')

const styles = theme => ({
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  block: {},
  outlinedButton: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit * 2
  },
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  outerTop: {
    backgroundColor: theme.palette.grey['100'],
    flexGrow: 1,
    overflow: 'hidden',
    backgroundSize: 'cover',
    background: `url(${backgroundShape}) no-repeat`
  },
  innerTop: {
    maxWidth: '1100px'
  },
  heading: {
    fontFamily: 'Fjalla One',
    letterSpacing: '0.05rem',
    fontSize: '1.2rem',
    lineHeight: 1,
    paddingBottom: 0,
    paddingTop: 5,
    color: theme.palette.secondary.main
  },
  itemGrid: {
    [theme.breakpoints.up('xs')]: {
      paddingTop: '12px!important',
      paddingBottom: '0px!important'
    }
  }
})

class PaidSchedular extends Component {
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const {
      getLastBookedTutor,
      getTutorByAvailability,
      getBookings,
      getNextSession
    } = this.props
    getLastBookedTutor()
    getTutorByAvailability()
    getBookings()
    getNextSession()
  }

  render() {
    const {
      classes,
      isSlotsFetched,
      getSlots,
      errorMessage,
      enqueueSnackbar,
      resetErrorMessage,
      width,
      getPaidSlotsForTutor,
      isTutorSelected,
      tutorList,
      ...rest
    } = this.props

    const onSlotClick = slot => {
      const {
        nextSessionMasterId,
        getBookingIdBySlot,
        getSessionIdBySlot,
        isSlotBooked,
        createBooking,
        cancelBooking
      } = this.props
      if (isSlotBooked(slot)) {
        cancelBooking({
          bookingId: getBookingIdBySlot(slot.id),
          sessionId: getSessionIdBySlot(slot.id),
          slotId: slot.id
        })
      } else {
        createBooking({
          slotId: slot.id,
          tutorId: slot.tutor_id,
          sessionMasterId: nextSessionMasterId,
          bookingDate: slot.start_date
        })
      }
    }

    if (errorMessage !== '') {
      enqueueSnackbar(errorMessage, {
        variant: 'error'
      })
      resetErrorMessage()
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={getMenu(false)} />
        <div align='center' className={classes.outerTop}>
          <div align='left' className={classes.innerTop}>
            <Grid container justify='center'>
              <Grid
                item
                spacing={24}
                alignItems='center'
                justify='center'
                container
                className={classes.grid}
              >
                <Grid item className={classes.itemGrid} sm={12} xs={12}>
                  <div className={classes.topBar}>
                    <div className={classes.block}>
                      <Typography className={classes.heading} gutterBottom>
                        Schedule Your Classes
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.itemGrid} sm={12} xs={12}>
                  <TutorList
                    onTutorSelect={getPaidSlotsForTutor}
                    isTutorSelected={isTutorSelected}
                    tutorList={tutorList}
                  />
                </Grid>
                <Grid item className={classes.itemGrid} sm={12} xs={12}>
                  {isSlotsFetched && (
                    <DateRangeSlot
                      {...rest}
                      showOpenAll={false}
                      showExtraOptions={false}
                      onSlotClick={onSlotClick}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

PaidSchedular.propTypes = {
  classes: PropTypes.object.isRequired,
  isSlotsFetched: PropTypes.bool.isRequired,
  getAllSlotsforDay: PropTypes.func.isRequired,
  isSlotBooked: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  getPaidSlotsForTutor: PropTypes.func.isRequired,
  isSlotSaving: PropTypes.func.isRequired,
  onWeekTabClick: PropTypes.func.isRequired,
  currentWeek: PropTypes.number.isRequired,
  handleInfoOnTab: PropTypes.func.isRequired,
  openAllSlotsForDay: PropTypes.func.isRequired,
  onOpenAllClick: PropTypes.func.isRequired,
  isSlotDisabled: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  onSlotMenuClick: PropTypes.func.isRequired,
  getSlotsByDateRange: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSlotsFetched: isSlotsFetched(state),
    getAllSlotsforDay: getAllSlotsforDay(state),
    isSlotUnSelected: isSlotOpen(state),
    startDate: getSlotStartDate(state),
    endDate: getSlotEndDate(state),
    isSlotSaving: isBookingProcessing(state),
    currentWeek: getSlotCurrentWeek(state),
    handleInfoOnTab: countBookedSlotsByWeek(state),
    openAllSlotsForDay: openAllSlotsForDay(state),
    isSlotDisabled: isSlotDisabled(state),
    errorMessage: getCommonErrorMessage(state),
    anchorElem: getSlotMenuAnchorElem(state),
    getSlotsByDateRange: getSlotsByDateRange(state),
    tutorList: getAllTutorList(state),
    isTutorSelected: isTutorSelected(state),
    nextSessionMasterId: getNextSessionMasterId(state),
    isSlotBooked: isSlotBooked(state),
    getBookingIdBySlot: getBookingIdBySlot(state),
    getSessionIdBySlot: getSessionIdBySlot(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLastBookedTutor: () => {
      dispatch(latestBookedTutor.request())
    },
    getTutorByAvailability: () => {
      dispatch(topAvailableTutors.request())
    },
    getPaidSlotsForTutor: tutorId => {
      dispatch(tutorSlots.request({ tutor_id: tutorId }))
    },
    onWeekTabClick: ind => {
      dispatch(slots.slotWeekSwitch(ind))
    },
    onOpenAllClick: value => {
      dispatch(slots.openAllToggle(value))
    },
    resetErrorMessage: () => {
      dispatch(errorMessage.reset(''))
    },
    onSlotMenuClick: event => {
      dispatch(slotMenu.menuClick(event))
    },
    onSlotCopyClick: data => {
      dispatch(slotsCopy.request(data))
    },
    getStudentBookedSlots: () => {
      dispatch(studentBookedSlots.request())
    },
    getBookings: () => {
      dispatch(bookings.request({ limit: 20 }))
    },
    getNextSession: () => {
      dispatch(nextSession.request())
    },
    createBooking: ({ slotId, sessionMasterId, tutorId, bookingDate }) => {
      dispatch(
        createBooking.request({ slotId, sessionMasterId, tutorId, bookingDate })
      )
    },
    cancelBooking: ({ slotId, sessionId, bookingId }) => {
      dispatch(cancelBooking.request({ slotId, sessionId, bookingId }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(withSnackbar(PaidSchedular))))

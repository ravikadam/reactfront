// Global
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import DateSlot from '../components/trial/DateSlotList'
import TimeSlot from '../components/trial/TimeSlotList'
import Topbar from '../components/common/Topbar'
import * as _ from 'lodash'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'

import {
  getSelectedTrialDateSlot,
  getTrialSlots,
  getTrialSlotDates,
  getTrialSlotTimes,
  isNextSlotAvailable,
  isPreviousSlotAvailable
} from '../reducers'
import {
  trialDates,
  selectDateSlot,
  selectTimeSlot,
  trialSlots,
  bookSlot,
  trialSessionScheduled,
  selectNextSlot,
  selectPreviousSlot,
  selectDefaultSlot
} from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const backgroundShape = require('../images/shape.svg')
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      marginTop: `${theme.spacing.unit * 2}px`
    }
  },
  innerTop: {
    maxWidth: '1100px'
  },
  items2: {
    height: 600,
    paddingTop: '0px!important',
    marginTop: -15
  },
  items: {
    height: 600
  },
  grid: {
    margin: `0 ${theme.spacing.unit}px`
  }
})
class TrialSessionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleSlotSelection = props.handleSlotSelection
    this.selectedTimeSlot = ''
    this.isTimeComponent = false
    this.selectNextDate = props.selectNextDate
    this.selectPreviouseDate = props.selectPreviouseDate

    //BIND
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.handleTimeSlotSelection = this.handleTimeSlotSelection.bind(this)
    this.isMobile = this.isMobile.bind(this)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (_.isEmpty(prevProps.slots) && !_.isEmpty(this.props.slots)) {
      if (!this.isMobile()) {
        this.props.selectDefaultSlot()
      }
    }
  }

  isMobile() {
    return isWidthDown('md', this.props.width)
  }
  componentDidMount() {
    this.props.isTrialSlotSheduled()
    this.props.getDateSlots()
    window.mixpanel.track('Book Trial Loaded')
    window.fbq('track', 'details filled')
  }
  handleDateSelect(date) {
    if (this.isMobile()) {
      this.isTimeComponent = true
    }
    this.props.selectDateSlot(date)
  }
  handleTimeSlotSelection(timeSlot) {
    this.props.bookSlot(timeSlot)
    this.props.history.push('/trial/confirm')
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={[]} />
        <div align='center' className={this.props.classes.root}>
          <div align='left' className={this.props.classes.innerTop}>
            <div>&nbsp;</div>
            <Grid
              container
              spacing={16}
              direction='row'
              justify='center'
              alignItems='center'
            >
              {!(this.isTimeComponent || _.isEmpty(this.props.slots)) && (
                <Grid item xs={12} md={4} className={this.props.classes.items}>
                  <DateSlot
                    classes={this.props.classes}
                    slots={this.props.slots}
                    handleDateSelect={this.handleDateSelect}
                    selectedDate={this.props.selectedDate}
                    isMobile={this.isMobile}
                  />
                </Grid>
              )}

              {(this.isMobile() ? this.isTimeComponent : true) && (
                <Grid item xs={12} md={4} className={this.props.classes.items2}>
                  <TimeSlot
                    classes={this.props.classes}
                    selectedDate={this.props.selectedDate}
                    selectedTimeSlot={this.props.slotTimes}
                    handleSlotSelection={this.handleTimeSlotSelection}
                    selectNextSlot={this.selectNextDate}
                    selectPreviousSlot={this.selectPreviouseDate}
                    isPreviousSlotAvailable={this.props.isPreviousSlotAvailable}
                    isNextSlotAvailable={this.props.isNextSlotAvailable}
                    isMobile={this.isMobile}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

TrialSessionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  getDateSlots: PropTypes.func,
  getTimeSlots: PropTypes.func,
  slotDates: PropTypes.array,
  slotTimes: PropTypes.array,
  selectDateSlot: PropTypes.func,
  selectTimeSlot: PropTypes.func
}
const mapStateToProps = (state, ownProps) => {
  return {
    slotDates: getTrialSlotDates(state),
    slotTimes: getTrialSlotTimes(state),
    selectedDate: getSelectedTrialDateSlot(state),
    slots: getTrialSlots(state),
    isNextSlotAvailable: isNextSlotAvailable(state),
    isPreviousSlotAvailable: isPreviousSlotAvailable(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDateSlots: data => {
      dispatch(trialSlots.request())
    },
    getTimeSlots: flg => {
      dispatch(trialDates.errorClose(flg))
    },
    selectDateSlot: date => {
      dispatch(selectDateSlot.request(date))
    },
    selectTimeSlot: timeSlot => {
      dispatch(selectTimeSlot.request(timeSlot))
    },
    bookSlot: timeSlot => {
      dispatch(bookSlot.request(timeSlot))
    },
    isTrialSlotSheduled: timeSlot => {
      dispatch(trialSessionScheduled.request())
    },
    selectNextDate: () => {
      dispatch(selectNextSlot.request())
    },
    selectPreviouseDate: () => {
      dispatch(selectPreviousSlot.request())
    },
    selectDefaultSlot: () => {
      dispatch(selectDefaultSlot.request())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(withWidth()(TrialSessionComponent))))

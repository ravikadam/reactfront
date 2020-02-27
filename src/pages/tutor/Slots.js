import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Topbar from '../../components/common/Topbar'
import { getMenu } from '../../helpers/utils'
import Typography from '@material-ui/core/Typography'
import { withSnackbar } from 'notistack'

import {
  slots,
  slotsSave,
  errorMessage,
  slotMenu,
  slotsCopy
} from '../../actions'
import {
  isSlotsFetched,
  getAllSlotsforDay,
  isSlotClosed,
  isSlotOpen,
  getSlotStartDate,
  getSlotEndDate,
  isSlotSaving,
  getSlotCurrentWeek,
  countOpenSlotsByWeek,
  openAllSlotsForDay,
  isSlotDisabled,
  getCommonErrorMessage,
  getSlotMenuAnchorElem,
  getSlotsByDateRange
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
  outerTop: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    background: `url(${backgroundShape}) no-repeat`,
    overflow: 'hidden',
    backgroundSize: 'cover',
    paddingBottom: 200
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
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  itemGrid: {
    [theme.breakpoints.up('xs')]: {
      paddingTop: '12px',
      paddingBottom: '0px'
    }
  }
})

class Slots extends Component {
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { getSlots } = this.props
    getSlots()
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
      ...rest
    } = this.props

    if (errorMessage !== '') {
      enqueueSnackbar(errorMessage, {
        variant: 'error'
      })
      resetErrorMessage()
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={getMenu(false, true)} />
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
                        Configure your availability
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.itemGrid} sm={12} xs={12}>
                  {isSlotsFetched && (
                    <DateRangeSlot
                      {...rest}
                      showOpenAll={true}
                      showExtraOptions={true}
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

Slots.propTypes = {
  classes: PropTypes.object.isRequired,
  isSlotsFetched: PropTypes.bool.isRequired,
  getAllSlotsforDay: PropTypes.func.isRequired,
  isSlotUnSelected: PropTypes.func.isRequired,
  isSlotSelected: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  getSlots: PropTypes.func.isRequired,
  onSlotClick: PropTypes.func.isRequired,
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
    isSlotUnSelected: isSlotClosed(state),
    isSlotSelected: isSlotOpen(state),
    startDate: getSlotStartDate(state),
    endDate: getSlotEndDate(state),
    isSlotSaving: isSlotSaving(state),
    currentWeek: getSlotCurrentWeek(state),
    handleInfoOnTab: countOpenSlotsByWeek(state),
    openAllSlotsForDay: openAllSlotsForDay(state),
    isSlotDisabled: isSlotDisabled(state),
    errorMessage: getCommonErrorMessage(state),
    anchorElem: getSlotMenuAnchorElem(state),
    getSlotsByDateRange: getSlotsByDateRange(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSlots: () => {
      dispatch(slots.request({}))
    },
    onSlotClick: slot => {
      dispatch(slotsSave.request(slot))
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(withSnackbar(Slots))))

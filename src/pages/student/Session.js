import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import SessionDetails from '../../components/session/SessionDetails'
import SessionConference from '../../components/session/SessionConference'
import SessionActivities from '../../components/session/SessionActivities'
import SessionProject from '../../components/session/SessionProject'

import PaneProgress from '../../components/panes/PaneProgress'

import Topbar from '../../components/common/Topbar'
import { getMenu } from '../../helpers/utils'

import { connect } from 'react-redux'
import {
  getSessionTutor,
  getSessionStudent,
  getSessionDetails,
  getTotalStars,
  getActivities,
  getLoggedInUser,
  isSessionStarting
} from '../../reducers'
import { startSession } from '../../actions'

const backgroundShape = require('../../images/shape.svg')

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.grey['100'],
    background: `url(${backgroundShape}) no-repeat`,
    paddingBottom: 200
  },
  innerTop: {
    maxWidth: '1100px'
  },
  grid: {
    width: 'calc(100% - 20px)',
    marginTop: 0,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
})

class Sessions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      learnMoredialog: false,
      getStartedDialog: false,
      activeStep: 2,
      maximize: false,
      bookingId: props.match.params.bookingId,
      activityOpen: false,
      activeActivity: 0,
      projectOpen: false
    }
    this.handleMaximize = this.handleMaximize.bind(this)
    this.handleActivityOpen = this.handleActivityOpen.bind(this)
    this.handleProjectOpen = this.handleProjectOpen.bind(this)
    this.handleNextActivity = this.handleNextActivity.bind(this)
  }

  componentDidMount() {
    if (!this.props.sessionDetails) {
      this.props.startSession({ id: this.state.bookingId })
    }
  }

  handleMaximize(fullScreen) {
    this.setState({ maximize: fullScreen })
  }

  handleActivityOpen(isOpen) {
    this.setState({ activityOpen: isOpen })
  }
  handleNextActivity() {
    this.setState({ activeActivity: this.state.activeActivity + 1 })
  }
  handleProjectOpen(isOpen) {
    this.setState({ projectOpen: isOpen })
  }

  render() {
    const { classes, loggedInUser, isSessionStarting, activities } = this.props
    if (isSessionStarting) {
      return <PaneProgress />
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={getMenu(loggedInUser.course.status !== 'PAID')} />
        <div align='center' className={classes.root}>
          <div align='left' className={classes.innerTop}>
            <SessionProject
              open={this.state.projectOpen}
              handleProjectOpen={this.handleProjectOpen}
            />
            <Grid container justify='center'>
              <Grid
                spacing={24}
                alignItems='center'
                justify='center'
                container
                className={classes.grid}
              >
                <Grid item xs={12} md={12}>
                  <SessionDetails
                    classes={classes}
                    student={this.props.student}
                    tutor={this.props.tutor}
                    sessionDetails={this.props.sessionDetails}
                    stars={this.props.stars}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SessionConference
                    classes={classes}
                    maximize={this.state.maximize}
                    handleMaximize={this.handleMaximize}
                    handleActivityOpen={this.handleActivityOpen}
                    handleProjectOpen={this.handleProjectOpen}
                    open={this.state.activityOpen}
                    activities={activities}
                    activeActivity={this.state.activeActivity}
                    handleNextActivity={this.handleNextActivity}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Sessions.propTypes = {
  loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: getSessionStudent(state),
    tutor: getSessionTutor(state),
    sessionDetails: getSessionDetails(state),
    stars: getTotalStars(state),
    activities: getActivities(state),
    isSessionStarting: isSessionStarting(state),
    loggedInUser: getLoggedInUser(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startSession: data => dispatch(startSession.request(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Sessions)))

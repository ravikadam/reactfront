import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import SessionDetails from '../../components/session/tutor/SessionDetails'
import Activity from '../../components/session/tutor/Activity'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Topbar from '../../components/common/Topbar'
import { getMenu } from '../../helpers/utils'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import Notes from '../../components/session/tutor/Notes'
import PaneProgress from '../../components/panes/PaneProgress'
import { STUDENT_TYPE, TUTOR_TYPE } from '../../constants/activitiesType'
import EndSessionComponent from '../../components/session/tutor/EndSession'
import {
  getSessionTutor,
  getSessionStudent,
  getSessionDetails,
  getTotalStars,
  getActivities,
  getSessionSlotDetails,
  getSessionBookingId,
  isSessionStarting,
  getSessionId,
  getEndSessionStatus
} from '../../reducers'

import {
  endSession,
  endSessionNoShow,
  endSessionNoShowTech,
  startSession
} from '../../actions'

const backgroundShape = require('../../images/shape.svg')
const styles = theme => ({
  root: {
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
  grid: {
    width: 'calc(100% - 20px)',
    marginTop: 10,
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
  },
  classBox: {
    height: '600px',
    dispaly: 'flex',
    alignItems: 'flex-start'
  },
  classActivity: {
    marginTop: '10px'
  },
  videoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  videoBoxItem: {
    width: '100%',
    height: '70vh'
  },
  activityBox: {
    width: '100%',
    height: '30%'
  },
  classHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  classHeading: {
    fontSize: 19,
    fontWeight: 600,
    fontColor: 'black',
    marginLeft: '5px',
    paddingBotton: '20px'
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      learnMoredialog: false,
      getStartedDialog: false,
      activeStep: 0,
      maximize: false,
      value: 0,
      bookingId: props.match.params.bookingId,
      studentActivityOpen: false,
      studentActiveActivity: 0,
      tutorActivityOpen: false,
      tutorActiveActivity: 0,
      endSessionConfirmation: false,
      endClassPayload: {}
    }
    this.handleMaximize = this.handleMaximize.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStudentNextActivity = this.handleStudentNextActivity.bind(this)
    this.handleTutorNextActivity = this.handleTutorNextActivity.bind(this)
    this.handleEndClassConfirmation = this.handleEndClassConfirmation.bind(this)
    this.handleEndClass = this.handleEndClass.bind(this)
  }

  componentDidMount() {
    if (!this.props.sessionDetails) {
      this.props.startSession({ id: this.state.bookingId })
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.endSessionStatus == false &&
      this.props.endSessionStatus == true
    ) {
      this.props.history.push('/')
    }
  }
  handleMaximize(fullScreen) {
    this.setState({ maximize: fullScreen })
  }
  handleChange(event, value) {
    this.setState({ value })
  }

  getStudentActivity(activities) {
    return activities.filter(activity => activity.type === STUDENT_TYPE)
  }
  getTutorActivity(activities) {
    return activities.filter(activity => activity.type === TUTOR_TYPE)
  }

  handleStudentNextActivity() {
    this.setState({
      studentActiveActivity: this.state.studentActiveActivity + 1
    })
  }
  handleTutorNextActivity() {
    this.setState({
      tutorActiveActivity: this.state.tutorActiveActivity + 1
    })
  }

  handleEndClass(endClassPayload) {
    this.setState({
      endClassPayload: endClassPayload,
      endSessionConfirmation: true
    })
  }

  handleEndClassConfirmation(value) {
    this.setState({
      endSessionConfirmation: false,
      endClassPayload: {
        comment: value['comment'],
        ...this.state.endClassPayload
      }
    })
    switch (this.state.endClassPayload.type) {
      case 'END_SESSION':
        this.props.endSessionAction(this.state.endClassPayload)
        break
      case 'No_SHOW_TECH':
        this.props.endSessionNoShowTech(this.state.endClassPayload)
        break
      case 'No_SHOW_ABSENT':
        this.props.endSessionNoShow(this.state.endClassPayload)
        break
    }
  }
  render() {
    const { classes, activities, isSessionStarting, ...rest } = this.props
    if (isSessionStarting) {
      return <PaneProgress />
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar menuItems={getMenu(false, true)} />
        <EndSessionComponent
          open={this.state.endSessionConfirmation}
          onSubmit={this.handleEndClassConfirmation}
        ></EndSessionComponent>
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
                <Grid item xs={12}>
                  <div className={classes.classBox}>
                    <div>
                      <SessionDetails
                        onEndClass={this.handleEndClass}
                        {...rest}
                      />
                    </div>
                    <div className={classes.classActivity}>
                      <Paper>
                        <Tabs
                          indicatorColor='primary'
                          textColor='primary'
                          value={this.state.value}
                          onChange={this.handleChange}
                        >
                          <Tab label='Notes' />
                          <Tab label='Student Activity' />
                          <Tab label='Tutor Activity' />
                        </Tabs>
                        {this.state.value === 1 && (
                          <Activity
                            activites={this.getStudentActivity(activities)}
                            activeStep={this.state.studentActiveActivity}
                            handleNextActivity={this.handleStudentNextActivity}
                          />
                        )}
                        {this.state.value === 2 && (
                          <Activity
                            activites={this.getTutorActivity(activities)}
                            activeStep={this.state.tutorActiveActivity}
                            handleNextActivity={this.handleTutorNextActivity}
                          />
                        )}
                        {this.state.value === 0 && <Notes {...rest} />}
                      </Paper>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: getSessionStudent(state),
    tutor: getSessionTutor(state),
    sessionDetails: getSessionDetails(state),
    stars: getTotalStars(state),
    activities: getActivities(state),
    slots: getSessionSlotDetails(state),
    bookingId: getSessionBookingId(state),
    isSessionStarting: isSessionStarting(state),
    sessionId: getSessionId(state),
    endSessionStatus: getEndSessionStatus(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startSession: data => dispatch(startSession.request(data)),
    endSessionAction: data => dispatch(endSession.request(data)),
    endSessionNoShow: data => dispatch(endSessionNoShow.request(data)),
    endSessionNoShowTech: data => dispatch(endSessionNoShowTech.request(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Main)))

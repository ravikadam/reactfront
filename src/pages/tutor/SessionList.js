import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

import Topbar from '../../components/common/Topbar'
import { getMenu } from '../../helpers/utils'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import SessionList from '../../components/session/tutor/SessionList'
import PaneProgress from '../../components/panes/PaneProgress'
import { getUnResolvedSessions, getEndSessionStatus } from '../../reducers'

import {
  unresolvedSessions,
  endSession,
  endSessionNoShow,
  endSessionNoShowTech
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
  }

  componentDidMount() {
    this.props.getUnresolvedSessions()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.endSessionStatus == false &&
      this.props.endSessionStatus == true
    ) {
      this.props.getUnresolvedSessions()
    }
  }

  render() {
    const { classes, isSessionStarting, ...rest } = this.props
    if (isSessionStarting) {
      // return <PaneProgress />
    }
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
                <Grid item xs={12}>
                  <div className={classes.classBox}>
                    <div className={classes.classActivity}>
                      <Paper>
                        <SessionList {...rest} />
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
    unresolvedSessions: getUnResolvedSessions(state),
    endSessionStatus: getEndSessionStatus(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUnresolvedSessions: data => dispatch(unresolvedSessions.request(data)),
    endSession: data => dispatch(endSession.request(data)),
    endSessionNoShow: data => dispatch(endSessionNoShow.request(data)),
    endSessionNoShowTech: data => dispatch(endSessionNoShowTech.request(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Main)))

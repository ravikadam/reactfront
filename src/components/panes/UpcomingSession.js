import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import deepPurple from '@material-ui/core/colors/deepPurple'
import PaneProgress from './PaneProgress'
import NoSessionScheduled from './NoSessionScheduled'
import DateTime from './common/DateTime'
import SessionHeader from './common/SessionHeader'

const styles = theme => ({
  root: { height: '100%' },
  cardContent: {
    paddingTop: '8px'
  },
  grid: {},
  item: {},
  noDecoration: {
    textDecoration: 'none'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  titleText: {
    textTransform: 'capitalize',
    marginRight: `${theme.spacing.unit}px`
  },
  dateTitle: {
    marginBottom: `${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  pos: {
    marginRight: `${theme.spacing.unit}px`,
    paddingTop: 3,
    fontWeight: 'bold'
  },
  avatar: {
    marginRight: `${theme.spacing.unit}px`,
    marginBottom: 5,
    height: '30px',
    width: '30px',
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  actionButton: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    color: 'white',
    minWidth: '152px!important'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  heading: {
    fontFamily: 'Fjalla One',
    letterSpacing: '0.05rem',
    fontSize: '1.2rem',
    lineHeight: 1
  },
  box: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  pending: {
    opacity: 0.6,
    fontSize: '0.9rem'
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

const UpcomingSession = props => {
  const {
    nextBookingId: bookingId,
    getSlotDetailsById,
    getUserDetailsById,
    isNextBooking,
    tutorByBookingId,
    isScheduleLoading,
    sessionDetailsByBookingId,
    classes,
    startSession
  } = props
  if (isScheduleLoading) return <PaneProgress />
  if (!isNextBooking) return <NoSessionScheduled />

  const { start_date } = getSlotDetailsById(bookingId)
  const { name: session_with } = getUserDetailsById(bookingId)
  const { name: session_name, session_number } = sessionDetailsByBookingId(
    bookingId
  )
  const enableMinutes = 5
  const { room_url } = tutorByBookingId(bookingId)

  const firstLetter = str => str.substring(0, 1)
  const relativeDate = moment(start_date).fromNow()
  let [pendingMinutes, setPendingMinutes] = useState(0)
  pendingMinutes = moment().diff(start_date, 'minutes')
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    ;(async function() {
      const startInterval = setInterval(() => {
        setPendingMinutes(pendingMinutes =>
          moment().diff(start_date, 'minutes')
        )
      }, 10000)
      return () => clearInterval(startInterval)
    })()
    return function() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.box}>
          <Typography
            color='secondary'
            gutterBottom
            className={classes.heading}
          >
            Next Session
          </Typography>
          <Typography variant='body1' gutterBottom>
            {relativeDate}
          </Typography>
        </div>
        <CardContent className={classes.cardContent}>
          <div className={classes.title}>
            <SessionHeader
              session_name={session_name}
              session_number={session_number}
            />
          </div>
          <div className={classes.dateTitle}>
            <DateTime date={start_date} />
          </div>
          <div className={classes.title}>
            <Avatar color='primary' className={classes.avatar}>
              {firstLetter(session_with)}
            </Avatar>
            <Typography className={classes.pos} component='p'>
              {session_with}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          {pendingMinutes < 0 - enableMinutes && (
            <Button
              color='secondary'
              variant='contained'
              className={classes.actionButton}
              disabled={true}
              onClick={() => startSession(bookingId)}
            >
              Start Session
            </Button>
          )}
          {pendingMinutes >= 0 - enableMinutes && (
            <a
              className={classes.noDecoration}
              target='_blank'
              rel='noopener noreferrer'
              href={room_url}
            >
              <Button
                color='secondary'
                variant='contained'
                className={classes.actionButton}
                onClick={() => startSession(bookingId)}
              >
                Start Session
              </Button>
            </a>
          )}
          {pendingMinutes < 0 - enableMinutes && (
            <a className={classes.pending}>
              You can enter class after {0 - (enableMinutes + pendingMinutes)}{' '}
              minutes.
            </a>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

UpcomingSession.propTypes = {
  classes: PropTypes.object.isRequired,
  nextBookingId: PropTypes.string,
  getSlotDetailsById: PropTypes.func.isRequired,
  getUserDetailsById: PropTypes.func.isRequired,
  isNextBooking: PropTypes.bool.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  sessionByBookingId: PropTypes.func.isRequired
}

export default withStyles(styles)(UpcomingSession)

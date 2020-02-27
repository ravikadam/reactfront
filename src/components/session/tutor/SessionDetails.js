import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import { Grid } from '@material-ui/core'
import deepPurple from '@material-ui/core/colors/deepPurple'

import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import yellow from '@material-ui/core/colors/yellow'

import Phone from '@material-ui/icons/Phone'
import Time from '@material-ui/icons/Timer'
import Calendar from '@material-ui/icons/CalendarTodayOutlined'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Star from '@material-ui/icons/Star'
import { byFormat } from '../../../helpers/dateHelper'
const displayFormat = 'hh:mm A'
const dateFormat = 'DD-MM-YYYY'
const firstLetter = str => str.substring(0, 1)

const styles = theme => ({
  root: { height: '50%' },
  card: {
    marginTop: '15px'
  },
  cardContent: {
    paddingTop: '8px'
  },
  display: {
    display: 'flex'
  },
  sessionDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  starsLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  callButton: {
    backgroundColor: yellow[700]
  },
  className: {
    color: theme.palette.primary.main,
    fontWeight: '500',
    marginRight: '3px'
  },
  dateTitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '15px',
    justifyContent: 'flex-end'
  },
  classTimings: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  classTimingsItems: {
    marginRight: '15px'
  },
  button: {
    color: 'white'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleText: {
    textTransform: 'capitalize',
    marginRight: `${theme.spacing.unit}px`
  },
  timeTitle: {
    fontSize: '14px'
  },
  timeIcon: {
    fontSize: '14px'
  },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  studentDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  pos: {
    paddingTop: 3,
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  studentAvatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatar: {
    marginRight: `${theme.spacing.unit}px`,
    marginBottom: 5,
    height: '30px',
    width: '30px',
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  studentName: {
    paddingTop: '8px',
    marginLeft: '5px'
  },
  studentStars: {
    paddingTop: '-10px',
    marginLeft: '5px'
  },
  stars: {
    marginTop: '5px'
  },
  starsFilled: {
    color: yellow[700],
    marginTop: '5px'
  }
})

const buttonTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: red,
    secondary: { light: green[500], main: green[700], dark: green[900] }
  }
})

const SessionDetails = props => {
  const {
    classes,
    student,
    sessionDetails,
    bookingId,
    slots,
    sessionId,
    onEndClass
  } = props

  const getAvatar = name => {
    let words = name.split(' ')
    return words.map(word => word.substring(0, 1).toUpperCase()).join()
  }
  const getSlot = () => {
    return slots
  }
  const getEndClassPayload = type => {
    return {
      type: type,
      bookingId,
      sessionId: sessionId,
      isTrial: sessionDetails.is_trial
    }
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container direction='row' spacing={0}>
            <Grid item xs={12} sm={6}>
              <div className={classes.title}>
                <Avatar color='primary' className={classes.avatar}>
                  {student ? firstLetter(student.name) : ''}
                </Avatar>
                <Typography className={classes.pos} component='p'>
                  &nbsp;&nbsp;{student ? student.name : ''}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.dateTitle}>
                <Typography
                  variant='subtitle1'
                  className={classes.titleText}
                  color='primary'
                  gutterBottom
                >
                  {sessionDetails ? sessionDetails.session_number : ''}
                </Typography>
                <Typography
                  variant='subtitle1'
                  className={classes.titleText}
                  color='default'
                  gutterBottom
                >
                  {'|'}
                </Typography>
                <Typography
                  variant='subtitle1'
                  className={classes.titleText}
                  color='textSecondary'
                  gutterBottom
                >
                  {sessionDetails ? sessionDetails.name : ''}
                </Typography>
              </div>
              <div className={classes.classTimings}>
                <div className={classes.classTimingsItems}>
                  <Typography className={classes.timeTitle}>
                    <Time className={classes.timeIcon} />
                    {'  ' + byFormat(getSlot().start_time, displayFormat)}
                  </Typography>
                </div>
                <div className={classes.classTimingsItems}>
                  <Typography className={classes.timeTitle}>
                    <Calendar className={classes.timeIcon} />
                    {'  ' + byFormat(getSlot().start_date, dateFormat)}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
          {false && (
            <div>
              <Star className={classes.stars} />
              <Star className={classes.starsFilled} />
            </div>
          )}
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.actions}>
            {false && (
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Give Star
              </Button>
            )}
            <MuiThemeProvider theme={buttonTheme}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={() => onEndClass(getEndClassPayload('No_SHOW_ABSENT'))}
              >
                Student Absent
              </Button>
            </MuiThemeProvider>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={() => onEndClass(getEndClassPayload('No_SHOW_TECH'))}
            >
              Technical Issues
            </Button>
            <MuiThemeProvider theme={buttonTheme}>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                onClick={() => onEndClass(getEndClassPayload('END_SESSION'))}
              >
                Class Completed
              </Button>
            </MuiThemeProvider>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

SessionDetails.propTypes = {}

export default withStyles(styles)(SessionDetails)

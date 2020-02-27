import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { getDayOfWeek } from '../../helpers/dateHelper'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import ActivitiesPane from './ActivitiesPane'
import PaneProgress from './PaneProgress'
import DateTime from './common/DateTime'
import SessionHeader from './common/SessionHeader'
import NoSessionScheduled from './NoSessionScheduled'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  divider: {
    borderTop: '1px solid',
    opacity: 0.24
  },
  gap: {},
  innerTop: {},
  primary: {
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: theme.palette.primary.main
  },
  secondary: {
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: theme.palette.secondary.main
  },
  grid: {},
  item: {},
  box: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  display: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  listItemText: {
    fontWeight: 'bold',
    fontSize: '1rem!important'
  },
  listItemText2: {
    fontWeight: 'bold',
    fontSize: '1rem!important',
    color: theme.palette.primary.main
  },
  heading: {
    fontFamily: 'Fjalla One',
    letterSpacing: '0.05rem',
    fontSize: '1.2rem',
    lineHeight: 1
  },
  listItem: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px'
    }
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px'
    }
  }
})

const MiniScheduler = props => {
  const {
    isScheduleLoading,
    getBookingIds: bookingIds,
    getSlotDetailsById,
    getUserDetailsById,
    toggleMiniSchedular,
    isMiniSchedularToggle,
    actvitiesByBookingIdAndType,
    miniSchedularActivityTab,
    activityTabSwitch,
    sessionByBookingId,
    sessionDetailsByBookingId,
    isNextBooking,
    hidePhone,
    classes
  } = props
  if (isScheduleLoading) return <PaneProgress />
  if (!isNextBooking) return <NoSessionScheduled />

  const handleDateTime = id => {
    const { start_date } = getSlotDetailsById(id)
    return <DateTime date={start_date} />
  }

  const getStartDateTime = id => {
    return getSlotDetailsById(id).start_date
  }

  const getDay = id => {
    const { start_date } = getSlotDetailsById(id)
    const day = getDayOfWeek(start_date)
    return day.substring(0, 3)
  }

  const handleUserName = id => {
    const { name } = getUserDetailsById(id)
    return name
  }

  const handleUserMobile = id => {
    const { mobile } = getUserDetailsById(id)
    return mobile
  }

  const handleSessionName = id => {
    const { name: session_name, session_number } = sessionDetailsByBookingId(id)
    return (
      <SessionHeader
        session_name={session_name}
        session_number={session_number}
      />
    )
  }

  const handleDocumentURL = id => {
    const { document_url } = sessionByBookingId(id)
    return document_url
  }

  const onExpandClick = id => {
    toggleMiniSchedular(id)
  }

  const isActivitiesOpen = id => (isMiniSchedularToggle(id) ? true : false)

  return (
    <div className={classes.demo}>
      <Card className={classes.card}>
        <div className={classes.box}>
          <Typography
            color='secondary'
            gutterBottom
            className={classes.heading}
          >
            Mini Schedule
          </Typography>
        </div>
        <CardContent className={classes.cardContent}>
          <List dense>
            {bookingIds.map((id, ind) => {
              // const uiDate =uiFirendlyFormat(slots.start_date, 'Do MMMM')
              return (
                <React.Fragment key={id}>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.display}>
                      <Avatar
                        className={
                          ind % 2 === 0 ? classes.secondary : classes.primary
                        }
                      >
                        {getDay(id)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItem}
                      primary={handleSessionName(id)}
                      secondary={handleDateTime(id)}
                    />
                    <ListItemText
                      className={classes.display}
                      classes={{ primary: classes.listItemText }}
                      primary={handleUserName(id)}
                    />
                    {!hidePhone && (
                      <ListItemText
                        className={classes.display}
                        classes={{ primary: classes.listItemText2 }}
                        primary={handleUserMobile(id)}
                      />
                    )}
                    <ListItemSecondaryAction>
                      <IconButton
                        className={classes.buttons}
                        target='_blank'
                        href={handleDocumentURL(id)}
                        aria-label='Open as pdf'
                      >
                        <AssignmentIcon />
                      </IconButton>
                      {!isActivitiesOpen(id) && (
                        <IconButton
                          className={classes.buttons}
                          aria-label='Open'
                          onClick={onExpandClick.bind(null, id)}
                        >
                          <ExpandMore />
                        </IconButton>
                      )}
                      {isActivitiesOpen(id) && (
                        <IconButton
                          className={classes.buttons}
                          aria-label='Close'
                          onClick={onExpandClick.bind(null, id)}
                        >
                          <ExpandLess />
                        </IconButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse
                    in={isActivitiesOpen(id)}
                    timeout='auto'
                    unmountOnExit
                  >
                    <ActivitiesPane
                      activitiesByType={actvitiesByBookingIdAndType(id)}
                      miniSchedularActivityTab={miniSchedularActivityTab}
                      activityTabSwitch={activityTabSwitch}
                    />
                  </Collapse>
                  {(ind >= bookingIds.length - 1 ||
                    getStartDateTime(id) !=
                      getStartDateTime(bookingIds[ind + 1])) &&
                    ind < bookingIds.length - 1 && (
                      <div className={classes.divider}></div>
                    )}
                </React.Fragment>
              )
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

MiniScheduler.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MiniScheduler)

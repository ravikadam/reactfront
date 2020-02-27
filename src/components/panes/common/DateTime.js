import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TimeIcon from '@material-ui/icons/AccessTime'
import DateIcon from '@material-ui/icons/DateRange'
import { uiFirendlyFormat } from '../../../helpers/dateHelper'
import Typography from '@material-ui/core/Typography'
import { byFormat } from '../../../helpers/dateHelper'
const displayFormat = 'hh:mm A'
const styles = theme => ({
  dateTitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '10px',
    justifyContent: 'flex-start'
  },
  pos2: {
    marginRight: `${theme.spacing.unit}px`
  },
  pos: {
    marginRight: `${theme.spacing.unit}px`,
    fontSize: '0.875rem',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5
  }
})

const DateTime = props => {
  const { date, classes } = props
  const uiDate = uiFirendlyFormat(date, 'Do MMMM')
  return (
    <span className={classes.dateTitle}>
      <TimeIcon className={classes.pos2} color='action' fontSize='small' />
      <span className={classes.pos}>{byFormat(date, displayFormat)}</span>
      <DateIcon className={classes.pos2} color='action' fontSize='small' />
      <span className={classes.pos}>{uiDate}</span>
    </span>
  )
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired
}

export default withStyles(styles)(DateTime)

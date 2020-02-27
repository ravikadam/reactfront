import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  dateTitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '10px',
    justifyContent: 'flex-start'
  },
  titleText: {
    textTransform: 'capitalize',
    marginRight: `${theme.spacing.unit}px`
  }
})

const SessionHeader = props => {
  const { session_name, session_number, classes } = props
  return (
    <div className={classes.dateTitle}>
      <Typography
        variant='subtitle1'
        className={classes.titleText}
        color='primary'
        gutterBottom
      >
        {session_name ? session_name.toLowerCase() : ''}
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
        {session_number}
      </Typography>
    </div>
  )
}

SessionHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SessionHeader)

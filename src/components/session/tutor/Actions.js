import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: { height: '50%' },
  container: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  actionItem: {
    marginLeft: '10px'
  }
})

const SessionActivity = props => {
  const { classes } = props

  return (
    <div className={classes.container}>
      <div className={classes.actionItem}>
        <Button variant='contained' color='primary' className={classes.button}>
          Full Screen
        </Button>
      </div>
      <div className={classes.actionItem}>
        <Button variant='contained' color='primary' className={classes.button}>
          Re-Connect
        </Button>
      </div>
      <div className={classes.actionItem}>
        <Button variant='contained' color='primary' className={classes.button}>
          Class Completed
        </Button>
      </div>
    </div>
  )
}

SessionActivity.propTypes = {}

export default withStyles(styles)(SessionActivity)

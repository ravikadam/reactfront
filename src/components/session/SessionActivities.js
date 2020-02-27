import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Activity from './tutor/Activity'

const styles = theme => ({
  root: { height: '50%' },
  cardContent: {
    paddingTop: '8px'
  },
  dialoagContent: {
    width: '40vw'
  }
})

const SessionActivity = props => {
  const { classes, activities, activeActivity, handleNextActivity } = props

  return (
    <div>
      <Activity
        activites={activities}
        activeStep={activeActivity}
        handleNextActivity={handleNextActivity}
      />
    </div>
  )
}

SessionActivity.propTypes = {}

export default withStyles(styles)(SessionActivity)

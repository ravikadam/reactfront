import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: { height: '50%' },
  cardContent: {
    paddingTop: '8px'
  },
  dialoagContent: {
    width: '40vw'
  }
})

const SessionProject = props => {
  const { classes, handleProjectOpen, open } = props

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle id='form-dialog-title'>Submit Project URL</DialogTitle>
        <DialogContent className={classes.dialoagContent}>
          <TextField
            autoFocus
            margin='dense'
            id='projectUrl'
            label='Project Url'
            type='text'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => handleProjectOpen(false)}>
            Close
          </Button>
          <Button color='primary' onClick={() => handleProjectOpen(false)}>
            Submit Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

SessionProject.propTypes = {}

export default withStyles(styles)(SessionProject)

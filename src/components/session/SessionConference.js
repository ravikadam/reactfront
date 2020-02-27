import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import deepPurple from '@material-ui/core/colors/deepPurple'

import { Grid } from '@material-ui/core'
import SessionActivities from '../../components/session/SessionActivities'

const styles = theme => ({
  root: { height: '50%' },
  cardContent: {
    paddingTop: '8px'
  },
  conferenceDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  grid: {},
  paper: {},
  loadingState: {},
  loadingMessage: {},
  conferenceDetailItems: {
    marginRight: '15px',
    textTransform: 'capitalize'
  },
  projectButton: {
    color: 'white'
  },
  maximizedBox: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#E8E8E8'
  },
  box: {
    width: '100%',
    height: '400px',
    backgroundColor: '#E8E8E8'
  },
  pos: {
    marginRight: `${theme.spacing.unit}px`
  },
  avatar: {
    marginRight: `${theme.spacing.unit}px`,
    height: '20px',
    width: '20px',
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
    width: 152
  },
  progress: {
    margin: theme.spacing.unit * 2
  },

  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

const SessionConference = props => {
  const {
    classes,
    handleProjectOpen,
    activities,
    activeActivity,
    handleNextActivity
  } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={16} direction='column'>
            <Grid item>
              <div className={classes.conferenceDetails}>
                <div className={classes.conferenceDetailItems}>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.projectButton}
                    onClick={() => handleProjectOpen(true)}
                  >
                    Submit Project
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              <SessionActivities
                activities={activities}
                activeActivity={activeActivity}
                handleNextActivity={handleNextActivity}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

SessionConference.propTypes = {}

export default withStyles(styles)(SessionConference)

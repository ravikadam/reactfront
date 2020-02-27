import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Stepper from '@material-ui/core/Stepper'

import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
const styles = () => ({
  root: { height: '50%' },
  container: {
    marginTop: '15px',
    backgroudColor: 'grey'
  },
  cardContent: {
    paddingTop: '8px'
  },
  button: {
    color: 'white'
  }
})

class SessionActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: props.activeStep ? props.activeStep : 0
    }
    this.handleNext = props.handleNextActivity
  }

  render() {
    const { classes, activites, activeStep, ...rest } = this.props
    return (
      <div className={classes.container}>
        <Stepper orientation='vertical' activeStep={activeStep}>
          {activites.map(activity => (
            <Step key={activity.name}>
              <StepLabel>{activity.name}</StepLabel>
              <StepContent>
                <Typography>{}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => this.handleNext(activity)}
                      className={classes.button}
                      href={activity.link}
                      target='blank'
                    >
                      {'Start Activity'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }
}

SessionActivity.propTypes = {}

export default withStyles(styles)(SessionActivity)

import React from 'react'
// import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'

const HorizontalNonLinearStepper = props => {
  const {
    classes,
    // onStepChange,
    activeStep,
    steps
  } = props
  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((d, index) => {
          return (
            <Step key={d.name}>
              <StepButton>{d.name}</StepButton>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

HorizontalNonLinearStepper.propTypes = {
  classes: PropTypes.object,
  onStepChange: PropTypes.func,
  activeStep: PropTypes.number,
  steps: PropTypes.object
}

export default HorizontalNonLinearStepper

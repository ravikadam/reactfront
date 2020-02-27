import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HalfPane from './HalfPane'

class CreditsPane extends Component {
  componentDidMount() {
    this.getCredits()
  }

  getCredits() {
    const { getTrialCredits, getPaidCredits } = this.props
    getTrialCredits()
    getPaidCredits()
  }

  render() {
    const { totalTrialCredits, totalPaidCredits, classes } = this.props

    return (
      <div>
        <HalfPane
          title='Total Credits Earned'
          value={totalPaidCredits}
          buttonText='Details'
        />
        <div className={classes.gap}>&nbsp;</div>
        <HalfPane
          title='Total Trial Credits Earned'
          value={totalTrialCredits}
          buttonText='Details'
        />
      </div>
    )
  }
}

CreditsPane.propTypes = {
  totalPaidCredits: PropTypes.string.isRequired,
  getTrialCredits: PropTypes.func.isRequired,
  getPaidCredits: PropTypes.func.isRequired
}

export default CreditsPane

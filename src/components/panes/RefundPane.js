import React from 'react'
import HalfPane from './HalfPane'
const CreditsPane = props => {
  const { classes } = props
  return (
    <div>
      <HalfPane title='Tutor Refund' value={0} buttonText='Comming Soon' />
      <div className={classes.gap}>&nbsp;</div>
      <HalfPane title='Student Refund' value={0} buttonText='Comming Soon' />
    </div>
  )
}

CreditsPane.propTypes = {}

export default CreditsPane

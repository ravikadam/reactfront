import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap'
  },
  filledChip: {
    margin: theme.spacing.unit,
    color: 'white'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

const TutorList = props => {
  const { classes, tutorList, isTutorSelected, onTutorSelect } = props
  const onClick = tutorId => {
    onTutorSelect(tutorId)
  }
  return (
    <div className={classes.root}>
      {tutorList.map((tutorId, ind) => {
        return (
          <Chip
            key={tutorId}
            label={'Certified Tutor' + (ind + 1)}
            className={
              isTutorSelected(tutorId) ? classes.filledChip : classes.chip
            }
            color={isTutorSelected(tutorId) ? 'primary' : 'default'}
            onClick={onClick.bind(null, tutorId)}
          />
        )
      })}
    </div>
  )
}

TutorList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TutorList)

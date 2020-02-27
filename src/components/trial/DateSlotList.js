import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { formatDate } from '../../helpers/utils'
import DoneIcon from '@material-ui/icons/DoneOutlined'

import { OPEN, RESERVED } from '../../constants/slotStatus'
const styles = theme => ({
  dense: {
    marginTop: 19
  },
  grid: {},
  root: {},
  items: {},
  slot_items: {
    marginTop: 9
  },
  footnote: {
    fontStyle: 'italic',
    color: '#3d3d3d',
    paddingBottom: 7,
    fontSize: '0.75rem'
  },
  button: {
    width: '100%'
  },
  buttonSelected: {
    color: 'white',
    width: '100%'
  },
  text: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: '12px',
    fontWeight: '600'
  },
  items2: {},
  textOpen: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: '12px',
    fontWeight: '600'
  },
  icon: {
    fontSize: '16px',
    fontWeight: 'bold',
    visibility: 'visible'
  },
  innerTop: {},
  title_text: {
    fontSize: '16pt',
    fontWeight: '600',
    fontFamily: 'Fjalla One',
    paddingTop: 19,
    paddingBottom: 9
  },
  iconVisibility: {
    fontSize: '16px',
    fontWeight: 'bold',
    visibility: 'hidden'
  }
})
const SlotListComponent = props => {
  const { classes, slots, handleDateSelect, selectedDate } = props

  const getAvailableSlots = slot =>
    slots[slot].filter(
      timeSlot => timeSlot['status'] === OPEN || timeSlot['status'] === RESERVED
    )
  const isSlotSelected = slot => slot === selectedDate
  const isSlotDisabled = slot => {
    return getAvailableSlots(slot).length === 0
  }
  const getAvailableSlotMessage = slot => {
    let timeSlots = getAvailableSlots(slot)
    if (timeSlots.length === 1) {
      return 'Only One Slot available'
    } else if (timeSlots.length === 0) {
      return 'No Slot available'
    } else {
      return `${timeSlots.length} slots available`
    }
  }

  return (
    <div>
      <Paper>
        <Grid container direction='column' alignItems='center'>
          <Grid item>
            <Typography className={classes.title_text}>
              Select a date for your trial session
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              className={classes.demo}
              justify='center'
              spacing={0}
            >
              {Object.keys(slots).map(slot => (
                <Grid item className={classes.slot_items} key={slot}>
                  <Button
                    variant={isSlotSelected(slot) ? 'contained' : 'outlined'}
                    color={'secondary'}
                    disabled={isSlotDisabled(slot)}
                    className={
                      isSlotSelected(slot)
                        ? classes.buttonSelected
                        : classes.button
                    }
                    onClick={() => handleDateSelect(slot)}
                    size='large'
                  >
                    <Typography
                      color={isSlotDisabled(slot) ? 'default' : 'inherit'}
                      variant='button'
                      className={
                        isSlotDisabled(slot) ? classes.text : classes.textOpen
                      }
                    >
                      {formatDate(slot)}
                    </Typography>
                    <DoneIcon
                      className={
                        selectedDate === slot
                          ? classes.icon
                          : classes.iconVisibility
                      }
                    />
                  </Button>
                  <Typography
                    variant='subtitle2'
                    className={classes.footnote}
                    align='right'
                  >
                    {getAvailableSlotMessage(slot)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(SlotListComponent)

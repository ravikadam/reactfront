import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ConfirmTrial from './ConfirmTrial'

import { OPEN, RESERVED } from '../../constants/slotStatus'
import { byFormat } from '../../helpers/dateHelper'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { formatDate } from '../../helpers/utils'
const displayFormat = 'hh:mm A'
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  dense: {
    marginTop: 19
  },
  slot_container: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap'
  },
  innerTop: {},
  selected_date_mobile: {
    background: `${theme.palette.secondary.main}`,
    width: '97%',
    display: 'flex',
    flexFlow: 'wrap',
    height: '50px',
    marginTop: 6,
    justifyContent: 'space-between'
  },
  selected_date: {
    background: `${theme.palette.secondary.main}`,
    height: '50px',
    width: '97%'
  },
  selected_date_text: {
    paddingTop: 2,
    color: 'white',
    fontSize: '16pt',
    fontFamily: 'Fjalla One'
  },
  title_text: {
    fontSize: '16pt',
    fontWeight: '600',
    fontFamily: 'Fjalla One',
    paddingTop: 9
  },
  button: {
    margin: theme.spacing.unit
  },
  text: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: '12px',
    fontWeight: '600'
  },
  textOpen: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: '12px',
    fontWeight: '600'
  },
  icon: {
    fontWeight: 'bold',
    visibility: 'visible',
    color: 'white'
  },
  items: {},
  items2: {},
  grid: {},
  iconDisabled: {
    color: '#dddddd'
  },
  dateHeaderContainer: {}
})

class TimeSlotComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleSlotSelection = props.handleSlotSelection
    this.selectedTimeSlot = ''
    this.classes = this.props.classes
    this.selectNextSlot = this.props.selectNextSlot
    this.selectPreviousSlot = this.props.selectPreviousSlot
    //BIND
    this.selectSlot = this.selectSlot.bind(this)
    this.confirmSlot = this.confirmSlot.bind(this)
    this.handleSlotSelection = this.handleSlotSelection.bind(this)
    this.getAvailableSlots = this.getAvailableSlots.bind(this)
    this.isSlotSeleted = this.isSlotSeleted.bind(this)
  }
  selectSlot(slot) {
    this.selectedTimeSlot = slot
    this.setState({
      open: true
    })
  }
  confirmSlot(status) {
    this.setState({
      open: false
    })
    if (status === 'confirm') {
      this.handleSlotSelection(this.selectedTimeSlot)
    }
  }
  getAvailableSlots() {
    return this.props.selectedTimeSlot.filter(
      timeSlot => timeSlot['status'] === OPEN || timeSlot['status'] === RESERVED
    )
  }
  isSlotSeleted(selectedSlot) {
    return selectedSlot === this.selectedTimeSlot
  }

  render() {
    return (
      <div>
        <Paper>
          <Grid
            container
            className={this.props.classes.root}
            spacing={16}
            direction='column'
            alignItems='center'
            alignContent='center'
          >
            <Grid
              item
              className={
                this.props.isMobile()
                  ? this.props.classes.selected_date_mobile
                  : this.props.classes.selected_date
              }
              sm={12}
            >
              {this.props.isMobile() && (
                <div>
                  <Button disabled={!this.props.isPreviousSlotAvailable}>
                    <ArrowBack
                      className={
                        this.props.isPreviousSlotAvailable
                          ? this.classes.icon
                          : this.classes.iconDisabled
                      }
                      onClick={this.selectPreviousSlot}
                    />
                  </Button>
                </div>
              )}
              <div>
                <Typography
                  className={this.classes.selected_date_text}
                  align='center'
                >
                  {formatDate(this.props.selectedDate)}
                </Typography>
              </div>
              {this.props.isMobile() && (
                <div>
                  <Button disabled={!this.props.isNextSlotAvailable}>
                    <ArrowForward
                      className={
                        this.props.isNextSlotAvailable
                          ? this.classes.icon
                          : this.classes.iconDisabled
                      }
                      onClick={this.selectNextSlot}
                    />
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item>
              <Typography className={this.classes.title_text} align='center'>
                Select a slot for your trial session
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction='row'
                className={this.classes.slot_container}
                spacing={0}
              >
                {this.getAvailableSlots().map(timeSlot => (
                  <div key={timeSlot.start_date}>
                    <Button
                      variant={
                        this.isSlotSeleted(timeSlot) ? 'contained' : 'outlined'
                      }
                      color={'primary'}
                      className={this.classes.button}
                      onClick={() => this.selectSlot(timeSlot)}
                      size='large'
                    >
                      <Typography
                        color={'inherit'}
                        variant='button'
                        className={this.classes.textOpen}
                      >
                        {byFormat(timeSlot.start_date, displayFormat)}
                      </Typography>
                    </Button>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <ConfirmTrial
            open={this.state.open}
            onClose={this.confirmSlot}
            selectedDate={this.props.selectedDate}
            selectedTime={this.selectedTimeSlot}
          />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(TimeSlotComponent)

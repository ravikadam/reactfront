import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import { blue } from '@material-ui/core/colors'
import { formatDate, helpDeskNumber } from '../../helpers/utils'
import { byFormat } from '../../helpers/dateHelper'
const displayFormat = 'hh:mm A'
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  dense: {
    marginTop: 19
  },
  paper: {
    position: 'absolute'
  },
  slotcontainer: {
    width: 400
  },
  button: {
    marginTop: 5,
    color: '#33CAFF'
  },
  schedule_description: {
    margin: 10
  },
  selected_date: {
    width: '95%'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: blue
  },
  typography: {
    useNextVariants: true
  }
})

const FailedTrialBookingComponent = props => {
  const { classes, selectedDate, selectedTime } = props

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.root}
          spacing={16}
          direction='column'
          alignItems='center'
        >
          <Grid item>
            <MuiThemeProvider theme={theme}>
              <Typography variant='h8'>
                Slot no longer available!!!!!!
              </Typography>
            </MuiThemeProvider>
          </Grid>

          <Grid item justify='center' className={classes.schedule_description}>
            <MuiThemeProvider theme={theme}>
              <Typography variant='subtitle1'>
                Trial slot
                <span style={{ color: '#33CAFF' }}>
                  {byFormat(selectedTime.start_date, displayFormat)}
                </span>{' '}
                on{' '}
                <span style={{ color: 'orange' }}>
                  {formatDate(selectedDate)}{' '}
                </span>
                is not longer available
              </Typography>
            </MuiThemeProvider>
          </Grid>
          <Grid item justify='center'>
            <Typography variant='subtitle2'>
              Please try for some other slot
            </Typography>
          </Grid>
          <Grid item justify='center'>
            <Typography variant='subtitle2'>Or</Typography>
          </Grid>
          <Grid item justify='center'>
            <Typography variant='subtitle2'>
              Call us at{' '}
              <span style={{ color: theme.palette.secondary.main }}>
                {helpDeskNumber}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(FailedTrialBookingComponent)

import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import { blue } from '@material-ui/core/colors'
import Link from '@material-ui/core/Link'
import { formatDate, helpDeskNumber } from '../../helpers/utils'
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

const UnAvailableSlotComponent = props => {
  const { classes, selectedDate, selectedTime } = props

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.root}
          spacing={10}
          direction='column'
          alignItems='center'
        >
          <Grid item>
            <MuiThemeProvider theme={theme}>
              <Typography variant='h6'>We are Overbooked!!!</Typography>
            </MuiThemeProvider>
          </Grid>

          <Grid item justify='center' className={classes.schedule_description}>
            <Typography variant='subtitle1'>
              There are not slots available currently.
            </Typography>
          </Grid>

          <Grid item justify='center' className={classes.schedule_description}>
            <Typography variant='subtitle1'>
              Please try again tomorrow or call us at{' '}
              <span style={{ color: theme.palette.secondary.main }}>
                {helpDeskNumber}{' '}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(UnAvailableSlotComponent)

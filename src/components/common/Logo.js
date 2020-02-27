import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

const logoImg = require('../../images/logo.png')

const styles = theme => ({
  preavatar: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: 65,
    paddingTop: 2,
    marginBottom: -16,
    marginTop: -16
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 165
  },
  white: {
    color: '#FFFFFF!important'
  }
})

const Logo = props => {
  const { classes } = props
  return (
    <div className={classes.preavatar} align='center'>
      <div className={classes.avatar}>
        <Grid container justify='center'>
          <Grid spacing={24} alignItems='center' justify='center' container>
            <Grid item xs={12}>
              <img width={150} src={logoImg} alt='' />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles)(Logo)

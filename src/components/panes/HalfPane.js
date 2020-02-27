import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {},
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  heading: {
    fontFamily: 'Fjalla One',
    letterSpacing: '0.05rem',
    fontSize: '1.2rem',
    lineHeight: 1
  },
  actionButton: {
    textTransform: 'uppercase',
    color: 'white',
    width: 150
  }
})

const HalfPane = props => {
  const { title, value, buttonText, classes, disabled, href, target } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <div>
            <Typography
              color='secondary'
              gutterBottom
              className={classes.heading}
            >
              {title}
            </Typography>
          </div>
          <div>
            <Typography component='p' gutterBottom>
              {value}
            </Typography>
          </div>
          <div className={classes.alignRight}>
            {href && (
              <Button
                color='secondary'
                variant='contained'
                className={classes.actionButton}
                disabled={disabled}
                href={href}
                target={target}
              >
                {buttonText}
              </Button>
            )}
            {!href && (
              <Button
                color='secondary'
                variant='contained'
                className={classes.actionButton}
                disabled={disabled}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

HalfPane.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default withStyles(styles)(HalfPane)

import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import yellow from '@material-ui/core/colors/yellow'
import { helpDeskNumber } from '../../helpers/utils'

import Star from '@material-ui/icons/Star'

const styles = theme => ({
  root: { height: '50%' },
  cardContent: {
    paddingTop: '8px'
  },
  grid: {},
  paper: {},
  sessionDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  starsLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left'
  },
  loadingState: {},
  loadingMessage: {},
  stars: {
    color: yellow[700]
  },
  callButton: {
    backgroundColor: yellow[700]
  },
  className: {
    color: theme.palette.primary.main,
    fontWeight: '500',
    marginRight: '3px'
  }
})

const SessionDetails = props => {
  const { classes, student, tutor, sessionDetails, stars } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.sessionDetails}>
            <div>
              <b>Tutor: </b>
              {tutor ? tutor.name : ''}
              {'   '}
            </div>
            <div>
              <Typography>
                <span className={classes.className}>
                  {sessionDetails ? sessionDetails.name : ' '}
                </span>
                <span>| {'  '}</span>
                {sessionDetails ? sessionDetails.session_number : ' '}
              </Typography>
            </div>
            <div>
              <Typography>
                <b>Call us at:{'  '}</b>
                {helpDeskNumber}
              </Typography>
            </div>
          </div>
          <div>&nbsp;</div>
          <div className={classes.starsLayout}>
            <div>
              <b>
                {student ? student.name : ''}'s Stars: &nbsp;{'   '}
              </b>
            </div>
            <div className={classes.stars}>
              {Array.from(Array(stars)).map(i => (
                <Star />
              ))}
            </div>
            <div>({stars})</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

SessionDetails.propTypes = {}

export default withStyles(styles)(SessionDetails)

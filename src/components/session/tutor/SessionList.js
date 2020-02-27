import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/deepPurple'

import Button from '@material-ui/core/Button'

import yellow from '@material-ui/core/colors/yellow'
import { formatDate } from '../../../helpers/dateHelper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  root: { height: '50%' },
  card: {
    marginTop: '15px'
  },
  cardContent: {
    paddingTop: '8px'
  },
  display: {
    display: 'flex'
  },
  sessionDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  starsLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  callButton: {
    backgroundColor: yellow[700]
  },
  className: {
    color: theme.palette.primary.main,
    fontWeight: '500',
    marginRight: '3px'
  },
  dateTitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '15px',
    justifyContent: 'flex-end'
  },
  classTimings: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  classTimingsItems: {
    marginRight: '15px'
  },
  button: {
    color: 'white'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleText: {
    textTransform: 'capitalize',
    marginRight: `${theme.spacing.unit}px`
  },
  timeTitle: {
    fontSize: '14px'
  },
  timeIcon: {
    fontSize: '14px'
  },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  studentDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  pos: {
    paddingTop: 3,
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  studentAvatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatar: {
    marginRight: `${theme.spacing.unit}px`,
    marginBottom: 5,
    height: '30px',
    width: '30px',
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  studentName: {
    paddingTop: '8px',
    marginLeft: '5px'
  },
  studentStars: {
    paddingTop: '-10px',
    marginLeft: '5px'
  },
  stars: {
    marginTop: '5px'
  },
  starsFilled: {
    color: yellow[700],
    marginTop: '5px'
  },
  tableWrapper: {
    overflow: 'hidden',
    overflowY: 'scroll',
    height: '800px'
  },
  table: {
    minWidth: 700
  },
  action: {
    fontSize: '10px'
  }
})

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

const getPayload = booking => {
  return {
    bookingId: booking.id,
    sessionId: booking.session.id,
    isTrial: booking.session.session_master.is_trial
  }
}
const SessionList = props => {
  const {
    classes,
    unresolvedSessions,
    endSession,
    endSessionNoShow,
    endSessionNoShowTech
  } = props
  const handleEndSession = booking => {
    endSession(getPayload(booking))
  }
  const handleEndSessionNoShow = booking => {
    endSessionNoShow(getPayload(booking))
  }
  const handleEndSessionNoShowTech = booking => {
    endSessionNoShowTech(getPayload(booking))
  }

  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Session Date</StyledTableCell>
            <StyledTableCell align='right'>Student Name</StyledTableCell>
            <StyledTableCell align='right'>Class Name</StyledTableCell>
            <StyledTableCell align='right'>Technical Issues</StyledTableCell>
            <StyledTableCell align='right'>Student Absent</StyledTableCell>
            <StyledTableCell align='right'>Class Completed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unresolvedSessions.map(row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component='th' scope='row'>
                {formatDate(row.slot.start_date)}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.student.name}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.session.session_master.session_number}
              </StyledTableCell>
              <TableCell align='right'>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.action}
                  onClick={() => handleEndSessionNoShowTech(row)}
                >
                  Technical Issues
                </Button>
              </TableCell>
              <TableCell align='right'>
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.action}
                  onClick={() => handleEndSessionNoShow(row)}
                >
                  Student Absent
                </Button>
              </TableCell>
              <TableCell align='right'>
                <Button
                  variant='contained'
                  className={classes.action}
                  color='secondary'
                  onClick={() => handleEndSession(row)}
                >
                  Class Completed
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

SessionList.propTypes = {}

export default withStyles(styles)(SessionList)

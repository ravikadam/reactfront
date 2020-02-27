import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'

import { Formik } from 'formik'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import Logo from '../components/common/Logo'
import Sidebar from '../components/common/Sidebar'
import Alert from '../components/common/Alert'
import DetailsForm from '../components/form/DetailsForm'

// Schema
import { validationSchema, validationSchemaPwd } from '../schemas/signup'

// Reducers
import { updateProfileDetails } from '../actions'
import { getIsSubmitting, getErrorMessage, getLoggedInUser } from '../reducers'

const styles = theme => ({
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  grid: {
    margin: `0 ${theme.spacing.unit}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  header: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  heading: {
    fontFamily: 'Fjalla One'
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: `${theme.spacing.unit * 2}px`,
    backgroundColor: theme.palette.secondary['A100']
  }
})

class SignupDetails extends Component {
  componentDidMount() {
    if (
      this.props.loggedInUser &&
      this.props.loggedInUser.grade &&
      this.props.loggedInUser.grade != 0 &&
      this.props.loggedInUser.mobile
    )
      window.location.href = '/'

    window.mixpanel.track('SignUp Details Loaded')
    window.fbq('track', 'details requested')
  }

  render() {
    const {
      classes,
      onSubmit,
      onErrorClose,
      isSubmitting,
      errorMessage,
      loggedInUser
    } = this.props

    const trimInputs = values =>
      Object.keys(values).reduce((res, key) => {
        res[key] =
          values[key] && typeof values[key] === 'string'
            ? values[key].trim()
            : values[key]
        return res
      }, {})

    const handleSubmit = (values, { setSubmitting, setValues }) => {
      setSubmitting(true)
      const finValues = trimInputs(values)
      setValues(finValues, false)
      onSubmit(finValues)
    }
    const onAlertClose = () => {
      onErrorClose(false)
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify='center'>
            <Grid
              spacing={24}
              alignItems='center'
              justify='center'
              container
              className={classes.grid}
            >
              <Grid item sm={1} xs={12} />
              <Grid item sm={6} xs={12}>
                <Logo />
                <Paper className={classes.paper}>
                  <div className={classes.header}>
                    <Typography
                      component='h1'
                      variant='h5'
                      gutterBottom
                      className={classes.heading}
                    >
                      {loggedInUser.grade && (
                        <span>Please pick a password</span>
                      )}
                      {!loggedInUser.grade && (
                        <span>
                          Just some details before we schedule the session
                        </span>
                      )}
                    </Typography>
                  </div>
                  <Formik
                    render={props => {
                      return (
                        <DetailsForm
                          {...props}
                          reduxIsSubmitting={isSubmitting}
                          loggedInUser={loggedInUser}
                        />
                      )
                    }}
                    initialValues={{
                      email: loggedInUser.email ? loggedInUser.email : '',
                      mobile: loggedInUser.mobile ? loggedInUser.mobile : '',
                      parentName: loggedInUser.parentName
                        ? loggedInUser.parentName
                        : '',
                      grade: loggedInUser.grade ? loggedInUser.grade : '0',
                      name: loggedInUser.name ? loggedInUser.name : '',
                      password: '',
                      confirmPassword: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  />
                </Paper>
              </Grid>
              <Grid item sm={5} xs={12}>
                <Sidebar />
              </Grid>
            </Grid>
          </Grid>
        </div>
        {errorMessage && (
          <Alert
            open={!!errorMessage}
            handleClose={onAlertClose}
            alertMessage={errorMessage}
            alertTitle='Error'
            buttonText='OK'
          />
        )}
      </React.Fragment>
    )
  }
}

SignupDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSubmitting: getIsSubmitting(state),
    errorMessage: getErrorMessage(state),
    loggedInUser: getLoggedInUser(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: data => {
      dispatch(updateProfileDetails.request(data))
    },
    onErrorClose: flg => {
      dispatch(updateProfileDetails.errorClose(flg))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SignupDetails)))

import React from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'

import Logo from '../components/common/Logo'
import Alert from '../components/common/Alert'
import OTPForm from '../components/form/OTPForm'
import Sidebar from '../components/common/Sidebar'
import SignUpForm from '../components/form/SignUpForm'

import { sendotp, signup } from '../actions'
import { setStudentMobile, getStudentMobile } from '../helpers/utils'
import {
  reginitValues,
  regAdminInitValues,
  validationSchemaMobile,
  validationSchemaOTP
} from '../schemas/signup'
import {
  getIsOTPSent,
  getErrorMessage,
  getIsSubmitting,
  getIsSending
} from '../reducers'

const styles = theme => ({
  grid: {
    margin: 0
  },
  nounderline: {
    textDecoration: 'none',
    width: 280,
    marginTop: 19
  },
  divider: {
    marginTop: 29,
    width: '100%',
    borderTop: '2px solid #6A6A6A'
  },
  dividertext: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    top: -12,
    fontWeight: 600
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 19
  },
  heading: {
    fontFamily: 'Fjalla One'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    backgroundColor: theme.palette.secondary['A100']
  }
})

const AdminSignup = props => {
  const {
    classes,
    onSubmit,
    onOTPSubmit,
    onErrorClose,
    isSending,
    isSubmitting,
    isOTPSent,
    errorMessage
  } = props

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
    var finValues = trimInputs(values)
    if (isOTPSent) {
      finValues.mobile = getStudentMobile()
      onOTPSubmit(finValues)
      setValues(finValues, false)
    } else {
      setStudentMobile(finValues.mobile)
      setValues(finValues, false)
      onSubmit(finValues)
    }
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
                    Sign-Up and Get a Free Trial Session Now
                  </Typography>
                  <Typography component='h1' variant='body1' gutterBottom>
                    Equip your kids with education for tomorrow.
                  </Typography>
                </div>
                {isOTPSent && (
                  <Formik
                    render={props => {
                      return (
                        <OTPForm {...props} reduxIsSubmitting={isSubmitting} />
                      )
                    }}
                    initialValues={reginitValues}
                    validationSchema={validationSchemaOTP}
                    onSubmit={handleSubmit}
                  />
                )}
                {!isOTPSent && (
                  <Formik
                    render={props => {
                      return (
                        <SignUpForm {...props} reduxIsSubmitting={isSending} />
                      )
                    }}
                    initialValues={regAdminInitValues}
                    validationSchema={validationSchemaMobile}
                    onSubmit={handleSubmit}
                  />
                )}
                <div>&nbsp;</div>
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

AdminSignup.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isSending: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSubmitting: getIsSubmitting(state),
    isSending: getIsSending(state),
    isOTPSent: getIsOTPSent(state),
    errorMessage: getErrorMessage(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: data => {
      dispatch(sendotp.request(data))
    },
    onErrorClose: flg => {
      dispatch(signup.errorClose(flg))
    },
    onOTPSubmit: data => {
      dispatch(signup.request(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(AdminSignup)))

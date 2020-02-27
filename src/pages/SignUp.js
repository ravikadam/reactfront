import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  FacebookLoginButton,
  LinkedInLoginButton,
  GoogleLoginButton,
  /*   InstagramLoginButton,
    TwitterLoginButton,
    MicrosoftLoginButton,
    AmazonLoginButton, */
  GithubLoginButton
} from 'react-social-login-buttons'

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

import { config } from '../config'
import signUp from '../reducers/signUp'
import { sendotp, signup } from '../actions'
import { setStudentMobile, getStudentMobile } from '../helpers/utils'
import {
  reginitValues,
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
    marginTop: 10
  },
  heading: {
    fontFamily: 'Fjalla One'
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
  disclaimer: {
    fontStyle: 'italic',
    color: '#3d3d3d',
    fontSize: '0.85rem',
    fontWeight: 600,
    paddingLeft: '10px',
    paddingRight: '10px'
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

class Signup extends Component {
  componentDidMount() {
    window.mixpanel.track('SignUp Loaded')
    window.fbq('track', 'landed')
  }

  render() {
    const {
      classes,
      onSubmit,
      onOTPSubmit,
      onErrorClose,
      isSending,
      isSubmitting,
      isOTPSent,
      errorMessage
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
      var finValues = trimInputs(values)
      if (isOTPSent) {
        finValues.mobile = getStudentMobile()
        window.mixpanel.track('OTP submittted')
        window.fbq('track', 'otp submitted')
        onOTPSubmit(finValues)
        setValues(finValues, false)
      } else {
        setStudentMobile(finValues.mobile)
        setValues(finValues, false)
        window.mixpanel.track('OTP requested')
        window.fbq('track', 'otp sent')
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
                      className={classes.heading}
                      gutterBottom
                    >
                      Get a Free Trial Coding Class Now
                    </Typography>
                    <Typography component='h1' variant='body1' gutterBottom>
                      Equip your kids with education for tomorrow.
                    </Typography>
                  </div>
                  {isOTPSent && (
                    <Formik
                      render={props => {
                        return (
                          <OTPForm
                            {...props}
                            reduxIsSubmitting={isSubmitting}
                          />
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
                          <SignUpForm
                            {...props}
                            reduxIsSubmitting={isSending}
                          />
                        )
                      }}
                      initialValues={reginitValues}
                      validationSchema={validationSchemaMobile}
                      onSubmit={handleSubmit}
                    />
                  )}
                  <div className={classes.disclaimer} align='center'>
                    A Laptop / Desktop with a good internet connection is
                    required.
                  </div>
                  <div className={classes.divider} align='center'>
                    <span className={classes.dividertext}>
                      &nbsp;&nbsp;&nbsp;&nbsp;Or Sign Up
                      With&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                  <a
                    href={`${config.apiUrl}/auth/facebook`}
                    className={classes.nounderline}
                  >
                    <FacebookLoginButton
                      text='Sign Up With Facebook'
                      type='button'
                    />
                  </a>
                  <a
                    href={`${config.apiUrl}/auth/google`}
                    className={classes.nounderline}
                  >
                    <GoogleLoginButton
                      text='Sign Up With Google'
                      type='button'
                    />
                  </a>
                  {/* <a
                  href={`${config.apiUrl}/auth/linkedin`}
                  className={classes.nounderline}
                >
                  <LinkedInLoginButton
                    text='Sign Up With LinkedIn'
                    type='button'
                  />
                </a> */}
                  {/*                 <a
                  href={`${config.apiUrl}/auth/instagram`}
                  className={classes.nounderline}
                >
                  <InstagramLoginButton
                    text='Sign Up With Instagram'
                    type='button'
                  />
                </a>
                <a
                  href={`${config.apiUrl}/auth/twitter`}
                  className={classes.nounderline}
                >
                  <TwitterLoginButton
                    text='Sign Up With Twitter'
                    type='button'
                  />
                </a>
                <a
                  href={`${config.apiUrl}/auth/microsoft`}
                  className={classes.nounderline}
                >
                  <MicrosoftLoginButton
                    text='Sign Up With Microsoft'
                    type='button'
                  />
                </a>
                <a
                  href={`${config.apiUrl}/auth/amazon`}
                  className={classes.nounderline}
                >
                  <AmazonLoginButton
                    text='Sign Up With Amazon'
                    type='button'
                  />
                </a>
 */}
                  {/* <a
                  href={`${config.apiUrl}/auth/github`}
                  className={classes.nounderline}
                >
                  <GithubLoginButton text='Sign Up With Github' type='button' />
                </a> */}
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
}

Signup.propTypes = {
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
)(withRouter(withStyles(styles)(Signup)))

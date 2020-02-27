import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Logo from '../components/common/Logo'
import Sidebar from '../components/common/Sidebar'
import Alert from '../components/common/Alert'
import LoginForm from '../components/form/LoginForm'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'

import { initValues, validationSchema } from '../schemas/login'
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

import { config } from '../config'
// Reducers
import { login } from '../actions'
import { getIsSubmitting, getErrorMessage } from '../reducers'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: `${theme.spacing.unit * 2}px`
  },
  heading: {
    fontFamily: 'Fjalla One'
  },
  grid: {
    margin: `0 ${theme.spacing.unit}px`
  },
  button: {},
  dense: {
    height: 10
  },
  nounderline: {
    textDecoration: 'none',
    width: 280,
    marginTop: 19
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    backgroundColor: theme.palette.background.paper
  }
})

class Login extends Component {
  componentDidMount() {
    window.mixpanel.track('Login Loaded')
    window.fbq('track', 'landed')
  }

  render() {
    const {
      classes,
      onSubmit,
      onErrorClose,
      isSubmitting,
      errorMessage
    } = this.props

    const handleSubmit = (values, { setSubmitting }) => {
      setSubmitting(true)
      onSubmit(values)
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
                      className={classes.heading}
                      noWrap
                      gutterBottom
                    >
                      Sign In
                    </Typography>
                  </div>
                  <Formik
                    render={props => {
                      return (
                        <LoginForm
                          {...props}
                          reduxIsSubmitting={isSubmitting}
                        />
                      )
                    }}
                    initialValues={initValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  />

                  <Typography variant='h5' gutterBottom>
                    <Link
                      component={RouterLink}
                      variant='body1'
                      to='/forgotpassword'
                    >
                      Forgot password? Sign In with OTP
                    </Link>
                  </Typography>
                  <Typography variant='h5' gutterBottom>
                    <Link
                      variant='body1'
                      color='secondary'
                      className={classes.button}
                      component={RouterLink}
                      to='/signup'
                    >
                      Not Registered! Sign Up Now
                    </Link>
                  </Typography>
                  <div className={classes.header}>
                    <a
                      href={`${config.apiUrl}/auth/facebook`}
                      className={classes.nounderline}
                    >
                      <FacebookLoginButton
                        text='Sign In With Facebook'
                        type='button'
                      />
                    </a>
                    <div className={classes.dense}>&nbsp;</div>
                    <a
                      href={`${config.apiUrl}/auth/google`}
                      className={classes.nounderline}
                    >
                      <GoogleLoginButton
                        text='Sign In With Google'
                        type='button'
                      />
                    </a>
                    <div className={classes.dense}>&nbsp;</div>
                    {/* <a
                    href={`${config.apiUrl}/auth/linkedin`}
                    className={classes.nounderline}
                  >
                    <LinkedInLoginButton
                      text='Sign In With LinkedIn'
                      type='button'
                    />
                  </a> */}
                    {/*                   <div className={classes.dense}>&nbsp;</div>
                  <a
                    href={`${config.apiUrl}/auth/instagram`}
                    className={classes.nounderline}
                  >
                    <InstagramLoginButton
                      text='Sign In With Instagram'
                      type='button'
                    />
                  </a>
                  <div className={classes.dense}>&nbsp;</div>
                  <a
                    href={`${config.apiUrl}/auth/twitter`}
                    className={classes.nounderline}
                  >
                    <TwitterLoginButton
                      text='Sign In With Twitter'
                      type='button'
                    />
                  </a>
                  <div className={classes.dense}>&nbsp;</div>
                  <a
                    href={`${config.apiUrl}/auth/microsoft`}
                    className={classes.nounderline}
                  >
                    <MicrosoftLoginButton
                      text='Sign In With Microsoft'
                      type='button'
                    />
                  </a>
                  <div className={classes.dense}>&nbsp;</div>
                  <a
                    href={`${config.apiUrl}/auth/amazon`}
                    className={classes.nounderline}
                  >
                    <AmazonLoginButton
                      text='Sign In With Amazon'
                      type='button'
                    />
                  </a>
 */}
                    <div className={classes.dense}>&nbsp;</div>
                    {/* <a
                    href={`${config.apiUrl}/auth/github`}
                    className={classes.nounderline}
                  >
                    <GithubLoginButton
                      text='Sign In With Github'
                      type='button'
                    />
                  </a> */}
                  </div>
                </Paper>
              </Grid>
              <Grid item sm={5} xs={12}>
                <Sidebar />
              </Grid>
            </Grid>
          </Grid>
        </div>
        {errorMessage !== '' && (
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSubmitting: getIsSubmitting(state, true),
    errorMessage: getErrorMessage(state, true)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: data => {
      dispatch(login.request(data))
    },
    onErrorClose: flg => {
      dispatch(login.errorClose(flg))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Login)))

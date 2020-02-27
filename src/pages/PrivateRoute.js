// Global
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import { getIsAuthenticated, getUserRole, authInProgress } from '../reducers'
import Authentication from '../components/Authenticate'

import { authentication } from '../actions'

const PrivateRoute = props => {
  const {
    isAuthenticated,
    onAuthenticationFailed,
    comp: Component,
    authInProgress
  } = props

  return (
    <Route
      {...props}
      render={props => {
        console.log('executed now')
        return (
          <Authentication
            comp={Component}
            isAuthenticated={isAuthenticated}
            onAuthenticationFailed={onAuthenticationFailed}
            authInProgress={authInProgress}
            {...props}
          />
        )
      }}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    userRole: getUserRole(state),
    authInProgress: authInProgress(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAuthenticationFailed: () => {
      const from = ownProps.path
      dispatch(authentication.request({ from }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivateRoute))

import { combineReducers } from 'redux'
import { actionTypes } from '../actions'
const { AUTHENTICATE, REQUEST, FAILURE, SUCCESS, LOGIN } = actionTypes

const authUser = () => {
  const isAuthenticated = (state = false, payLoad) => {
    switch (payLoad.type) {
      case AUTHENTICATE[SUCCESS]:
        return true
      case LOGIN[REQUEST]:
      case LOGIN[SUCCESS]:
      case LOGIN[FAILURE]:
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
        return false
      default:
        return state
    }
  }

  const authInProgress = (state = false, payLoad) => {
    switch (payLoad.type) {
      case AUTHENTICATE[REQUEST]:
        return true
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[SUCCESS]:
        return false
      default:
        return state
    }
  }

  const needAuthentication = (state = false, payLoad) => {
    switch (payLoad.type) {
      case LOGIN[SUCCESS]:
        return true
      case AUTHENTICATE[SUCCESS]:
      case LOGIN[FAILURE]:
      case LOGIN[REQUEST]:
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
        return false
      default:
        return state
    }
  }

  const lastAccessedRoute = (state = '', action) => {
    switch (action.type) {
      case AUTHENTICATE[REQUEST]:
        return action.data.from
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[SUCCESS]:
      default:
        return state
    }
  }

  const loggedInUser = (state = {}, action) => {
    switch (action.type) {
      case AUTHENTICATE[SUCCESS]:
        return action.payload.user
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
        return {}
      default:
        return state
    }
  }

  return combineReducers({
    isAuthenticated,
    //lastAccessedRoute,
    loggedInUser,
    authInProgress,
    needAuthentication
  })
}

export default authUser

export const getLoggedInUser = state => state.loggedInUser

export const lastAccessedRoute = state => state.lastAccessedRoute

export const isAuthenticated = state => state.isAuthenticated

export const getLoggedInUserId = state => state.loggedInUser.id

export const getLoggedInUserCourseId = state => state.loggedInUser.course.id

export const authInProgress = state => state.authInProgress

export const getLoggedInUserRole = state => state.loggedInUser.role

export const isAuthenticationNeeded = state => state.needAuthentication

export const getLoggedInUserTimeZone = state => state.loggedInUser.timezone

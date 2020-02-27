import { combineReducers } from 'redux'
import { actionTypes } from '../actions'
import Constants from '../constants'
import messages from '../i18n'

const ErrorCodes = Constants.ErrorCodes
const { SUCCESS, FAILURE, REQUEST, LOGIN, ALERT_CLOSE } = actionTypes

const signUp = () => {
  const handleErrorPayLoadMessage = (state = {}, payLoad) => {
    switch (payLoad.type) {
      case ErrorCodes.INVALID_USER_PASSWORD:
        return messages['login.userpassinvalid']
      case ErrorCodes.INVALID_REQUEST:
      default:
        return messages['invalid_request']
    }
  }

  const isSubmitting = (state = false, action) => {
    switch (action.type) {
      case LOGIN[REQUEST]:
        return true
      case LOGIN[SUCCESS]:
      case LOGIN[FAILURE]:
        return false
      default:
        return state
    }
  }

  const errorMessage = (state = '', action) => {
    switch (action.type) {
      case LOGIN[REQUEST]:
        return ''
      case LOGIN[FAILURE]:
        return handleErrorPayLoadMessage(state, action.payload)
      case LOGIN[SUCCESS]:
        return ''
      case ALERT_CLOSE:
        return ''
      default:
        return state
    }
  }

  return combineReducers({
    isSubmitting,
    errorMessage
  })
}

export default signUp

export const getErrorMessage = state => state.errorMessage

export const isSubmitting = state => state.isSubmitting

import { combineReducers } from 'redux'
import { actionTypes } from '../actions'
import Constants from '../constants'
import messages from '../i18n'

console.log(messages, 'messsages')

const ErrorCodes = Constants.ErrorCodes
const { SUCCESS, FAILURE, REQUEST, SIGNUP, SENDOTP, ALERT_CLOSE } = actionTypes

const signUp = () => {
  const handleErrorPayLoadMessage = (state = {}, payLoad) => {
    switch (payLoad.type) {
      case ErrorCodes.EMAIL_ALREADY_EXIT:
        return messages['signup.emailexists']
      case ErrorCodes.INVALID_REQUEST:
        return messages['signup.invalid']
      default:
        return messages['signup.invalid']
    }
  }

  const isOTPSent = (state = false, action) => {
    switch (action.type) {
      case SENDOTP[SUCCESS]:
        return true
      default:
        return state
    }
  }

  const isSubmitting = (state = false, action) => {
    switch (action.type) {
      case SIGNUP[REQUEST]:
        return true
      case SIGNUP[SUCCESS]:
      case SIGNUP[FAILURE]:
        return false
      default:
        return state
    }
  }

  const isSending = (state = false, action) => {
    switch (action.type) {
      case SENDOTP[REQUEST]:
        return true
      case SENDOTP[SUCCESS]:
      case SENDOTP[FAILURE]:
        return false
      default:
        return state
    }
  }

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case SENDOTP[REQUEST]:
        return null
      case SENDOTP[FAILURE]:
        return handleErrorPayLoadMessage(state, action.payload)
      case SENDOTP[SUCCESS]:
        return null
      case ALERT_CLOSE:
        return null
      default:
        return state
    }
  }

  return combineReducers({
    isSubmitting,
    isSending,
    errorMessage,
    isOTPSent
  })
}

export default signUp

export const getErrorMessage = state => state.errorMessage

export const isSubmitting = state => state.isSubmitting

export const isSending = state => state.isSending

export const isOTPSent = state => state.isOTPSent

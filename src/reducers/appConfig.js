import { combineReducers } from 'redux'
import { actionTypes } from '../actions'
const { AUTHENTICATE, REQUEST, FAILURE, SUCCESS } = actionTypes

const config = () => {
  const appConfig = (state = {}, action) => {
    switch (action.type) {
      case AUTHENTICATE[SUCCESS]:
        return action.payload.config
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
        return {}
      default:
        return state
    }
  }

  return combineReducers({
    appConfig
  })
}

export default config

export const getSlotConstants = state => {
  const {
    MINIMUM_DAYS_TUTOR_OPEN_SLOT,
    MINIMUM_DAYS_TUTOR_EDIT_SLOT,
    MINIMUM_DAYS_STUDENT_CANCEL_BOOKING,
    MINIMUM_DAYS_STUDENT_BOOK_SLOT,
    BOOKING_ALLOWED_PER_DAY,
    BOOKING_ALLOWED_PER_WEEK
  } = state.appConfig
  return {
    MINIMUM_DAYS_TUTOR_OPEN_SLOT,
    MINIMUM_DAYS_TUTOR_EDIT_SLOT,
    MINIMUM_DAYS_STUDENT_CANCEL_BOOKING,
    MINIMUM_DAYS_STUDENT_BOOK_SLOT,
    BOOKING_ALLOWED_PER_DAY,
    BOOKING_ALLOWED_PER_WEEK
  }
}

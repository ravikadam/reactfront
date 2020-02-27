import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'

const {
  SUCCESS,
  FAILURE,
  REQUEST,
  GET_TOTAL_TRIAL_CREDITS,
  GET_TOTAL_PAID_CREDITS
} = actionTypes

const entity = () => {
  const totalTrialCredits = (state = 0, action) => {
    switch (action.type) {
      case GET_TOTAL_TRIAL_CREDITS[SUCCESS]:
        return action.payload.credits
      case GET_TOTAL_TRIAL_CREDITS[REQUEST]:
      case GET_TOTAL_TRIAL_CREDITS[FAILURE]:
        return 0
      default:
        return state
    }
  }

  const totalPaidCredits = (state = 0, action) => {
    switch (action.type) {
      case GET_TOTAL_PAID_CREDITS[SUCCESS]:
        return action.payload.credits
      case GET_TOTAL_PAID_CREDITS[REQUEST]:
      case GET_TOTAL_PAID_CREDITS[FAILURE]:
        return 0
      default:
        return state
    }
  }

  return combineReducers({
    totalTrialCredits,
    totalPaidCredits
  })
}

export default entity

export const getTotalTrialCredits = (state, props) => state.totalTrialCredits

export const getTotalPaidCredits = (state, props) => state.totalPaidCredits

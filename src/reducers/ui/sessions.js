import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'

const { SUCCESS, FAILURE, REQUEST, START_SESSION } = actionTypes

const sessions = () => {
  const isSessionStarting = (state = true, payLoad) => {
    switch (payLoad.type) {
      case START_SESSION[REQUEST]:
        return true
      case START_SESSION[SUCCESS]:
      case START_SESSION[FAILURE]:
        return false
      default:
        return state
    }
  }

  return combineReducers({
    isSessionStarting
  })
}

export default sessions

export const isSessionStarting = state => state.isSessionStarting

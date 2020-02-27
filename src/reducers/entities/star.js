import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'

const { SUCCESS, FAILURE, REQUEST, GET_TOTAL_STAR } = actionTypes

const entity = () => {
  const totalStars = (state = 0, action) => {
    switch (action.type) {
      case GET_TOTAL_STAR[SUCCESS]:
        return action.payload.stars
      case GET_TOTAL_STAR[REQUEST]:
      case GET_TOTAL_STAR[FAILURE]:
        return 0
      default:
        return state
    }
  }

  return combineReducers({
    totalStars
  })
}

export default entity

export const getTotalStars = (state, props) => state.totalStars

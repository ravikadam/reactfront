import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'

const {
  SUCCESS,
  FAILURE,
  GET_BOOKINGS,
  REQUEST,
  MINI_SCHEDULER_ACTIVITY_TOGGLE,
  MINI_SCHEDULER_ACTIVITY_TAB,
  GET_MASTER_SESSION,
  SESSION_PANE_CROUSAL_SELECTED,
  START_SESSION
} = actionTypes

const dashboard = () => {
  const isScheduleLoading = (state = true, payLoad) => {
    switch (payLoad.type) {
      case GET_BOOKINGS[REQUEST]:
        return true
      case GET_BOOKINGS[SUCCESS]:
      case GET_BOOKINGS[FAILURE]:
        return false
      default:
        return state
    }
  }

  const isMasterSessionLoading = (state = true, payLoad) => {
    switch (payLoad.type) {
      case GET_MASTER_SESSION[REQUEST]:
        return true
      case GET_MASTER_SESSION[SUCCESS]:
      case GET_MASTER_SESSION[FAILURE]:
        return false
      default:
        return state
    }
  }

  const miniSchedularToggleMap = (state = {}, payLoad) => {
    switch (payLoad.type) {
      case MINI_SCHEDULER_ACTIVITY_TOGGLE:
        const id = payLoad.data
        let data = {}
        data[id] = state[id] ? false : true
        return data
      default:
        return state
    }
  }

  const miniSchedularActivityTab = (state = 0, payLoad) => {
    switch (payLoad.type) {
      case MINI_SCHEDULER_ACTIVITY_TAB:
        return payLoad.data
      default:
        return state
    }
  }

  const activeSessionIndex = (state = 0, action) => {
    switch (action.type) {
      case GET_MASTER_SESSION[SUCCESS]:
        const { sessions } = action.payload
        return sessions.reduce((res, iSession, ind) => {
          if (iSession.sessions && iSession.sessions.length > 0) {
            res = ind
          }
          return res
        }, 0)
      case GET_MASTER_SESSION[REQUEST]:
      case GET_MASTER_SESSION[FAILURE]:
        return 0
      case SESSION_PANE_CROUSAL_SELECTED:
        return action.data
      default:
        return state
    }
  }

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
    isScheduleLoading,
    miniSchedularToggleMap,
    miniSchedularActivityTab,
    isMasterSessionLoading,
    activeSessionIndex,
    isSessionStarting
  })
}

export default dashboard

export const isScheduleLoading = state => state.isScheduleLoading

export const isMiniSchedularToggle = state => id =>
  state.miniSchedularToggleMap[id]

export const miniSchedularActivityTab = state => state.miniSchedularActivityTab

export const isMasterSessionLoading = state => state.isMasterSessionLoading

export const getActiveSessionIndex = state => state.activeSessionIndex

export const isSessionStarting = state => state.isSessionStarting

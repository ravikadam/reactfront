import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'

const {
  SUCCESS,
  FAILURE,
  REQUEST,
  GET_MASTER_SESSION,
  START_SESSION,
  GET_NEXT_SESSION_TO_BOOK,
  GET_UNRESOLVED_SESSIONS,
  END_SESSION,
  END_SESSION_NO_SHOW_TECH,
  END_SESSION_NO_SHOW
} = actionTypes

const entity = () => {
  const masterSessions = (state = [], action) => {
    switch (action.type) {
      case GET_MASTER_SESSION[SUCCESS]:
        return action.payload.sessions
      case GET_MASTER_SESSION[REQUEST]:
      case GET_MASTER_SESSION[FAILURE]:
        return []
      default:
        return state
    }
  }
  const startSession = (state = 0, action) => {
    switch (action.type) {
      case START_SESSION[SUCCESS]:
        return action.payload.session
      case START_SESSION[REQUEST]:
      case START_SESSION[FAILURE]:
        return {}
      default:
        return state
    }
  }

  const nextSession = (state = {}, action) => {
    switch (action.type) {
      case GET_NEXT_SESSION_TO_BOOK[SUCCESS]:
        return action.payload.session
      case GET_NEXT_SESSION_TO_BOOK[REQUEST]:
      case GET_NEXT_SESSION_TO_BOOK[FAILURE]:
        return {}
      default:
        return state
    }
  }

  const unresolvedSessions = (state = [], action) => {
    switch (action.type) {
      case GET_UNRESOLVED_SESSIONS[SUCCESS]:
        return action.payload.session.bookings
          ? action.payload.session.bookings
          : []
      case GET_UNRESOLVED_SESSIONS[REQUEST]:
      case GET_UNRESOLVED_SESSIONS[FAILURE]:
        return []
      default:
        return state
    }
  }

  const endSessionStatus = (state = false, action) => {
    switch (action.type) {
      case END_SESSION_NO_SHOW[SUCCESS]:
      case END_SESSION[SUCCESS]:
      case END_SESSION_NO_SHOW_TECH[SUCCESS]:
        return true
      case END_SESSION_NO_SHOW[FAILURE]:
      case END_SESSION[FAILURE]:
      case END_SESSION_NO_SHOW_TECH[FAILURE]:
      case END_SESSION_NO_SHOW[REQUEST]:
      case END_SESSION[REQUEST]:
      case END_SESSION_NO_SHOW_TECH[REQUEST]:
        return false
      default:
        return state
    }
  }

  return combineReducers({
    masterSessions,
    startSession,
    nextSession,
    unresolvedSessions,
    endSessionStatus
  })
}

export default entity

const getSessionState = state =>
  state.startSession.session ? state.startSession.session : {}

export const getAllMasterSessions = (state, props) => state.masterSessions
export const getSession = (state, props) => state.startSession.session
export const getSessionId = (state, props) =>
  state.startSession.session ? state.startSession.session.id : ''
export const getSlot = (state, props) => state.startSession.slot
export const getTutor = (state, props) => state.startSession.tutor
export const getStudent = (state, props) => state.startSession.student
export const getSessionBookingId = (state, props) => state.startSession.id
export const getSessionDetails = (state, props) =>
  getSessionState(state).session_master
export const getSessionDetailsBookingId = (state, props) =>
  getSessionDetailsBookingId(state).startSession.id
export const getActivities = (state, props) => getSessionState(state).activities
export const getNextSessionMasterId = (state, props) =>
  state.nextSession ? state.nextSession.id : null
export const getUnResolvedSessions = (state, props) => state.unresolvedSessions

export const getEndSessionStatus = (state, props) => state.endSessionStatus

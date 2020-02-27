import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'
import { pluck, concat, compose, uniq } from 'ramda'
const {
  SUCCESS,
  FAILURE,
  REQUEST,
  GET_TUTOR_BY_AVAILABILITY,
  GET_TUTOR_FOR_LAST_BOOKING,
  GET_TUTOR_SLOTS,
  CREATE_BOOKINGS,
  CANCEL_BOOKINGS
} = actionTypes

const ui = () => {
  const tutorAvailabilityList = (state = [], action) => {
    switch (action.type) {
      case GET_TUTOR_BY_AVAILABILITY[SUCCESS]:
        const data = action.payload
        return data
      case GET_TUTOR_BY_AVAILABILITY[FAILURE]:
      case GET_TUTOR_BY_AVAILABILITY[REQUEST]:
        return []
      default:
        return state
    }
  }

  const lastTutor = (state = null, action) => {
    switch (action.type) {
      case GET_TUTOR_FOR_LAST_BOOKING[SUCCESS]:
        const { tutor_id } = action.payload
        return tutor_id
      case GET_TUTOR_FOR_LAST_BOOKING[FAILURE]:
      case GET_TUTOR_FOR_LAST_BOOKING[REQUEST]:
        return null
      default:
        return state
    }
  }

  const selectedTutor = (state = {}, action) => {
    switch (action.type) {
      case GET_TUTOR_SLOTS[REQUEST]:
      case GET_TUTOR_FOR_LAST_BOOKING[SUCCESS]:
        const { tutor_id } = action.payload
        const data = {}
        data[tutor_id] = true
        return data
      case GET_TUTOR_SLOTS[FAILURE]:
      case GET_TUTOR_FOR_LAST_BOOKING[FAILURE]:
      case GET_TUTOR_FOR_LAST_BOOKING[REQUEST]:
        return {}
      default:
        return state
    }
  }

  const isBookingProcessing = (state = {}, action) => {
    switch (action.type) {
      case CREATE_BOOKINGS[REQUEST]:
      case CANCEL_BOOKINGS[REQUEST]:
        const { slotId } = action.data
        let d = {}
        d[slotId] = true
        return d
      case CREATE_BOOKINGS[SUCCESS]:
      case CANCEL_BOOKINGS[SUCCESS]:
      case CREATE_BOOKINGS[FAILURE]:
      case CANCEL_BOOKINGS[FAILURE]:
        return {}
      default:
        return state
    }
  }
  return combineReducers({
    tutorAvailabilityList,
    selectedTutor,
    lastTutor,
    isBookingProcessing
  })
}

export default ui

export const getAllTutorList = state => {
  const tutorId = state.lastTutor
  if (!tutorId) {
    return []
  }
  const otherTutors = state.tutorAvailabilityList
  return compose(
    uniq,
    concat([tutorId]),
    pluck('tutor_id')
  )(otherTutors)
}

export const isTutorSelected = state => tutorId => state.selectedTutor[tutorId]

export const isBookingProcessing = state => id => state.isBookingProcessing[id]

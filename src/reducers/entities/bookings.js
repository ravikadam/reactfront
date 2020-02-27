import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'
import { normalize, denormalize } from 'normalizr'
import { bookingSchema } from '../../schemas/normalizr/bookingSchema'
import {
  compose,
  length,
  lt,
  head,
  curry,
  prop,
  filter,
  map,
  sort
} from 'ramda'

const {
  SUCCESS,
  FAILURE,
  REQUEST,
  GET_BOOKINGS,
  CREATE_BOOKINGS,
  CANCEL_BOOKINGS
} = actionTypes

const defaultState = {
  ids: [],
  booking: {}
}

const entity = () => {
  const bookings = (state = defaultState, action) => {
    const { payload } = action
    switch (action.type) {
      case GET_BOOKINGS[SUCCESS]:
        const normalizedBookings = normalize(payload.bookings, [bookingSchema])

        return {
          ...state,
          ...normalizedBookings.entities,
          ...{ ids: normalizedBookings.result }
        }
      case CREATE_BOOKINGS[SUCCESS]:
        const denormalizedBookings = denormalize(
          state.ids,
          [bookingSchema],
          state
        )
        denormalizedBookings.push(payload)
        const normBookings = normalize(denormalizedBookings, [bookingSchema])

        return {
          ...state,
          ...normBookings.entities,
          ...{ ids: normBookings.result }
        }
      case CANCEL_BOOKINGS[SUCCESS]:
        const denormBookings = denormalize(state.ids, [bookingSchema], state)
        const finBookings = denormBookings.filter(
          booking => booking.id !== payload.id
        )
        const normFinBookings = normalize(finBookings, [bookingSchema])

        return {
          ...state,
          ...normFinBookings.entities,
          ...{ ids: normFinBookings.result }
        }
      case GET_BOOKINGS[REQUEST]:
      case GET_BOOKINGS[FAILURE]:
        return defaultState
      default:
        return state
    }
  }

  return combineReducers({
    bookings
  })
}

export default entity

// Don't get Confused with lt here, and this ramda function is not right associative
// https://github.com/ramda/ramda/issues/1497
const isGTThan0 = lt(0)

//Helper function to get value of key
const getByKey = curry((object, key) => object[key])

/**
 * Get all booking Ids
 * @param {*} state
 */
export const getBookingIds = state => state.bookings.ids

/**
 * helper function to get value of any key from booking
 */
const getKeyFromBooking = curry((key, bookingId, state) => {
  const booking = state.bookings.booking
  const keyState = state.bookings[key]

  return compose(
    getByKey(keyState),
    prop(key),
    getByKey(booking)
  )(bookingId)
})

/**
 * Get next booking id
 */
export const getNextBookingId = state =>
  compose(
    head,
    getBookingIds
  )(state)

/**
 * Check if there is any booking
 */
export const isNextBooking = compose(
  isGTThan0,
  length,
  getBookingIds
)

/**
 * get slots details by booking id
 * @param {*} state
 */
export const slotByBookingId = state => id => {
  const getSlotIdByKey = getKeyFromBooking('slot', id)
  return getSlotIdByKey(state)
}

/**
 * get student details by bookingId
 * @param {*} state
 */
export const studentByBookingId = state => id => {
  const getStudentIdByKey = getKeyFromBooking('student', id)
  return getStudentIdByKey(state)
}

/**
 * Get tutor details by bookingId
 * @param {*} state
 */
export const tutorByBookingId = state => id => {
  const getTutorIdByKey = getKeyFromBooking('tutor', id)
  return getTutorIdByKey(state)
}

/**
 * Get session details by bookingId
 * @param {*} state
 */
export const sessionDetailsByBookingId = state => id => {
  const getSessionByKey = getKeyFromBooking('session', id)
  const sessionMasterState = state.bookings['session_master']

  return compose(
    getByKey(sessionMasterState),
    prop('session_master'),
    getSessionByKey
  )(state)
}

export const sessionByBookingId = state => id => {
  const getSessionByKey = getKeyFromBooking('session', id)
  const sessionState = state.bookings['session']
  return compose(
    getByKey(sessionState),
    prop('id'),
    getSessionByKey
  )(state)
}

/**
 * Get Actvities details by bookingId and type
 * @param {*} state
 */
export const actvitiesByBookingIdAndType = state => id => type => {
  const getSessionByKey = getKeyFromBooking('session', id)
  const activitiesState = state.bookings['activities']
  const activitiesKeyMap = getByKey(activitiesState)
  return compose(
    sort((a, b) => a.sort - b.sort),
    filter(a => a.type === type),
    map(activitiesKeyMap),
    prop('activities'),
    getSessionByKey
  )(state)
}

/**
 * Get all slots for upcomming booking
 * @param {} state
 */
export const getAllSlotsForBookings = state => {
  const slots = state.bookings.slot
  return slots ? Object.keys(slots).map(key => slots[key]) : []
}

/**
 * Get BookingId by slotId
 * @param {} state
 */
export const getBookingIdBySlot = state => slotId => {
  const booking = state.bookings.booking
  const bookingIds = Object.keys(booking).filter(key => {
    return booking[key].slot === slotId
  })
  return bookingIds[0]
}

/**
 * Get SessionId by slotId
 * @param {} state
 */
export const getSessionIdBySlot = state => slotId => {
  const booking = state.bookings.booking
  const bookingIds = Object.keys(booking).filter(key => {
    return booking[key].slot === slotId
  })
  return booking[bookingIds[0]].session
}

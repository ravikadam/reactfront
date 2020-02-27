import { call, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../actions'
import {
  getBookings,
  getTutorsForLastBooking,
  createBooking,
  cancelBooking
} from '../services'
import { sendPayload, sendPayloadFailure, getAuthUserId } from './helper'
import { BookingStatus } from '../constants'
import { currentDateTime, today } from '../helpers/dateHelper'

const {
  REQUEST,
  GET_BOOKINGS,
  GET_TUTOR_FOR_LAST_BOOKING,
  CREATE_BOOKINGS,
  CANCEL_BOOKINGS
} = actionTypes

function* handleGetBookingsRequest({ limit = 10 }) {
  try {
    const apiResponse = yield call(getBookings, {
      userId: yield getAuthUserId(),
      status: BookingStatus.BOOKED,
      limit,
      date: currentDateTime()
    })
    yield sendPayload(apiResponse, GET_BOOKINGS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_BOOKINGS)
  }
}

function* handleGetTutorForLastBooking() {
  try {
    const apiResponse = yield call(getTutorsForLastBooking, {
      userId: yield getAuthUserId()
    })
    yield sendPayload(apiResponse, GET_TUTOR_FOR_LAST_BOOKING)
  } catch (e) {
    yield sendPayloadFailure(e, GET_TUTOR_FOR_LAST_BOOKING)
  }
}

function* handleCreateBookingRequest({ data }) {
  try {
    const { slotId, sessionMasterId, tutorId, bookingDate } = data
    const apiResponse = yield call(createBooking, {
      userId: yield getAuthUserId(),
      slotId,
      sessionMasterId,
      tutorId,
      bookingDate,
      currentDate: today()
    })

    yield sendPayload(apiResponse, CREATE_BOOKINGS)
  } catch (e) {
    yield sendPayloadFailure(e, CREATE_BOOKINGS)
  }
}

function* handleCancelBookingRequest({ data }) {
  try {
    const { bookingId, slotId, sessionId } = data
    const apiResponse = yield call(cancelBooking, {
      userId: yield getAuthUserId(),
      slotId,
      bookingId,
      sessionId,
      currentDate: today()
    })

    yield sendPayload(apiResponse, CANCEL_BOOKINGS)
  } catch (e) {
    yield sendPayloadFailure(e, CANCEL_BOOKINGS)
  }
}

export const sagas = {
  watchBookingsRequest: takeLatest(
    GET_BOOKINGS[REQUEST],
    handleGetBookingsRequest
  ),
  watchTutorForLastBookingRequest: takeLatest(
    GET_TUTOR_FOR_LAST_BOOKING[REQUEST],
    handleGetTutorForLastBooking
  ),
  watchCreateBookingRequest: takeLatest(
    CREATE_BOOKINGS[REQUEST],
    handleCreateBookingRequest
  ),
  watchCancelBookingRequest: takeLatest(
    CANCEL_BOOKINGS[REQUEST],
    handleCancelBookingRequest
  )
}

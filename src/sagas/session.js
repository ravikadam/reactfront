import { call, takeLatest, put } from 'redux-saga/effects'
import { actionTypes } from '../actions'
import {
  getAllMasterSessions,
  startSession,
  endSession,
  noShow,
  noShowTech,
  getNextSessionToBeBooked,
  getUnResolvedSessions
} from '../services'
import { sendPayload, sendPayloadFailure, getAuthUserId } from './helper'
import { currentDateTime, today } from '../helpers/dateHelper'
import { push } from 'connected-react-router'
const {
  REQUEST,
  GET_MASTER_SESSION,
  START_SESSION,
  SUCCESS,
  END_SESSION,
  END_SESSION_NO_SHOW,
  END_SESSION_NO_SHOW_TECH,
  GET_NEXT_SESSION_TO_BOOK,
  CREATE_BOOKINGS,
  CANCEL_BOOKINGS,
  GET_UNRESOLVED_SESSIONS
} = actionTypes

function* handleMasterSessionRequest() {
  try {
    const apiResponse = yield call(getAllMasterSessions, {
      userId: yield getAuthUserId()
    })
    yield sendPayload(apiResponse, GET_MASTER_SESSION)
  } catch (e) {
    yield sendPayloadFailure(e, GET_MASTER_SESSION)
  }
}
function* handleStartSessionRequest({ data }) {
  let userId = yield getAuthUserId()
  try {
    const apiResponse = yield call(startSession, {
      userId: userId,
      bookingId: data.id
    })
    yield sendPayload(apiResponse, START_SESSION)
  } catch (e) {
    yield sendPayloadFailure(e, START_SESSION)
  }
}
function* handleEndSession({ data }) {
  let userId = yield getAuthUserId()
  try {
    const apiResponse = yield call(endSession, {
      userId: userId,
      ...data
    })
    yield sendPayload(apiResponse, END_SESSION)
  } catch (e) {
    yield sendPayloadFailure(e, END_SESSION)
  }
}
function* handleNoShow({ data }) {
  let userId = yield getAuthUserId()
  try {
    const apiResponse = yield call(noShow, {
      userId: userId,
      ...data
    })
    yield sendPayload(apiResponse, END_SESSION)
  } catch (e) {
    yield sendPayloadFailure(e, END_SESSION)
  }
}
function* handleNoShowTech({ data }) {
  let userId = yield getAuthUserId()
  try {
    const apiResponse = yield call(noShowTech, {
      userId: userId,
      ...data
    })
    yield sendPayload(apiResponse, END_SESSION)
  } catch (e) {
    yield sendPayloadFailure(e, END_SESSION)
  }
}

function* handleStartSessionSuccess({ payload }) {
  yield put(push(`/session/${payload.session.id}`))
}

function* handleNextSessionNeedBookingRequest() {
  try {
    let userId = yield getAuthUserId()
    const apiResponse = yield call(getNextSessionToBeBooked, {
      userId: userId
    })
    yield sendPayload(apiResponse, GET_NEXT_SESSION_TO_BOOK)
  } catch (e) {
    yield sendPayloadFailure(e, GET_NEXT_SESSION_TO_BOOK)
  }
}

function* handleGetUnResolvedSessions() {
  try {
    let userId = yield getAuthUserId()
    const apiResponse = yield call(getUnResolvedSessions, {
      userId: userId,
      currentDate: today()
    })
    yield sendPayload(apiResponse, GET_UNRESOLVED_SESSIONS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_UNRESOLVED_SESSIONS)
  }
}

export const sagas = {
  watchMasterSessionRequest: takeLatest(
    GET_MASTER_SESSION[REQUEST],
    handleMasterSessionRequest
  ),
  watchStartSessionRequest: takeLatest(
    START_SESSION[REQUEST],
    handleStartSessionRequest
  ),
  watchStartSessionSuccess: takeLatest(
    START_SESSION[SUCCESS],
    handleStartSessionSuccess
  ),
  watchEndSession: takeLatest(END_SESSION[REQUEST], handleEndSession),
  watchEndSessionNoShow: takeLatest(END_SESSION_NO_SHOW[REQUEST], handleNoShow),
  watchEndSessionNoShowTech: takeLatest(
    END_SESSION_NO_SHOW_TECH[REQUEST],
    handleNoShowTech
  ),
  watchNextSessionNeedBookingRequest: takeLatest(
    GET_NEXT_SESSION_TO_BOOK[REQUEST],
    handleNextSessionNeedBookingRequest
  ),
  watchCreateBookingSuccess: takeLatest(
    CREATE_BOOKINGS[SUCCESS],
    handleNextSessionNeedBookingRequest
  ),
  watchCancelBookingSuccess: takeLatest(
    CANCEL_BOOKINGS[SUCCESS],
    handleNextSessionNeedBookingRequest
  ),
  watchGetUnresolvedSessions: takeLatest(
    GET_UNRESOLVED_SESSIONS[REQUEST],
    handleGetUnResolvedSessions
  )
}

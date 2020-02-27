import { call, takeLatest, takeEvery, put } from 'redux-saga/effects'
import { actionTypes } from '../actions'
import {
  getSlots,
  saveSlots,
  getDateRangeForSlots,
  copySlots,
  getTrialSlots,
  bookTrialSlot,
  isTrialScheduled,
  getSlotsByTutor,
  getTutorsByAvailability,
  getAllStudentBookedSlots
} from '../services'
import {
  sendPayload,
  sendPayloadFailure,
  getAuthUserId,
  getAuthUserCourseId
} from './helper'
import { today, dateDiff, addDays, byFormat } from '../helpers/dateHelper'
import { replace } from 'connected-react-router'

const {
  REQUEST,
  SLOTS,
  SLOTS_SAVE,
  SLOTS_COPY,
  GET_SLOTS,
  BOOK_SLOT,
  SUCCESS,
  FAILURE,
  TRIAL_SESSION_SCHEDULED,
  GET_TUTOR_SLOTS,
  GET_TUTOR_BY_AVAILABILITY,
  GET_TUTOR_FOR_LAST_BOOKING,
  GET_STUDENT_BOOKED_SLOTS
} = actionTypes

function* handleSlotSave({ data }) {
  try {
    const apiResponse = yield call(
      saveSlots,
      { userId: yield getAuthUserId() },
      { slots: Array.isArray(data) ? data : [data] }
    )
    yield sendPayload(apiResponse, SLOTS_SAVE)
  } catch (e) {
    yield sendPayloadFailure(e, SLOTS_SAVE)
  }
}

function* handleSlotsRequest({ data }) {
  try {
    const userId = yield getAuthUserId()
    const { data } = yield getDateRangeForSlots({
      userId: userId,
      startDate: today()
    })
    if (dateDiff(data.data.end_date, data.data.start_date) > 21)
      data.data.end_date = byFormat(
        addDays(data.data.start_date, 21),
        'YYYY-MM-DD'
      )

    //YATISH
    //    data.data.start_date = '2019-09-22'
    //    data.data.end_date = '2019-10-22'
    const apiResponse = yield call(getSlots, {
      userId: userId,
      startDate: data.data.start_date,
      endDate: data.data.end_date
    })
    yield sendPayload(apiResponse, SLOTS)
  } catch (e) {
    yield sendPayloadFailure(e, SLOTS)
  }
}

function* handleSlotsCopyRequest({ data }) {
  try {
    const userId = yield getAuthUserId()
    const apiResponse = yield call(copySlots, {
      userId: userId,
      currentDate: today(),
      startDate: data.start_date,
      endDate: data.end_date,
      slots: data.slots
    })
    yield sendPayload(apiResponse, SLOTS_COPY)
  } catch (e) {
    yield sendPayloadFailure(e, SLOTS_COPY)
  }
}
function* handGetTrialSlots(data) {
  try {
    const userId = yield getAuthUserId()
    const courseId = yield getAuthUserCourseId()
    const apiResponse = yield call(getTrialSlots, {
      userId: userId,
      startDate: today()
    })
    yield sendPayload(apiResponse, GET_SLOTS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_SLOTS)
  }
}

function* handBookTrialSlots({ data }) {
  try {
    const userId = yield getAuthUserId()
    const apiResponse = yield call(bookTrialSlot, {
      slot: data,
      userId
    })
    yield sendPayload(apiResponse, BOOK_SLOT)
  } catch (e) {
    yield sendPayloadFailure(e, BOOK_SLOT)
  }
}
function* handleIsTrialScheduled() {
  const userId = yield getAuthUserId()
  const apiResponse = yield call(isTrialScheduled, {
    userId
  })
  yield put({
    type: apiResponse.data.data.isTrialScheduled
      ? TRIAL_SESSION_SCHEDULED[SUCCESS]
      : TRIAL_SESSION_SCHEDULED[FAILURE],
    payload: {}
  })
}
function* handleIsTrialScheduledSuccess() {
  yield put(replace('/'))
}

function* handleIsTrialScheduledFailure() {
  yield put(replace('/trial'))
}

function* handleTutorSlotsRequest({ payload }) {
  try {
    const userId = yield getAuthUserId()
    const apiResponse = yield call(getSlotsByTutor, {
      userId: userId,
      startDate: today(),
      // startDate: '2019-10-10', // YATISH
      tutorId: payload.tutor_id
    })
    yield sendPayload(apiResponse, GET_TUTOR_SLOTS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_TUTOR_SLOTS)
  }
}

function* handleTutorByAvailability({ data }) {
  try {
    const userId = yield getAuthUserId()
    const apiResponse = yield call(getTutorsByAvailability, {
      userId: userId,
      startDate: today()
      // startDate: '2019-10-10', // YATISH
    })
    yield sendPayload(apiResponse, GET_TUTOR_BY_AVAILABILITY)
  } catch (e) {
    yield sendPayloadFailure(e, GET_TUTOR_BY_AVAILABILITY)
  }
}

function* handleStudentBookedSlotRequest() {
  try {
    const userId = yield getAuthUserId()
    const apiResponse = yield call(getAllStudentBookedSlots, {
      userId: userId
    })
    yield sendPayload(apiResponse, GET_STUDENT_BOOKED_SLOTS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_STUDENT_BOOKED_SLOTS)
  }
}

export const sagas = {
  watchSlotRequest: takeLatest(SLOTS[REQUEST], handleSlotsRequest),
  watchSlotSave: takeEvery(SLOTS_SAVE[REQUEST], handleSlotSave),
  watchSlotCopyRequest: takeLatest(SLOTS_COPY[REQUEST], handleSlotsCopyRequest),
  watchGetSlots: takeLatest(GET_SLOTS[REQUEST], handGetTrialSlots),
  watchBookSlots: takeEvery(BOOK_SLOT[REQUEST], handBookTrialSlots),
  watchIsTrialSessionScheduled: takeLatest(
    TRIAL_SESSION_SCHEDULED[REQUEST],
    handleIsTrialScheduled
  ),
  watchIsTrialSessionScheduledSuccess: takeLatest(
    TRIAL_SESSION_SCHEDULED[SUCCESS],
    handleIsTrialScheduledSuccess
  ),
  watchIsTrialSessionScheduledFailure: takeLatest(
    TRIAL_SESSION_SCHEDULED[FAILURE],
    handleIsTrialScheduledFailure
  ),
  watchSlotByTutorRequest: takeLatest(
    GET_TUTOR_SLOTS[REQUEST],
    handleTutorSlotsRequest
  ),
  watchSlotAvailabilityRequest: takeLatest(
    GET_TUTOR_BY_AVAILABILITY[REQUEST],
    handleTutorByAvailability
  ),
  watchLatestTutorResponse: takeLatest(
    GET_TUTOR_FOR_LAST_BOOKING[SUCCESS],
    handleTutorSlotsRequest
  ),
  watchGetStudentBookedRequest: takeLatest(
    GET_STUDENT_BOOKED_SLOTS[REQUEST],
    handleStudentBookedSlotRequest
  )
}

import { put, select } from 'redux-saga/effects'
import { actionTypes } from '../actions'
import { getLoggedInUserId, getLoggedInUserCourseId } from '../reducers'
const { SUCCESS, FAILURE } = actionTypes

export function* getAuthUserId() {
  const userId = yield select(getLoggedInUserId)
  return userId
}

export function* getAuthUserCourseId() {
  const courseId = yield select(getLoggedInUserCourseId)
  return courseId
}

export function* sendPayload(apiResponse, event) {
  yield put({
    type: apiResponse.data.success ? event[SUCCESS] : event[FAILURE],
    payload: apiResponse.data
      ? apiResponse.data.success
        ? apiResponse.data.data
        : apiResponse.data.error
      : {}
  })
}

export function* sendPayloadFailure(error, event) {
  if (error.response) {
    yield put({
      type: event[FAILURE],
      payload: error.response.data ? error.response.data.error : {}
    })
  } else {
    yield put({
      type: event[FAILURE],
      payload: error.error
    })
  }
}

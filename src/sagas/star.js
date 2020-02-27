import { call, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../actions'
import { getTotalUserStars } from '../services'
import { sendPayload, sendPayloadFailure, getAuthUserId } from './helper'

const { REQUEST, GET_TOTAL_STAR } = actionTypes

function* handleTotalStarRequest() {
  try {
    const apiResponse = yield call(getTotalUserStars, {
      userId: yield getAuthUserId()
    })
    yield sendPayload(apiResponse, GET_TOTAL_STAR)
  } catch (e) {
    yield sendPayloadFailure(e, GET_TOTAL_STAR)
  }
}

export const sagas = {
  watchTotalStarRequest: takeLatest(
    GET_TOTAL_STAR[REQUEST],
    handleTotalStarRequest
  )
}

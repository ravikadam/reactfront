import { call, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../actions'
import { getUserCredits } from '../services'
import { sendPayload, sendPayloadFailure, getAuthUserId } from './helper'

const { REQUEST, GET_TOTAL_TRIAL_CREDITS, GET_TOTAL_PAID_CREDITS } = actionTypes

function* handleTrialCreditsRequest() {
  try {
    const apiResponse = yield call(getUserCredits, {
      userId: yield getAuthUserId(),
      isTrial: 1
    })
    yield sendPayload(apiResponse, GET_TOTAL_TRIAL_CREDITS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_TOTAL_TRIAL_CREDITS)
  }
}

function* handlePaidCreditsRequest() {
  try {
    const apiResponse = yield call(getUserCredits, {
      userId: yield getAuthUserId(),
      isTrial: 0
    })
    yield sendPayload(apiResponse, GET_TOTAL_PAID_CREDITS)
  } catch (e) {
    yield sendPayloadFailure(e, GET_TOTAL_PAID_CREDITS)
  }
}

export const sagas = {
  watchTrialCreditsRequest: takeLatest(
    GET_TOTAL_TRIAL_CREDITS[REQUEST],
    handleTrialCreditsRequest
  ),
  watchPaidCreditsREquest: takeLatest(
    GET_TOTAL_PAID_CREDITS[REQUEST],
    handlePaidCreditsRequest
  )
}

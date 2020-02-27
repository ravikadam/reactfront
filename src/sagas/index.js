/* eslint-disable no-constant-condition */
import { put, call, takeLatest, all } from 'redux-saga/effects'
import {
  signUp,
  sendOTP,
  loginUser,
  loggedInUser,
  updateUser
} from '../services'

import { replace, push } from 'connected-react-router'
import { setTimeZone } from '../helpers/dateHelper'
import { actionTypes } from '../actions'
import { SET_AUTH, isAuthenticated, REMOVE_AUTH } from '../services/auth'
import { sendPayload, sendPayloadFailure, getAuthUserId } from './helper'
import { sagas as slotSagas } from './slot'
import { sagas as creditSagas } from './credit'
import { sagas as bookingSagas } from './booking'
import { sagas as sessionSagas } from './session'
import { sagas as starSagas } from './star'

const {
  SUCCESS,
  REQUEST,
  FAILURE,
  SIGNUP,
  SENDOTP,
  LOGIN,
  LOGOUT,
  AUTHENTICATE,
  TRIAL_SESSION_SCHEDULED,
  UPDATE_PROFILE_DETAILS
} = actionTypes

function* onAuthenticationSucess({ payload }) {
  yield setTimeZone(payload.user.timezone)
  if (
    payload &&
    payload.user &&
    payload.user.course &&
    payload.user.course.status == 'TRIAL_TO_BE_SCHEDULED' &&
    window.location.href.indexOf('/trial') < 0 &&
    window.location.href.indexOf('signup') < 0
  )
    yield put(replace('/trial'))
}

function* handleAuthenticationRequest({ data }) {
  try {
    if (isAuthenticated()) {
      const apiResponse = yield call(loggedInUser)
      yield sendPayload(apiResponse, AUTHENTICATE)
    } else {
      throw 'Not Authenticated'
    }
  } catch (e) {
    yield sendPayloadFailure(e, AUTHENTICATE)
  }
}

function* handleSendOTP({ data }) {
  try {
    const apiResponse = yield call(sendOTP, data)
    yield sendPayload(apiResponse, SENDOTP)
  } catch (e) {
    yield sendPayloadFailure(e, SENDOTP)
  }
}

function* handleSignUp({ data }) {
  try {
    const apiResponse = yield call(signUp, data)
    SET_AUTH(apiResponse.data.data)
    yield sendPayload(apiResponse, SIGNUP)
  } catch (e) {
    yield sendPayloadFailure(e, SIGNUP)
  }
}

function* handleLogout() {
  REMOVE_AUTH()
  window.location.href = '/'
}

function* handleLoginUser({ data }) {
  try {
    REMOVE_AUTH()
    const apiResponse = yield call(loginUser, data)
    !apiResponse.data.success || SET_AUTH(apiResponse.data.data)
    yield sendPayload(apiResponse, LOGIN)
  } catch (e) {
    yield sendPayloadFailure(e, LOGIN)
  }
}

function* handleUpdateProfileDetails({ data }) {
  try {
    let userId = yield getAuthUserId()
    const apiResponse = yield call(() => updateUser(userId, data))
    yield sendPayload(apiResponse, UPDATE_PROFILE_DETAILS)
  } catch (e) {
    yield sendPayloadFailure(e, UPDATE_PROFILE_DETAILS)
  }
}

function* handlenaviagte(data) {
  try {
    if (isAuthenticated()) {
      const apiResponse = yield call(loggedInUser)
      yield sendPayload(apiResponse, AUTHENTICATE)
      if (
        apiResponse &&
        apiResponse.data &&
        apiResponse.data.data &&
        apiResponse.data.data.user &&
        apiResponse.data.data.user.grade &&
        apiResponse.data.data.user.socialId == 'admin'
      )
        yield put(replace('/trial'))
      else yield put(replace('/signup/details'))
    } else {
      throw 'Not Authenticated'
    }
  } catch (e) {
    yield sendPayloadFailure(e, AUTHENTICATE)
  }
}

function* onAuthenticationFailure() {
  yield put(replace('/login'))
}

function* onProfileDetailsCompletion() {
  yield put({ type: TRIAL_SESSION_SCHEDULED[REQUEST], payload: {} })
}

function* handleLoginSuccess() {
  yield put(push('/'))
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all({
    watchSendOTP: takeLatest(actionTypes.SENDOTP[REQUEST], handleSendOTP),
    watchSignUp: takeLatest(actionTypes.SIGNUP[REQUEST], handleSignUp),
    watchSignUpSuccess: takeLatest(actionTypes.SIGNUP[SUCCESS], handlenaviagte),
    watchLoginUser: takeLatest(actionTypes.LOGIN[REQUEST], handleLoginUser),
    watchLogout: takeLatest(actionTypes.LOGOUT[REQUEST], handleLogout),
    watchLoginSuccess: takeLatest(
      actionTypes.LOGIN[SUCCESS],
      handleLoginSuccess
    ),
    watchUpdateProfileDetails: takeLatest(
      actionTypes.UPDATE_PROFILE_DETAILS[REQUEST],
      handleUpdateProfileDetails
    ),
    watchUpdateProfileDetailsSuccess: takeLatest(
      actionTypes.UPDATE_PROFILE_DETAILS[SUCCESS],
      onProfileDetailsCompletion
    ),
    watchRefreshUserDetails: takeLatest(
      actionTypes.UPDATE_PROFILE_DETAILS[SUCCESS],
      handleAuthenticationRequest
    ),
    watchAuthRequest: takeLatest(
      AUTHENTICATE[REQUEST],
      handleAuthenticationRequest
    ),
    watchAuthFailure: takeLatest(
      AUTHENTICATE[FAILURE],
      onAuthenticationFailure
    ),
    watchAuthSUCCESS: takeLatest(AUTHENTICATE[SUCCESS], onAuthenticationSucess),
    ...slotSagas,
    ...creditSagas,
    ...bookingSagas,
    ...sessionSagas,
    ...starSagas
  })
}

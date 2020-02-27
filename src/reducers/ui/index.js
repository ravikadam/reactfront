import { combineReducers } from 'redux'
import slot, * as slotUI from './slots'
import errorMessage, * as errorMessageUI from './errorMessage'
import dashboard, * as dashboardUI from './dashboard'
import schedular, * as schedularUI from './schedular'
import sessions, * as sessionsUI from './sessions'

export default combineReducers({
  slot: slot(),
  errorMessage: errorMessage(),
  dashboard: dashboard(),
  schedular: schedular(),
  sessions: sessions()
})

export const isSlotsFetched = (state, props) =>
  slotUI.isSlotsFetched(state.slot, props)

export const isSlotSaving = (state, props) =>
  slotUI.isSlotSaving(state.slot, props)

export const getSlotCurrentWeek = (state, props) =>
  slotUI.getCurrentWeek(state.slot, props)

export const openAllSlotsForDay = (state, props) =>
  slotUI.openAllSlotsForDay(state.slot, props)

export const getErrorMessage = (state, props) =>
  errorMessageUI.getErrorMessage(state.errorMessage, props)

export const getAnchorElem = state => slotUI.getAnchorElem(state.slot)

export const isScheduleLoading = state =>
  dashboardUI.isScheduleLoading(state.dashboard)

export const isMiniSchedularToggle = state =>
  dashboardUI.isMiniSchedularToggle(state.dashboard)

export const miniSchedularActivityTab = state =>
  dashboardUI.miniSchedularActivityTab(state.dashboard)

export const isMasterSessionLoading = state =>
  dashboardUI.isMasterSessionLoading(state.dashboard)

export const getActiveSessionIndex = state =>
  dashboardUI.getActiveSessionIndex(state.dashboard)

export const getAllTutorList = state =>
  schedularUI.getAllTutorList(state.schedular)

export const isTutorSelected = state =>
  schedularUI.isTutorSelected(state.schedular)

export const isBookingProcessing = state =>
  schedularUI.isBookingProcessing(state.schedular)

export const isSessionStarting = state =>
  sessionsUI.isSessionStarting(state.sessions)

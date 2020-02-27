import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import signUp, * as signup from './signUp'
import loginUser, * as login from './loginUser'
import authUser, * as authenticate from './authUser'
import entities, * as Entities from './entities'
import config, * as AppConfig from './appConfig'
import ui, * as UI from './ui'

export default history =>
  combineReducers({
    router: connectRouter(history),
    signUp: signUp(),
    loginUser: loginUser(),
    authUser: authUser(),
    entities,
    ui,
    config: config()
  })

export const getIsOTPSent = state => signup.isOTPSent(state.signUp)

export const getIsSubmitting = (state, isLogin) =>
  isLogin
    ? login.isSubmitting(state.loginUser)
    : signup.isSubmitting(state.signUp)

export const getIsSending = state => signup.isSending(state.signUp)

export const getErrorMessage = (state, isLogin) =>
  isLogin
    ? login.getErrorMessage(state.loginUser)
    : signup.getErrorMessage(state.signUp)

export const getIsAuthenticated = state =>
  authenticate.isAuthenticated(state.authUser)

export const authInProgress = state =>
  authenticate.authInProgress(state.authUser)

export const getUserRole = state =>
  authenticate.getLoggedInUserRole(state.authUser)

export const isAuthenticationNeeded = state =>
  authenticate.isAuthenticationNeeded(state.authUser)

export const getLoggedInUser = state =>
  authenticate.getLoggedInUser(state.authUser)

// Entities
export const getAllSlotsforDay = (state, props) =>
  Entities.getAllSlotsforDay(state.entities, getUserRole(state, props))

/**
 * Check the slot is already Booked
 * @param {state} state
 * @param {props} props
 */
export const isSlotBooked = (state, props) =>
  Entities.isSlotBooked(state.entities, props)

/**
 * Check the slot is closed
 * @param {state} state
 * @param {props} props
 */
export const isSlotClosed = (state, props) =>
  Entities.isSlotClosed(state.entities, props)

/**
 * Check the slot is open
 * @param {state} state
 * @param {props} props
 */
export const isSlotOpen = (state, props) =>
  Entities.isSlotOpen(state.entities, props)

/**
 * Get Start Date for the slots
 * @param {state} state
 * @param {props} props
 */
export const getSlotStartDate = (state, props) =>
  Entities.getSlotStartDate(state.entities, props)

/**
 * Get end Date for the slots
 * @param {state} state
 * @param {props} props
 */
export const getSlotEndDate = (state, props) =>
  Entities.getSlotEndDate(state.entities, props)

/**
 * Get Count of open slots for the week
 * @param {state} state
 * @param {props} props
 */
export const countOpenSlotsByWeek = (state, props) =>
  Entities.countOpenSlotsByWeek(state.entities, props)

export const countBookedSlotsByWeek = (state, props) =>
  Entities.countBookedSlotsByWeek(state.entities, props)

export const getLoggedInUserTimeZone = (state, props) =>
  authenticate.getLoggedInUserTimeZone(state.authUser)

export const getLoggedInUserId = (state, props) =>
  authenticate.getLoggedInUserId(state.authUser)

export const getLoggedInUserCourseId = (state, props) =>
  authenticate.getLoggedInUserCourseId(state.authUser)

export const getSlotConstants = (state, props) =>
  AppConfig.getSlotConstants(state.config, props)

export const isSlotDisabled = (state, props) =>
  Entities.isSlotDisabled(
    state.entities,
    getSlotConstants(state, props),
    getUserRole(state, props)
  )

export const getSlotsByDateRange = (state, props) =>
  Entities.getSlotsByDateRange(
    state.entities,
    getSlotConstants(state, props),
    getUserRole(state, props)
  )

// UI
export const isSlotsFetched = (state, props) =>
  UI.isSlotsFetched(state.ui, props)

export const isSlotSaving = (state, props) => UI.isSlotSaving(state.ui, props)

export const getSlotCurrentWeek = (state, props) =>
  UI.getSlotCurrentWeek(state.ui, props)

export const openAllSlotsForDay = (state, props) =>
  UI.openAllSlotsForDay(state.ui, props)

export const isScheduleLoading = state => UI.isScheduleLoading(state.ui)

export const isMiniSchedularToggle = state => UI.isMiniSchedularToggle(state.ui)

export const miniSchedularActivityTab = state =>
  UI.miniSchedularActivityTab(state.ui)

export const getCommonErrorMessage = (state, props) =>
  UI.getErrorMessage(state.ui, props)

export const getSlotMenuAnchorElem = state => UI.getAnchorElem(state.ui)

export const isMasterSessionLoading = state =>
  UI.isMasterSessionLoading(state.ui)

export const getActiveSessionIndex = state => UI.getActiveSessionIndex(state.ui)

export const getAllTutorList = state => UI.getAllTutorList(state.ui)

export const isTutorSelected = state => UI.isTutorSelected(state.ui)
export const isSessionStarting = state => UI.isSessionStarting(state.ui)

export const getTrialSlotDates = state =>
  Entities.getTrialSlotDates(state.entities)
export const getTrialSlotTimes = state =>
  Entities.getTrialSlotTimes(state.entities)
export const getTrialSlots = state => Entities.getTrialSlots(state.entities)
export const getSelectedTrialDateSlot = state =>
  Entities.getTrialSelectedDateSlot(state.entities)
export const getSelectedTrialTimeSlot = state =>
  Entities.getTrialSelectedTimeSlot(state.entities)
export const getTrialBookingStatus = state =>
  Entities.getTrialBookingStatus(state.entities)
export const isNextSlotAvailable = state =>
  Entities.isNextSlotAvailable(state.entities)
export const isPreviousSlotAvailable = state =>
  Entities.isPreviousSlotAvailable(state.entities)

/**
 * Get total trial credits for user
 * @param {state} state
 * @param {props} props
 */
export const getTotalTrialCredits = (state, props) =>
  Entities.getTotalTrialCredits(state.entities, props)

/**
 * Get total Paid credits for user
 * @param {state} state
 * @param {props} props
 */
export const getTotalPaidCredits = (state, props) =>
  Entities.getTotalPaidCredits(state.entities, props)

/**
 * Get Next booking Id
 * @param {*} state
 * @param {*} props
 */
export const getNextBookingId = state =>
  Entities.getNextBookingId(state.entities)

/**
 * Check if next booking available
 * @param {} state
 */
export const isNextBooking = state => Entities.isNextBooking(state.entities)

/**
 * get all booking id
 * @param {} state
 */
export const getBookingIds = state => Entities.getBookingIds(state.entities)

/**
 * Get Slot detail for the booking id
 * @param {*} state
 */
export const slotByBookingId = state => Entities.slotByBookingId(state.entities)

/**
 * Get student detail for the booking id
 * @param {*} state
 */
export const studentByBookingId = state =>
  Entities.studentByBookingId(state.entities)

/**
 * Get tutor detail for the booking Id
 * @param {*} state
 */
export const tutorByBookingId = state =>
  Entities.tutorByBookingId(state.entities)
/**
 * Get session details by bookingId
 * @param {*} state
 */
export const sessionDetailsByBookingId = state =>
  Entities.sessionDetailsByBookingId(state.entities)

/**
 * Get seesion details by bookingId
 * @param {*} state
 */
export const sessionByBookingId = state =>
  Entities.sessionByBookingId(state.entities)
/**
 * Get BookingId by slotId
 * @param {} state
 */
export const getBookingIdBySlot = state =>
  Entities.getBookingIdBySlot(state.entities)

/**
 * Get SessionId by slotId
 * @param {} state
 */
export const getSessionIdBySlot = state =>
  Entities.getSessionIdBySlot(state.entities)
/**
 * Get Un Resolved Sessions
 * @param {} state
 */

export const getUnResolvedSessions = state =>
  Entities.getUnResolvedSessions(state.entities)

export const getEndSessionStatus = state =>
  Entities.getEndSessionStatus(state.entities)

/**
 * Get Actvities details by bookingId and type
 * @param {*} state
 */
export const actvitiesByBookingIdAndType = state =>
  Entities.actvitiesByBookingIdAndType(state.entities)
/**
 * Get All master sessions for the user
 * @param {*} state
 */
export const getAllMasterSessions = state =>
  Entities.getAllMasterSessions(state.entities)

export const getTotalStars = (state, props) =>
  Entities.getTotalStars(state.entities)

export const sessionById = state => Entities.sessionById(state.entities)
export const getSessionTutor = state => Entities.getSessionTutor(state.entities)
export const getSessionStudent = state =>
  Entities.getSessionStudent(state.entities)
export const getSessionDetails = state =>
  Entities.getSessionDetails(state.entities)
export const getActivities = state => Entities.getActivities(state.entities)
export const getSessionSlotDetails = state =>
  Entities.getSessionSlotDetails(state.entities)
export const getSessionBookingId = state =>
  Entities.getSessionBookingId(state.entities)
export const getSessionDetailsBookingId = state =>
  Entities.getSessionDetailsBookingId(state.entities)
export const getSessionId = state => Entities.getSessionId(state.entities)
export const getNextSessionMasterId = state =>
  Entities.getNextSessionMasterId(state.entities)

export const isBookingProcessing = state => UI.isBookingProcessing(state.ui)

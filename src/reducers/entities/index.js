import { combineReducers } from 'redux'
import slot, * as slotEntity from './slots'
import trialSlots, * as trialSlotEntity from './trialSlots'
import credit, * as creditEntity from './credit'
import bookings, * as bookingsEntity from './bookings'
import sessions, * as sessionsEntity from './session'
import star, * as starEntity from './star'

export default combineReducers({
  slot: slot(),
  trialSlot: trialSlots(),
  credit: credit(),
  bookings: bookings(),
  star: star(),
  sessions: sessions()
})

/**
 * Get All slots for a Day
 * @param {state from reducer} state
 * @param {props} props
 */
export const getAllSlotsforDay = (state, userRole) =>
  slotEntity.getAllSlotsforDay(
    state.slot,
    userRole,
    getAllSlotsForBookings(state)
  )

/**
 * Check the slot is already Booked
 * @param {state} state
 * @param {props} props
 */
export const isSlotBooked = (state, props) =>
  slotEntity.isSlotBooked(state.slot, props)

/**
 * Check the slot is closed
 * @param {state} state
 * @param {props} props
 */
export const isSlotClosed = (state, props) =>
  slotEntity.isSlotClosed(state.slot, props)

/**
 * Check the slot is open
 * @param {state} state
 * @param {props} props
 */
export const isSlotOpen = (state, props) =>
  slotEntity.isSlotOpen(state.slot, props)

/**
 * Get Start Date for the slots
 * @param {state} state
 * @param {props} props
 */
export const getSlotStartDate = (state, props) =>
  slotEntity.getStartDate(state.slot, props)

/**
 * Get end Date for the slots
 * @param {state} state
 * @param {props} props
 */
export const getSlotEndDate = (state, props) =>
  slotEntity.getEndDate(state.slot, props)

export const countOpenSlotsByWeek = (state, props) =>
  slotEntity.countOpenSlotsByWeek(state.slot, props)

export const countBookedSlotsByWeek = (state, props) =>
  slotEntity.countBookedSlotsByWeek(state.slot, getAllSlotsForBookings(state))

export const isSlotDisabled = (state, slotConstants, userRole) =>
  slotEntity.isSlotDisabled(
    state.slot,
    slotConstants,
    userRole,
    getAllSlotsForBookings(state)
  )

export const getSlotsByDateRange = (state, slotConstants, userRole) =>
  slotEntity.getSlotsByDateRange(state.slot, slotConstants, userRole)

export const getTrialSlotDates = state =>
  trialSlotEntity.getDateSlots(state.trialSlot)

export const getTrialSlotTimes = state =>
  trialSlotEntity.getTimeSlots(state.trialSlot)

export const getTrialSlots = state => trialSlotEntity.getSlots(state.trialSlot)

export const getTrialSelectedDateSlot = state =>
  trialSlotEntity.selectedDate(state.trialSlot)

export const getTrialSelectedTimeSlot = state =>
  trialSlotEntity.selectedTime(state.trialSlot)

export const getTrialBookingStatus = state =>
  trialSlotEntity.bookingStatus(state.trialSlot)

export const isNextSlotAvailable = state =>
  trialSlotEntity.isNextSlotAvailable(state.trialSlot)

export const isPreviousSlotAvailable = state =>
  trialSlotEntity.isPreviousSlotAvailable(state.trialSlot)
/**
 * Get total trial credits for user
 * @param {entityState} state
 * @param {props} props
 */
export const getTotalTrialCredits = (state, props) =>
  creditEntity.getTotalTrialCredits(state.credit, props)

/**
 * Get total Paid credits for user
 * @param {entityState} state
 * @param {props} props
 */
export const getTotalPaidCredits = (state, props) =>
  creditEntity.getTotalPaidCredits(state.credit, props)

/**
 * Get Next booking Id
 * @param {*} state
 * @param {*} props
 */
export const getNextBookingId = (state, props) =>
  bookingsEntity.getNextBookingId(state.bookings, props)

/**
 * Check if next booking available
 * @param {} state
 */
export const isNextBooking = state =>
  bookingsEntity.isNextBooking(state.bookings)

/**
 * get all booking id
 * @param {} state
 */
export const getBookingIds = state =>
  bookingsEntity.getBookingIds(state.bookings)

/**
 * Get Slot detail for the booking id
 * @param {*} state
 */
export const slotByBookingId = state =>
  bookingsEntity.slotByBookingId(state.bookings)

/**
 * Get student detail for the booking id
 * @param {*} state
 */
export const studentByBookingId = state =>
  bookingsEntity.studentByBookingId(state.bookings)

/**
 * Get tutor detail for the booking Id
 * @param {*} state
 */
export const tutorByBookingId = state =>
  bookingsEntity.tutorByBookingId(state.bookings)

/**
 * Get session by bookingId
 * @param {*} state
 */
export const sessionDetailsByBookingId = state =>
  bookingsEntity.sessionDetailsByBookingId(state.bookings)

/**
 * Get session details by bookingId
 * @param {*} state
 */
export const sessionByBookingId = state =>
  bookingsEntity.sessionByBookingId(state.bookings)

/**
 * Get all slots for bookings
 */
export const getAllSlotsForBookings = state =>
  bookingsEntity.getAllSlotsForBookings(state.bookings)

/**
 * Get Actvities details by bookingId and type
 * @param {*} state
 */
export const actvitiesByBookingIdAndType = state =>
  bookingsEntity.actvitiesByBookingIdAndType(state.bookings)

/**
 * Get All master sessions for the user
 * @param {*} state
 */
export const getAllMasterSessions = state =>
  sessionsEntity.getAllMasterSessions(state.sessions)

export const getUnResolvedSessions = state =>
  sessionsEntity.getUnResolvedSessions(state.sessions)

export const getEndSessionStatus = state =>
  sessionsEntity.getEndSessionStatus(state.sessions)

export const getTotalStars = (state, props) =>
  starEntity.getTotalStars(state.star)
export const sessionById = state => sessionsEntity.getSession(state.sessions)
export const getSessionTutor = state => sessionsEntity.getTutor(state.sessions)
export const getSessionStudent = state =>
  sessionsEntity.getStudent(state.sessions)
export const getSessionDetailsBookingId = state =>
  sessionsEntity.getSessionDetailsBookingId(state.sessions)
export const getSessionDetails = state =>
  sessionsEntity.getSessionDetails(state.sessions)
export const getActivities = state =>
  sessionsEntity.getActivities(state.sessions)
export const getNextSessionMasterId = state =>
  sessionsEntity.getNextSessionMasterId(state.sessions)
export const getSessionSlotDetails = state =>
  sessionsEntity.getSlot(state.sessions)
export const getSessionBookingId = state =>
  sessionsEntity.getSessionBookingId(state.sessions)
export const getSessionId = state => sessionsEntity.getSessionId(state.sessions)

/**
 * Get BookingId by slotId
 * @param {} state
 */
export const getBookingIdBySlot = state =>
  bookingsEntity.getBookingIdBySlot(state.bookings)

/**
 * Get SessionId by slotId
 * @param {} state
 */
export const getSessionIdBySlot = state =>
  bookingsEntity.getSessionIdBySlot(state.bookings)

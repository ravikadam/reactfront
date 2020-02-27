import * as actions from './actiontypes'
const {
  SENDOTP,
  SIGNUP,
  LOGIN,
  SUCCESS,
  REQUEST,
  FAILURE,
  ALERT_CLOSE,
  AUTHENTICATE,
  SLOTS,
  SLOT_TOGGLE,
  SLOTS_SAVE,
  createRequestTypes,
  SLOT_WEEK_SWITCH,
  SLOT_OPENALL_TOGGLE,
  RESET_ERROR_MESSSAGE,
  SLOT_MENU_CLICK,
  LOGOUT,
  SLOTS_COPY,
  GET_SLOTS,
  GET_SLOT_DATES,
  BOOK_SLOT,
  SELECT_DATE_SLOT,
  SELECT_DEFAULT_SLOT,
  TRIAL_SESSION_SCHEDULED,
  SELECT_NEXT_DATE,
  SELECT_PREVIOUS_DATE,
  GET_TOTAL_TRIAL_CREDITS,
  GET_TOTAL_PAID_CREDITS,
  GET_BOOKINGS,
  MINI_SCHEDULER_ACTIVITY_TOGGLE,
  MINI_SCHEDULER_ACTIVITY_TAB,
  GET_MASTER_SESSION,
  SESSION_PANE_CROUSAL_SELECTED,
  GET_TOTAL_STAR,
  START_SESSION,
  GET_TUTOR_BY_AVAILABILITY,
  GET_TUTOR_FOR_LAST_BOOKING,
  GET_STUDENT_BOOKED_SLOTS,
  GET_TUTOR_SLOTS,
  END_SESSION,
  END_SESSION_NO_SHOW,
  END_SESSION_NO_SHOW_TECH,
  GET_NEXT_SESSION_TO_BOOK,
  CREATE_BOOKINGS,
  CANCEL_BOOKINGS,
  UPDATE_PROFILE_DETAILS,
  GET_UNRESOLVED_SESSIONS
} = actions

export const createRequestTypeHelper = createRequestTypes

export const action = (type, payload = {}) => {
  return { type, ...payload }
}

export const sendotp = {
  request: data => action(SENDOTP[REQUEST], { data }),
  success: (data, response) => action(SENDOTP[SUCCESS], { data, response }),
  failure: (login, error) => action(SENDOTP[FAILURE], { login, error })
}

export const signup = {
  request: data => action(SIGNUP[REQUEST], { data }),
  success: (data, response) => action(SIGNUP[SUCCESS], { data, response }),
  failure: (login, error) => action(SIGNUP[FAILURE], { login, error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}

export const updateProfileDetails = {
  request: data => action(UPDATE_PROFILE_DETAILS[REQUEST], { data }),
  success: (data, response) =>
    action(UPDATE_PROFILE_DETAILS[SUCCESS], { data, response }),
  failure: (data, error) =>
    action(UPDATE_PROFILE_DETAILS[FAILURE], { data, error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}

export const login = {
  request: data => action(LOGIN[REQUEST], { data }),
  success: (data, response) => action(LOGIN[SUCCESS], { data, response }),
  failure: (login, error) => action(LOGIN[FAILURE], { login, error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}

export const trialDates = {
  request: data => action(GET_SLOT_DATES[REQUEST], { data }),
  success: (data, response) =>
    action(GET_SLOT_DATES[SUCCESS], { data, response }),
  failure: (login, error) => action(GET_SLOT_DATES[FAILURE], { login, error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}

export const trialSessionScheduled = {
  request: data => action(TRIAL_SESSION_SCHEDULED[REQUEST], { data }),
  success: (data, response) =>
    action(TRIAL_SESSION_SCHEDULED[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(TRIAL_SESSION_SCHEDULED[FAILURE], { login, error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}
export const trialSlots = {
  request: data => action(GET_SLOTS[REQUEST], { data }),
  success: (data, response) => action(GET_SLOTS[SUCCESS], { data, response }),
  failure: error => action(GET_SLOTS[FAILURE], { error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}
export const bookSlot = {
  request: data => action(BOOK_SLOT[REQUEST], { data }),
  success: (data, response) => action(BOOK_SLOT[SUCCESS], { data, response }),
  failure: error => action(BOOK_SLOT[FAILURE], { error }),
  errorClose: flg => action(ALERT_CLOSE, { flg })
}

export const selectDateSlot = {
  request: data => action(SELECT_DATE_SLOT[REQUEST], { data })
}
export const selectDefaultSlot = {
  request: data => action(SELECT_DEFAULT_SLOT[REQUEST], { data })
}
export const selectNextSlot = {
  request: data => action(SELECT_NEXT_DATE[REQUEST], { data })
}
export const selectPreviousSlot = {
  request: data => action(SELECT_PREVIOUS_DATE[REQUEST], { data })
}
export const selectTimeSlot = {
  request: data => action(SELECT_DEFAULT_SLOT[REQUEST], { data })
}
export const authentication = {
  request: data => action(AUTHENTICATE[REQUEST], { data }),
  success: (data, response) =>
    action(AUTHENTICATE[SUCCESS], { data, response }),
  failure: (login, error) => action(AUTHENTICATE[FAILURE], { login, error })
}

export const slots = {
  request: data => action(SLOTS[REQUEST], { data }),
  success: (data, response) => action(SLOTS[SUCCESS], { data, response }),
  failure: (login, error) => action(SLOTS[FAILURE], { login, error }),
  slottoggle: data => action(SLOT_TOGGLE, { data }),
  slotWeekSwitch: data => action(SLOT_WEEK_SWITCH, { data }),
  openAllToggle: data => action(SLOT_OPENALL_TOGGLE, { data })
}

export const slotsSave = {
  request: data => action(SLOTS_SAVE[REQUEST], { data }),
  success: (data, response) => action(SLOTS_SAVE[SUCCESS], { data, response }),
  failure: (login, error) => action(SLOTS_SAVE[FAILURE], { login, error })
}

export const slotsCopy = {
  request: data => action(SLOTS_COPY[REQUEST], { data }),
  success: (data, response) => action(SLOTS_COPY[SUCCESS], { data, response }),
  failure: (login, error) => action(SLOTS_COPY[FAILURE], { login, error })
}

export const errorMessage = {
  reset: data => action(RESET_ERROR_MESSSAGE, { data })
}

export const logout = {
  request: data => action(LOGOUT[REQUEST], {})
}

export const slotMenu = {
  menuClick: data => action(SLOT_MENU_CLICK, { data })
}

export const trialCredits = {
  request: data => action(GET_TOTAL_TRIAL_CREDITS[REQUEST], { data }),
  success: (data, response) =>
    action(GET_TOTAL_TRIAL_CREDITS[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_TOTAL_TRIAL_CREDITS[FAILURE], { login, error })
}

export const paidCredits = {
  request: data => action(GET_TOTAL_PAID_CREDITS[REQUEST], { data }),
  success: (data, response) =>
    action(GET_TOTAL_PAID_CREDITS[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_TOTAL_PAID_CREDITS[FAILURE], { login, error })
}

export const bookings = {
  request: data => action(GET_BOOKINGS[REQUEST], { data }),
  success: (data, response) =>
    action(GET_BOOKINGS[SUCCESS], { data, response }),
  failure: (login, error) => action(GET_BOOKINGS[FAILURE], { login, error })
}

export const miniSchedular = {
  toggle: data => action(MINI_SCHEDULER_ACTIVITY_TOGGLE, { data }),
  actvityTabSwitch: data => action(MINI_SCHEDULER_ACTIVITY_TAB, { data })
}

export const sessionMaster = {
  request: data => action(GET_MASTER_SESSION[REQUEST], { data }),
  success: (data, response) =>
    action(GET_MASTER_SESSION[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_MASTER_SESSION[FAILURE], { login, error })
}

export const sessionContent = {
  activeClass: data => action(SESSION_PANE_CROUSAL_SELECTED, { data })
}

export const totalStar = {
  request: data => action(GET_TOTAL_STAR[REQUEST], { data }),
  success: (data, response) =>
    action(GET_TOTAL_STAR[SUCCESS], { data, response }),
  failure: (login, error) => action(GET_TOTAL_STAR[FAILURE], { login, error })
}

export const startSession = {
  request: data => action(START_SESSION[REQUEST], { data }),
  success: (data, response) =>
    action(START_SESSION[SUCCESS], { data, response }),
  failure: (login, error) => action(START_SESSION[FAILURE], { login, error })
}
export const topAvailableTutors = {
  request: data => action(GET_TUTOR_BY_AVAILABILITY[REQUEST], { data }),
  success: (data, response) =>
    action(GET_TUTOR_BY_AVAILABILITY[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_TUTOR_BY_AVAILABILITY[FAILURE], { login, error })
}

export const latestBookedTutor = {
  request: data => action(GET_TUTOR_FOR_LAST_BOOKING[REQUEST], { data }),
  success: (data, response) =>
    action(GET_TUTOR_FOR_LAST_BOOKING[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_TUTOR_FOR_LAST_BOOKING[FAILURE], { login, error })
}

export const studentBookedSlots = {
  request: data => action(GET_STUDENT_BOOKED_SLOTS[REQUEST], { data }),
  success: (data, response) =>
    action(GET_STUDENT_BOOKED_SLOTS[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_STUDENT_BOOKED_SLOTS[FAILURE], { login, error })
}

export const endSessionNoShow = {
  request: data => action(END_SESSION_NO_SHOW[REQUEST], { data }),
  success: (data, response) =>
    action(END_SESSION_NO_SHOW[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(END_SESSION_NO_SHOW[FAILURE], { login, error })
}
export const endSession = {
  request: data => action(END_SESSION[REQUEST], { data }),
  success: (data, response) => action(END_SESSION[SUCCESS], { data, response }),
  failure: (login, error) => action(END_SESSION[FAILURE], { login, error })
}
export const endSessionNoShowTech = {
  request: data => action(END_SESSION_NO_SHOW_TECH[REQUEST], { data }),
  success: (data, response) =>
    action(END_SESSION_NO_SHOW_TECH[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(END_SESSION_NO_SHOW_TECH[FAILURE], { login, error })
}

export const tutorSlots = {
  request: payload => action(GET_TUTOR_SLOTS[REQUEST], { payload }),
  success: (data, response) =>
    action(GET_TUTOR_SLOTS[SUCCESS], { data, response }),
  failure: (login, error) => action(GET_TUTOR_SLOTS[FAILURE], { login, error })
}

export const nextSession = {
  request: data => action(GET_NEXT_SESSION_TO_BOOK[REQUEST], { data }),
  success: (data, response) =>
    action(GET_NEXT_SESSION_TO_BOOK[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_NEXT_SESSION_TO_BOOK[FAILURE], { login, error })
}

export const createBooking = {
  request: data => action(CREATE_BOOKINGS[REQUEST], { data }),
  success: (data, response) =>
    action(CREATE_BOOKINGS[SUCCESS], { data, response }),
  failure: (login, error) => action(CREATE_BOOKINGS[FAILURE], { login, error })
}

export const cancelBooking = {
  request: data => action(CANCEL_BOOKINGS[REQUEST], { data }),
  success: (data, response) =>
    action(CANCEL_BOOKINGS[SUCCESS], { data, response }),
  failure: (login, error) => action(CANCEL_BOOKINGS[FAILURE], { login, error })
}

export const unresolvedSessions = {
  request: data => action(GET_UNRESOLVED_SESSIONS[REQUEST], { data }),
  success: (data, response) =>
    action(GET_UNRESOLVED_SESSIONS[SUCCESS], { data, response }),
  failure: (login, error) =>
    action(GET_UNRESOLVED_SESSIONS[FAILURE], { login, error })
}

export const actionTypes = {
  ...actions
}

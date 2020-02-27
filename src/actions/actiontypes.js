export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const createRequestTypes = base => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const SENDOTP = createRequestTypes('SENDOTP')
export const SIGNUP = createRequestTypes('SIGNUP')
export const LOGIN = createRequestTypes('LOGIN')
export const LOGOUT = createRequestTypes('LOGOUT')
export const ALERT_CLOSE = 'ALERT_CLOSE'
export const AUTHENTICATE = createRequestTypes('AUTHENTICATE')
export const SLOTS = createRequestTypes('SLOTS')
export const SLOTS_SAVE = createRequestTypes('SLOT_SAVE')
export const SLOTS_COPY = createRequestTypes('SLOT_COPY')
export const SLOT_TOGGLE = 'SLOT_TOGGLE'
export const SLOT_WEEK_SWITCH = 'SLOT_WEEK_SWITCH'
export const SLOT_OPENALL_TOGGLE = 'SLOT_OPENALL_TOGGLE'
export const RESET_ERROR_MESSSAGE = 'ERROR_MESSAGE_RESET'
export const SLOT_MENU_CLICK = 'SLOT_MENU_CLICK'
export const UPDATE_PROFILE_DETAILS = createRequestTypes(
  'UPDATE_PROFILE_DETAILS'
)

export const GET_SLOTS = createRequestTypes('GET_SLOTS')
export const GET_SLOT_DATES = createRequestTypes('GET_SLOT_DATES')
export const BOOK_SLOT = createRequestTypes('BOOK_SLOT')
export const SELECT_DATE_SLOT = createRequestTypes('SELECT_DATE_SLOT')
export const SELECT_TIME_SLOT = createRequestTypes('SELECT_TIME_SLOT')
export const TRIAL_SESSION_SCHEDULED = createRequestTypes(
  'TRIAL_SESSION_SCHEDULED'
)
export const SELECT_NEXT_DATE = createRequestTypes('SELECT_NEXT_DATE')
export const SELECT_PREVIOUS_DATE = createRequestTypes('SELECT_PREVIOUS_DATE')
export const SELECT_DEFAULT_SLOT = createRequestTypes('SELECT_DEFAULT_SLOT')

export const GET_BOOKINGS = createRequestTypes('GET_BOOKINGS')
export const CREATE_BOOKINGS = createRequestTypes('CREATE_BOOKINGS')
export const CANCEL_BOOKINGS = createRequestTypes('CANCEL_BOOKINGS')

export const GET_MASTER_SESSION = createRequestTypes('GET_MASTER_SESSION')

export const GET_TOTAL_STAR = createRequestTypes('GET_TOTAL_STAR')

export const GET_TOTAL_TRIAL_CREDITS = createRequestTypes(
  'GET_TOTAL_TRIAL_CREDITS'
)
export const GET_TOTAL_PAID_CREDITS = createRequestTypes(
  'GET_TOTAL_PAID_CREDITS'
)

export const MINI_SCHEDULER_ACTIVITY_TOGGLE = 'MINI_SCHEDULER_ACTIVITY_TOGGLE'
export const MINI_SCHEDULER_ACTIVITY_TAB = 'MINI_SCHEDULER_ACTIVITY_TAB'
export const SESSION_PANE_CROUSAL_SELECTED = 'SESSION_PANE_CROUSAL_SELECTED'
export const START_SESSION = createRequestTypes('START_SESSION')

export const GET_TUTOR_SLOTS = createRequestTypes('GET_TUTOR_SLOTS')
export const END_SESSION = createRequestTypes('END_SESSION')
export const END_SESSION_NO_SHOW = createRequestTypes('END_SESSION_NO_SHOW')
export const END_SESSION_NO_SHOW_TECH = createRequestTypes(
  'END_SESSION_NO_SHOW_TECH'
)
export const GET_TUTOR_BY_AVAILABILITY = createRequestTypes(
  'GET_TUTOR_BY_AVAILABILITY'
)
export const GET_TUTOR_FOR_LAST_BOOKING = createRequestTypes(
  'GET_TUTOR_FOR_LAST_BOOKING'
)

export const GET_STUDENT_BOOKED_SLOTS = createRequestTypes(
  'GET_STUDENT_BOOKED_SLOTS'
)

export const GET_NEXT_SESSION_TO_BOOK = createRequestTypes(
  'GET_NEXT_SESSION_TO_BOOK'
)

export const GET_UNRESOLVED_SESSIONS = createRequestTypes(
  'GET_UNRESOLVED_SESSIONS'
)

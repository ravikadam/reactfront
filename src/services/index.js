import axios from 'axios'
import { config } from '../config'
import { GET_AUTH, isAuthenticated } from './auth'
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 20000,
  headers: isAuthenticated()
    ? {
        Authorization: 'Bearer ' + GET_AUTH()
      }
    : {}
})

export const addAuthToken = () => {
  api.defaults.headers.common['Authorization'] = isAuthenticated()
    ? 'Bearer ' + GET_AUTH()
    : ''
  api.defaults.headers['Authorization'] = isAuthenticated()
    ? 'Bearer ' + GET_AUTH()
    : ''
}

const GET = async (url, params = {}) => {
  const response = await api.get(url, { params })
  return response
}

const POST = async (url, data) => {
  const response = await api.post(url, data)
  return response
}

const PUT = async (url, data) => {
  const response = await api.put(url, data)
  return response
}

const DELETE = async (url, data) => {
  const response = await api.delete(url, data)
  return response
}

// api services
export const signUp = data => POST(`students/signup`, data)
export const sendOTP = data => POST(`students/sendOTP`, data)
export const loggedInUser = () => GET(`user/`)
export const getUser = id => GET(`users/{$id}`)
export const updateUser = (id, data) => PUT(`user/${id}`, data)

export const loginUser = data => POST(`token/login`, data)
// Slots
export const getSlots = ({ userId, startDate, endDate }) =>
  GET(`user/${userId}/slots`, {
    start_date: `${startDate}`,
    end_date: `${endDate}`
  })

export const saveSlots = ({ userId }, data) =>
  POST(`user/${userId}/slots`, data)

export const getDateRangeForSlots = ({ userId, startDate }) =>
  GET(`user/${userId}/slots/dates`, {
    start_date: `${startDate}`
  })

export const copySlots = ({ userId, currentDate, startDate, endDate, slots }) =>
  POST(`user/${userId}/slots/copy`, {
    start_date: `${startDate}`,
    end_date: `${endDate}`,
    current_date: `${currentDate}`,
    slots
  })

export const getTrialSlots = ({ userId, courseId, startDate }) =>
  GET(`user/${userId}/slots/trial?start_date=${startDate}`)

export const bookTrialSlot = ({ userId, slot }) =>
  POST(`user/${userId}/slots/trial/book`, slot)

export const isTrialScheduled = userId =>
  GET(`user/${userId}/slots/trial/isScheduled`)

export const getUserCredits = ({ userId, isTrial }) =>
  GET(`user/${userId}/credits/total`, { is_trial: isTrial })

export const getBookings = ({ userId, limit, status, date }) =>
  GET(`user/${userId}/bookings/`, {
    limit,
    status,
    date
  })

export const getAllMasterSessions = ({ userId }) =>
  GET(`user/${userId}/session/`)

export const getTotalUserStars = ({ userId }) =>
  GET(`user/${userId}/star/total`)

export const startSession = data =>
  GET(`user/${data.userId}/session/start`, {
    bookingId: data.bookingId
  })

export const getUnResolvedSessions = ({ userId, currentDate }) =>
  POST(`user/${userId}/session/unresolved`, {
    currentDate: currentDate
  })
export const endSession = data =>
  POST(`user/${data.userId}/session/end`, {
    sessionId: data.sessionId,
    bookingId: data.bookingId,
    isTrial: data.isTrial,
    tutor_comment: data.comment
  })
export const noShow = data =>
  POST(`user/${data.userId}/session/no-show`, {
    sessionId: data.sessionId,
    bookingId: data.bookingId,
    isTrial: data.isTrial,
    tutor_comment: data.comment
  })
export const noShowTech = data =>
  POST(`user/${data.userId}/session/no-show-tech`, {
    sessionId: data.sessionId,
    bookingId: data.bookingId,
    isTrial: data.isTrial,
    tutor_comment: data.comment
  })

export const getSlotsByTutor = ({ userId, tutorId, startDate, endDate }) =>
  GET(`user/${userId}/slots/tutor/${tutorId}`, {
    start_date: `${startDate}`,
    status: 'open'
  })
export const getAllStudentBookedSlots = ({ userId }) =>
  GET(`user/${userId}/slots/student`)

export const getTutorsByAvailability = ({
  userId,
  startDate,
  endDate,
  limit
}) =>
  GET(`user/${userId}/slots/availability`, {
    start_date: `${startDate}`,
    limit
  })

export const getTutorsForLastBooking = ({ userId }) =>
  GET(`user/${userId}/bookings/latest`)

export const getNextSessionToBeBooked = ({ userId }) =>
  GET(`user/${userId}/session/next`)

export const createBooking = ({
  userId,
  tutorId,
  slotId,
  bookingDate,
  currentDate,
  sessionMasterId
}) =>
  POST(`user/${userId}/bookings/`, {
    tutor_id: tutorId,
    slot_id: slotId,
    booking_date: bookingDate,
    current_date: currentDate,
    session_master_id: sessionMasterId
  })

export const cancelBooking = ({
  userId,
  bookingId,
  sessionId,
  slotId,
  currentDate
}) =>
  POST(`user/${userId}/bookings/cancel`, {
    booking_id: bookingId,
    session_id: sessionId,
    slot_id: slotId,
    current_date: currentDate
  })

// eslint-disable-next-line no-unused-vars
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

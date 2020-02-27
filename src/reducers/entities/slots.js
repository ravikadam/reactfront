import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'
import { SlotStatus } from '../../constants'
import Constants, { UserRole } from '../../constants'
import {
  isBetweenDates,
  compareTimeHours,
  compareWithCurrent,
  weeklyDateRange,
  isSameDay
} from '../../helpers/dateHelper'
import slotEntity from './slot'
const ErrorCodes = Constants.ErrorCodes

const {
  SUCCESS,
  FAILURE,
  REQUEST,
  SLOTS,
  SLOTS_SAVE,
  SLOT_TOGGLE,
  SLOTS_COPY,
  GET_TUTOR_SLOTS,
  GET_STUDENT_BOOKED_SLOTS,
  GET_TUTOR_FOR_LAST_BOOKING,
  CREATE_BOOKINGS,
  CANCEL_BOOKINGS
} = actionTypes

const entity = () => {
  const handleSaveError = (state, payLoad) => {
    switch (payLoad.type) {
      case ErrorCodes.SLOT_NOT_EDITABLE:
      case ErrorCodes.SLOT_OPEN_MINIMUM_DAYS:
      case ErrorCodes.SLOT_CLOSE_MINIMUM_DAYS:
        const { slots } = payLoad.data
        if (slots && slots.length > 0) {
          const res = slots.reduce((res, slot) => {
            res[slot.id] = slot
            return res
          }, {})
          return state.map(s => {
            return res[s.id] ? slotEntity(res[s.id], payLoad) : s
          })
        } else {
          return state
        }
      default:
        return state
    }
  }

  const bookedSlots = (state = [], action) => {
    switch (action.type) {
      case GET_STUDENT_BOOKED_SLOTS[SUCCESS]:
        return action.payload.slots
      case GET_STUDENT_BOOKED_SLOTS[REQUEST]:
      case GET_STUDENT_BOOKED_SLOTS[FAILURE]:
        return []
      default:
        return state
    }
  }

  const slots = (state = [], action) => {
    switch (action.type) {
      case SLOTS[SUCCESS]:
      case GET_TUTOR_SLOTS[SUCCESS]:
        return action.payload.slots
      case SLOTS[REQUEST]:
      case SLOTS[FAILURE]:
      case GET_TUTOR_SLOTS[REQUEST]:
      case GET_TUTOR_SLOTS[FAILURE]:
        return []
      case SLOT_TOGGLE:
        const { data } = action
        return state.map(s => {
          return s.id === data.id ? slotEntity(s, action) : s
        })
      case SLOTS_SAVE[SUCCESS]:
      case SLOTS_COPY[SUCCESS]:
        const { slots } = action.payload
        if (slots && slots.length > 0) {
          const res = slots.reduce((res, slot) => {
            res[slot.id] = slot
            return res
          }, {})
          return state.map(s => {
            return res[s.id] ? slotEntity(res[s.id], action) : s
          })
        } else {
          return state
        }
      case SLOTS_SAVE[FAILURE]:
        return handleSaveError(state, action.payload)
      case CREATE_BOOKINGS[SUCCESS]:
        const { slot } = action.payload
        return state.filter(dSlot => dSlot.id !== slot.id)
      case CANCEL_BOOKINGS[SUCCESS]:
        const { slot: openedSlot } = action.payload
        return state.concat(openedSlot)
      default:
        return state
    }
  }

  const startDate = (state = '', action) => {
    switch (action.type) {
      case SLOTS[SUCCESS]:
      case GET_TUTOR_SLOTS[SUCCESS]:
        return action.payload.start_date
      case SLOTS[REQUEST]:
      case SLOTS[FAILURE]:
      case GET_TUTOR_SLOTS[REQUEST]:
      case GET_TUTOR_SLOTS[FAILURE]:
        return ''
      default:
        return state
    }
  }

  const endDate = (state = '', action) => {
    switch (action.type) {
      case SLOTS[SUCCESS]:
      case GET_TUTOR_SLOTS[SUCCESS]:
        return action.payload.end_date
      case SLOTS[REQUEST]:
      case SLOTS[FAILURE]:
      case GET_TUTOR_SLOTS[REQUEST]:
      case GET_TUTOR_SLOTS[FAILURE]:
        return ''
      default:
        return state
    }
  }

  const isSlotEdited = (state = {}, action) => {
    switch (action.type) {
      case SLOTS_SAVE[SUCCESS]:
      case SLOTS_COPY[SUCCESS]:
        const { slots } = action.payload
        const res = slots.reduce((res, slot) => {
          res[slot.id] = true
          return res
        }, {})
        return {
          ...state,
          ...res
        }
      case SLOTS_SAVE[FAILURE]:
        return state
      default:
        return state
    }
  }

  const currentTutor = (state = null, action) => {
    switch (action.type) {
      case GET_TUTOR_FOR_LAST_BOOKING[SUCCESS]:
      case GET_TUTOR_SLOTS[REQUEST]:
        const { tutor_id } = action.payload
        return tutor_id
      case GET_TUTOR_FOR_LAST_BOOKING[FAILURE]:
      case GET_TUTOR_FOR_LAST_BOOKING[REQUEST]:
        return null
      default:
        return state
    }
  }

  return combineReducers({
    slots,
    startDate,
    endDate,
    isSlotEdited,
    bookedSlots,
    currentTutor
  })
}

export default entity

// export const getAllSlots = state => state.slots

const getSlotsByUserRole = (state, userRole, bookedSlots) => {
  switch (userRole) {
    case UserRole.STUDENT:
      const tutorBookedSlots = getBookedSlotsForTutor(
        bookedSlots || [],
        state.currentTutor
      )
      return state.slots.concat(tutorBookedSlots)
    default:
      return state.slots
  }
}

export const getAllSlotsforDay = (state, userRole, bookedSlots) => date =>
  getSlotsByUserRole(state, userRole, bookedSlots)
    .filter(slot => isSameDay(date, slot.start_date))
    .sort((a, b) => {
      return compareTimeHours(a.start_date, b.start_date) ? -1 : 1
    })

/**
 * Method to check wheather slot is disabled
 * If slot if edited in current session then edit and open slot validation will be ignored
 */

export const isSlotDisabled = (
  state,
  slotConstants,
  userRole,
  bookedSlots
) => slot => {
  switch (userRole) {
    case UserRole.TUTOR:
      const tutorSlotDisabled = isSlotDisabledTutor(state, slotConstants)
      return tutorSlotDisabled(slot)
    case UserRole.STUDENT:
      const studentSlotDisabled = isSlotDisabledStudent(
        state,
        slotConstants,
        bookedSlots
      )
      return studentSlotDisabled(slot)
    default:
      return false
  }
}

const isSlotDisabledTutor = (state, slotConstants) => slot =>
  (!state.isSlotEdited[slot.id] &&
    (canTutorEditSlot(slotConstants, slot) ||
      canTutorOpenSlot(slotConstants, slot))) ||
  (slot.status !== SlotStatus.CLOSED && slot.status !== SlotStatus.OPEN)

const isSlotDisabledStudent = (state, slotConstants, bookedSlots) => slot =>
  canStudentBookSlot(slotConstants, slot) ||
  isStudentBookingAllowedForDay(slotConstants, slot, bookedSlots) ||
  isStudentBookingAllowedForWeek(slotConstants, slot, bookedSlots) ||
  canStudentCancelBooking(slotConstants, slot)

const canTutorEditSlot = ({ MINIMUM_DAYS_TUTOR_EDIT_SLOT }, slot) =>
  slot.status === SlotStatus.OPEN &&
  compareWithCurrent(slot.start_date) < MINIMUM_DAYS_TUTOR_EDIT_SLOT

const canTutorOpenSlot = ({ MINIMUM_DAYS_TUTOR_OPEN_SLOT }, slot) =>
  slot.status === SlotStatus.CLOSED &&
  compareWithCurrent(slot.start_date) < MINIMUM_DAYS_TUTOR_OPEN_SLOT

const canStudentCancelBooking = (
  { MINIMUM_DAYS_STUDENT_CANCEL_BOOKING },
  slot
) =>
  slot.status === SlotStatus.BOOKED &&
  compareWithCurrent(slot.start_date) < MINIMUM_DAYS_STUDENT_CANCEL_BOOKING

const canStudentBookSlot = ({ MINIMUM_DAYS_STUDENT_BOOK_SLOT }, slot) =>
  slot.status === SlotStatus.OPEN &&
  compareWithCurrent(slot.start_date) < MINIMUM_DAYS_STUDENT_BOOK_SLOT

const isStudentBookingAllowedForDay = (
  { BOOKING_ALLOWED_PER_DAY },
  slot,
  bookedSlots
) =>
  slot.status === SlotStatus.OPEN &&
  !(
    countOfSlotsBookedForDay(slot.start_date, bookedSlots) <
    BOOKING_ALLOWED_PER_DAY
  )

const isStudentBookingAllowedForWeek = (
  { BOOKING_ALLOWED_PER_WEEK },
  slot,
  bookedSlots
) => {
  const dateRange = weeklyDateRange(slot.start_date)
  return (
    slot.status === SlotStatus.OPEN &&
    !(
      countOfSlotsBookedForDates(
        dateRange.startDate,
        dateRange.endDate,
        bookedSlots
      ) < BOOKING_ALLOWED_PER_WEEK
    )
  )
}

const countOfSlotsBookedForDay = (startDate, bookedSlots) => {
  const filteredSlots = bookedSlots.filter(slot =>
    isSameDay(slot.start_date, startDate)
  )
  return filteredSlots.length
}

const countOfSlotsBookedForDates = (startDate, endDate, bookedSlots, flg) => {
  const filteredSlots = bookedSlots.filter(slot =>
    isBetweenDates(slot.start_date, startDate, endDate)
  )
  return filteredSlots.length
}
export const isSlotBooked = (state, props) => slot =>
  slot.status === SlotStatus.BOOKED

export const isSlotClosed = (state, props) => slot =>
  slot.status === SlotStatus.CLOSED

export const isSlotOpen = (state, props) => slot =>
  slot.status === SlotStatus.OPEN

export const getStartDate = (state, props) => state.startDate

export const getEndDate = (state, props) => state.endDate

export const isSlotSaving = (state, props) => slot => slot.isSaving

export const countOpenSlotsByWeek = (state, props) => (startDate, endDate) => {
  const filteredSlots = state.slots.filter(slot =>
    isBetweenDates(slot.start_date, startDate, endDate)
  )
  return getOpenSlotCount(filteredSlots)
}

export const countBookedSlotsByWeek = (state, bookedSlots) => (
  startDate,
  endDate
) => {
  const filteredSlots = bookedSlots.filter(slot =>
    isBetweenDates(slot.start_date, startDate, endDate)
  )
  return getBookedSlotCount(filteredSlots)
}

export const getSlotsByDateRange = (state, slotConstants, userRole) => (
  startDate,
  endDate
) => {
  const isSlotNonEditable = isSlotDisabled(state, slotConstants, userRole)
  const filteredSlots = state.slots.filter(
    slot =>
      isBetweenDates(slot.start_date, startDate, endDate) &&
      !isSlotNonEditable(slot)
  )
  return filteredSlots
}

const getOpenSlotCount = slots => {
  if (slots && slots.length > 0) {
    return slots.length - getClosedSlotCount(slots)
  }
  return 0
}

const getBookedSlotCount = slots =>
  slots.reduce((res, slot) => {
    res += slot.status === SlotStatus.BOOKED ? 1 : 0
    return res
  }, 0)

const getClosedSlotCount = slots =>
  slots.reduce((res, slot) => {
    res += slot.status === SlotStatus.CLOSED ? 1 : 0
    return res
  }, 0)

const getBookedSlotsForTutor = (bookedSlots, tutorId) =>
  bookedSlots.filter(slot => slot.tutor_id === tutorId)

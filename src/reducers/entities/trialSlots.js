import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'
import { format } from '../../helpers/dateHelper'
import { groupBy, sort, compose } from 'ramda'

import * as _ from 'lodash'

const {
  GET_SLOTS,
  BOOK_SLOT,
  SELECT_DATE_SLOT,
  SELECT_DEFAULT_SLOT,
  SELECT_NEXT_DATE,
  SELECT_PREVIOUS_DATE,
  REQUEST,
  SUCCESS,
  FAILURE
} = actionTypes

const initialState = {
  slot: {},
  timeSlots: [],
  dateSlots: [],
  selectedDate: '',
  selectedTime: '',
  bookingStatus: '',
  isNextSlotAvailable: false,
  isPreviousSlotAvailable: false
}

const selectDate = (state, date) => {
  let slots = _.keys(state.slot)
  let selected = slots.indexOf(date)
  let nextSlotIndex = selected + 1
  let previousSlotIndex = selected - 1
  let selectedSlot = state.slot[date]
  return Object.assign({}, state, {
    selectedDate: date,
    timeSlots: selectedSlot ? selectedSlot : [],
    isPreviousSlotAvailable: previousSlotIndex < 0 ? false : true,
    isNextSlotAvailable: nextSlotIndex >= slots.length ? false : true
  })
}

const bookTrialSlot = () => {
  const getSlots = (state = initialState, action) => {
    switch (action.type) {
      case GET_SLOTS[REQUEST]:
      case GET_SLOTS[FAILURE]:
        return initialState
      case GET_SLOTS[SUCCESS]:
        const slot = action.payload.slots
          ? action.payload.slots
          : action.payload
        const slotByDate = compose(
          groupBy(s => {
            return format(s.start_date)
          }),
          sort((a, b) => {
            return a.start_date < b.start_date ? -1 : 1
          })
        )(slot)

        const selectedDate = Object.keys(slotByDate)[0]
        return Object.assign({}, state, {
          slot: slotByDate,
          dateSlots: Object.keys(slotByDate),
          timeSlots: slotByDate[selectedDate] ? slotByDate[selectedDate] : []
        })
      case SELECT_DATE_SLOT[REQUEST]:
        return selectDate(state, action.data)

      case SELECT_NEXT_DATE[REQUEST]:
        let slots = _.keys(state.slot)
        return selectDate(state, slots[slots.indexOf(state.selectedDate) + 1])

      case SELECT_PREVIOUS_DATE[REQUEST]:
        slots = _.keys(state.slot)
        return selectDate(state, slots[slots.indexOf(state.selectedDate) - 1])
      case SELECT_DEFAULT_SLOT[REQUEST]:
        slots = _.keys(state.slot)
        if (slots.length > 0) {
          return selectDate(state, slots[0])
        }
        return state
      case BOOK_SLOT[REQUEST]:
        return Object.assign({}, state, {
          selectedTime: action.data
        })
      case BOOK_SLOT[SUCCESS]:
        let bookingStatus = action.payload == 1 ? 'SUCCESS' : 'FAILURE'
        return Object.assign({}, state, {
          bookingStatus: bookingStatus
        })
      default:
        return state
    }
  }

  return combineReducers({
    getSlots: getSlots
  })
}

export default bookTrialSlot

export const getTimeSlots = state => state.getSlots.timeSlots

export const getSlots = state => state.getSlots.slot

export const getDateSlots = state => state.getSlots.dateSlots

export const selectedDate = state => state.getSlots.selectedDate

export const selectedTime = state => state.getSlots.selectedTime

export const bookingStatus = state => state.getSlots.bookingStatus

export const isNextSlotAvailable = state => state.getSlots.isNextSlotAvailable

export const isPreviousSlotAvailable = state =>
  state.getSlots.isPreviousSlotAvailable

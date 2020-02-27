import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'
import Constants from '../../constants'
const {
  SUCCESS,
  FAILURE,
  REQUEST,
  SLOTS,
  SLOTS_SAVE,
  SLOT_WEEK_SWITCH,
  SLOT_OPENALL_TOGGLE,
  SLOT_MENU_CLICK,
  SLOTS_COPY,
  GET_TUTOR_SLOTS
} = actionTypes
const ErrorCodes = Constants.ErrorCodes

const ui = () => {
  const handleIsSavingErrorOnSave = (state, payload) => {
    switch (payload.type) {
      case ErrorCodes.SLOT_NOT_EDITABLE:
      case ErrorCodes.SLOT_OPEN_MINIMUM_DAYS:
      case ErrorCodes.SLOT_CLOSE_MINIMUM_DAYS:
        const { slots } = payload.data
        const res = slots.reduce((res, slot) => {
          res[slot.id] = false
          return res
        }, {})
        return {
          ...state,
          ...res
        }
      default:
        return state
    }
  }

  const isSlotsFetched = (state = false, action) => {
    switch (action.type) {
      case SLOTS[SUCCESS]:
      case GET_TUTOR_SLOTS[SUCCESS]:
        return true
      case SLOTS[REQUEST]:
      case SLOTS[FAILURE]:
      case GET_TUTOR_SLOTS[REQUEST]:
      case GET_TUTOR_SLOTS[FAILURE]:
        return false
      default:
        return state
    }
  }

  const isSlotsSaving = (state = {}, action) => {
    switch (action.type) {
      case SLOTS_COPY[REQUEST]:
        const {
          data: { slots: copySlots }
        } = action
        return {
          ...state,
          ...copySlots.reduce((res, slot) => {
            res[slot.id] = true
            return res
          }, {})
        }
      case SLOTS_SAVE[REQUEST]:
        const { data } = action
        const finData = {}
        if (Array.isArray(data)) {
          data.forEach(slot => {
            finData[slot.id] = true
          })
        } else {
          finData[data.id] = true
        }
        return {
          ...state,
          ...finData
        }
      case SLOTS_SAVE[SUCCESS]:
      case SLOTS_COPY[SUCCESS]:
        const { slots } = action.payload
        const res = slots.reduce((res, slot) => {
          res[slot.id] = false
          return res
        }, {})
        return {
          ...state,
          ...res
        }
      case SLOTS_SAVE[FAILURE]:
        return handleIsSavingErrorOnSave(state, action.payload)
      default:
        return state
    }
  }

  const currentWeek = (state = 0, action) => {
    switch (action.type) {
      case SLOT_WEEK_SWITCH:
        return action.data
      default:
        return state
    }
  }

  const openAllSlotsForDay = (state = {}, action) => {
    switch (action.type) {
      case SLOT_OPENALL_TOGGLE:
        const { data } = action
        const toggle = {}
        toggle[data] = !state[data]
        return {
          ...state,
          ...toggle
        }
      default:
        return state
    }
  }

  const menuAnchorElem = (state = null, action) => {
    switch (action.type) {
      case SLOT_MENU_CLICK:
        return action.data
      default:
        return state
    }
  }

  return combineReducers({
    isSlotsFetched,
    isSlotsSaving,
    currentWeek,
    openAllSlotsForDay,
    menuAnchorElem
  })
}

export default ui

export const isSlotsFetched = state => state.isSlotsFetched

export const isSlotSaving = state => id => state.isSlotsSaving[id]

export const getCurrentWeek = state => state.currentWeek

export const openAllSlotsForDay = state => day => state.openAllSlotsForDay[day]

export const getAnchorElem = state => state.menuAnchorElem

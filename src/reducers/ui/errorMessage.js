import { combineReducers } from 'redux'
import { actionTypes } from '../../actions'
import messages from '../../i18n'
import Constants from '../../constants'

const { SUCCESS, FAILURE, SLOTS_SAVE, RESET_ERROR_MESSSAGE } = actionTypes
const ErrorCodes = Constants.ErrorCodes

const uiMessage = () => {
  const handleErrorOnSave = (state, payLoad) => {
    switch (payLoad.type) {
      case ErrorCodes.SLOT_NOT_EDITABLE:
        return messages['schedular.slotNotEditable']
      case ErrorCodes.SLOT_OPEN_MINIMUM_DAYS:
        return messages['schedular.slotCannotOpen']
      case ErrorCodes.SLOT_CLOSE_MINIMUM_DAYS:
        return messages['schedular.slotCannotClose']
      default:
        return state
    }
  }

  const errorMessage = (state = '', action) => {
    switch (action.type) {
      case SLOTS_SAVE[SUCCESS]:
      case RESET_ERROR_MESSSAGE:
        return ''
      case SLOTS_SAVE[FAILURE]:
        return handleErrorOnSave(state, action.payload)
      default:
        return state
    }
  }

  return combineReducers({
    errorMessage
  })
}

export default uiMessage

export const getErrorMessage = state => state.errorMessage

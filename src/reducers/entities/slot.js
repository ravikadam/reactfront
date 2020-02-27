import { SlotStatus } from '../../constants'
import { actionTypes } from '../../actions'

const { SUCCESS, SLOT_TOGGLE, SLOTS_SAVE } = actionTypes
const { CLOSED, OPEN } = SlotStatus

const slot = (state, action) => {
  switch (action.type) {
    case SLOT_TOGGLE:
      return {
        ...state,
        status: state.status === CLOSED ? OPEN : CLOSED,
        edited: true
      }
    case SLOTS_SAVE[SUCCESS]:
      return {
        ...state
      }
    default:
      return state
  }
}

export default slot

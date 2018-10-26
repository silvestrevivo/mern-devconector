import { GET_ERRORS } from '../actions/types'
import { CLEAN_REGISTER_ERRORS } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    case CLEAN_REGISTER_ERRORS:
      return action.payload
    default:
      return state
  }
}

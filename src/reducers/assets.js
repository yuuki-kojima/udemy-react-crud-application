import {
  GET_ASSETS_REQUEST, GET_ASSETS_SUCCESS, GET_ASSETS_FAILURE
} from '../actions'

const initialState = {
  isFetching: true,
  assets: [],
  offset: 0,
  hasMore: true,
  payload: {},
}

export default (state = initialState, action, history) => {
  switch (action.type) {
    case GET_ASSETS_REQUEST:
      return {
        ...state,
        isFetching: true,
        assets: action.assets,
        payload: action.payload,
      }

    case GET_ASSETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        assets: action.assets,
        offset: action.offset,
        hasMore: action.hasMore,
      }

    case GET_ASSETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    default:
      return state
  }
}

import {
  GET_ASSETS_REQUEST, GET_ASSETS_SUCCESS, GET_ASSETS_FAILURE, INITIALIZE_SUCCESS
} from '../actions'

const initialState = {
  isFetching: true,
  assets: [],
  offset: 0,
  rarity: "",
  hasMore: true,
  mode: 'Hero'
}

export default (state = [initialState], action) => {
  switch (action.type) {
    case GET_ASSETS_REQUEST:
      return [
        ...state,
        {
          isFetching: true,
          assets: action.assets,
          offset: action.offset,
          rarity: action.rarity,
          mode: action.mode,
          hasMore: action.hasMore
        }
      ]

    case GET_ASSETS_SUCCESS:
      return [
        ...state,
        {
          isFetching: false,
          assets: action.assets,
          offset: action.offset,
          rarity: action.rarity,
          mode: action.mode,
          hasMore: action.hasMore
        }
      ]

    case GET_ASSETS_FAILURE:
      return [
        ...state,
        {
          isFetching: false,
          error: action.error
        }
      ]

    case INITIALIZE_SUCCESS:
      return[
        ...state,
        {
          isFetching: true,
          offset: action.offset,
          mode: action.mode
        }
      ]

    default:
      return state
  }
}

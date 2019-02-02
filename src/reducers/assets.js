import {
  GET_ASSETS_REQUEST, GET_ASSETS_SUCCESS, GET_ASSETS_FAILURE
} from '../actions'

const initialState = {
  isFetching: true,
  assets: [],
  offset: 0,
  rarity: "All",
  hasMore: true,
  mode: 'Hero',
  sortKey: 'listing_date',
  currency: 'Ethereum',
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
          hasMore: action.hasMore,
          sortKey: action.sortKey,
          currency: action.currency,
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
          hasMore: action.hasMore,
          sortKey: action.sortKey,
          currency: action.currency,
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

    default:
      return state
  }
}

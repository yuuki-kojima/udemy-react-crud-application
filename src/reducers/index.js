import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import assets from './assets'

export default(history) => combineReducers({
  router: connectRouter(history),
  assets,
})

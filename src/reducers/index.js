import { combineReducers } from 'redux'
import chatLoader from './chatLoader'
import events from './events'

export default combineReducers({
  	chatLoader,
  	events,
});
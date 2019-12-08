import { combineReducers } from 'redux'
import user from './user'
import chats from './chats'
import messages from './messages'
import events from './events'

export default combineReducers({
  user,
  chats,
  messages,
  events
});
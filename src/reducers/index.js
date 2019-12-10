import { combineReducers } from 'redux';
import chat from './chat';
import events from './events';
import globalState from './globalState';

export default combineReducers({
  	chat,
  	events,
  	globalState,
});
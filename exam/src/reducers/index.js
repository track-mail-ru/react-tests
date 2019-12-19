import { combineReducers } from 'redux';
import weather from './weather';
import state from './state';

export default combineReducers({
	state,
	weather,
});
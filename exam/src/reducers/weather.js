import {
	GET_WEATHER_SUCCEESS,
	GET_WEATHER_FAILURE,
	GET_WEATHER_REQUEST,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	state: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_WEATHER_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_WEATHER_SUCCEESS:
			return {
				loading: false,
				error: null,
				state: {...state.state, ...action.payload}
			};
		case GET_WEATHER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

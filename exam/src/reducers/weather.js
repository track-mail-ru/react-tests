import {
	GET_WEATHER_SUCCESS,
	ADD_WEATHER_SUCCESS,
	GET_WEATHER_FAILURE,
	GET_WEATHER_REQUEST,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	list: [],
	tempWeather: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_WEATHER_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_WEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				list: action.payload,
			};
		case ADD_WEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				tempWeather: {...action.payload}
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

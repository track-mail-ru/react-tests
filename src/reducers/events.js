import {
	GET_EVENTS_REQUEST,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,
	DELETE_EVENTS,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	events: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_EVENTS_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_EVENTS_SUCCESS:
			return {
				loading: false,
				error: null,
				events: [...state.events, ...action.payload]
			};
		case GET_EVENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		case DELETE_EVENTS:
			return initialState;
		default:
			return state;
	}
};
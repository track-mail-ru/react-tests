import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	messages: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_MESSAGES_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_MESSAGES_SUCCESS:
			return {
				loading: false,
				error: null,
				messages: {...state.messages, ...action.payload}
			};
		case GET_MESSAGES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
}
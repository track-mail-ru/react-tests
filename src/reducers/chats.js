import {
	GET_CHATS_REQUEST,
	GET_CHATS_SUCCESS,
	GET_CHATS_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	chats: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CHATS_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_CHATS_SUCCESS:
			return {
				loading: false,
				error: null,
				chats: {...state.chats, ...action.payload}
			};
		case GET_CHATS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
}
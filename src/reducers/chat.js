import {
	CHAT_LOAD_START,
	UPLOAD_CHAT_INFO,
	CHAT_LOAD_FAILURE,

	GET_USER_FAILURE,

	GET_CHATS_FAILURE,

	GET_MESSAGES_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	myInfo: {},
	chatsList: {},
	messagesList: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CHAT_LOAD_START:
			return {
				...state,
				loading: true
			};
		case UPLOAD_CHAT_INFO:
			return {
				loading: false,
				error: null,
				myInfo: {
					...state.myInfo,
					...action.payload.myInfo,
				},
				chatsList: {
					...state.chatsList,
					...action.payload.chatsList,
				},
				messagesList: {
					...state.messagesList,
					...action.payload.messagesList,
				},
			};
		case CHAT_LOAD_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		case GET_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		case GET_CHATS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
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
};
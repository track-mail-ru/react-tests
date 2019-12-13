import {
	UPDATE_STATE_SUCCESS,
	UPDATE_STATE_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
	error: null,
	state: {
		mediaRecorder: null,
		activeChat: null,
		frameStyles: {
			ChatForm: null,
			ChatList: null,
			Profile: null,
		}
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_STATE_SUCCESS:
			return {
				error: null,
				state: {
					...state.state,
					...action.payload,
				}
			};
		case UPDATE_STATE_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		default:
			return state;
	}
};
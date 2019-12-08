import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	error: null,
	userInfo: {
		id: null,
		fullName: null,
		userName: null,
		avatar: `${URL_REQUEST}/media/images/default.png`,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_USER_SUCCESS:
			return {
				loading: false,
				error: null,
				userInfo: {...state.userInfo, ...action.payload}
			};
		case GET_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
};
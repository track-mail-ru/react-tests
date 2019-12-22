import {
	SET_IDS,
} from '../constants/ActionTypes';

const initialState = {
	IDs: [
		703448,
		2643743,
	],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_IDS:
			return {
				...state,
				IDs: [...action.payload],
			};
		default:
			return state;
	}
};

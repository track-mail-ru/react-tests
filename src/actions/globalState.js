import {
	UPDATE_STATE_SUCCESS,
	/*UPDATE_STATE_FAILURE,*/
} from '../constants/ActionTypes';

const updateStateSuccess = (state) => ({
	type: UPDATE_STATE_SUCCESS,
	payload: state,
});

/*const updateStateFailure = (err) => ({
	type: UPDATE_STATE_FAILURE,
	payload: {
		error: err  // error: error
	}
});*/

export function updateState(state) {
	return (dispatch, getState) => {
		dispatch(updateStateSuccess(state));
	}
}
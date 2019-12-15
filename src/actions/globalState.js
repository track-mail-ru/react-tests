import {
	UPDATE_STATE_SUCCESS,
	UPDATE_STATE_FAILURE,
} from '../constants/ActionTypes';

import { InitializeRecordStream } from '../lib/InitializeRecordStrem';

const updateStateSuccess = (state) => ({
	type: UPDATE_STATE_SUCCESS,
	payload: state,
});

const updateStateFailure = (err) => ({
	type: UPDATE_STATE_FAILURE,
	payload: {
		error: err  // error: error
	}
}); 

export function updateState(state) {
	return (dispatch, getState) => {
		dispatch(updateStateSuccess(state));
	};
}

export function requireRecorder() {
	return async function (dispatch, getState) {
		const {mediaRecorder} = getState().state;
		if (mediaRecorder) { return mediaRecorder; }

		InitializeRecordStream()
			.then((value) => {
				updateStateSuccess({
					mediaRecorder: value
				})(dispatch, getState);
				return value;
			}).catch((err) => {
				updateStateFailure(err)(dispatch, getState);
			});
	};
}

export function setFrameStyle(frameName, style) {
	return (dispatch, getState) => {
		const {frameStyles} = getState().globalState.state;
		frameStyles[frameName] = style;
		updateState({
			frameStyles,
		})(dispatch, getState);
	};
}
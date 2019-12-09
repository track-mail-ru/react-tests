import {
	GET_EVENTS_REQUEST,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const getEventsSuccess = (events) => ({
	type: GET_EVENTS_SUCCESS,
	payload: events
});

const getEventsStarted = () => ({
	type: GET_EVENTS_REQUEST,
});

const getEventsFailure = (error) => ({
	type: GET_EVENTS_FAILURE,
	payload: {
		error  // error: error
	}
});

export default function(callback = null) {
	return async (dispatch, getState) => {
		console.log('state: ', getState());
		dispatch(getEventsStarted());

		fetch(`${URL_REQUEST}/events/`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			dispatch(getEventsSuccess(res.response))
			if (callback) { callback(getState()); }
		})
		.catch(err => {
			dispatch(getEventsFailure(err))
		});
	}
}
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

export function getEvents(myInfo) {
	return (dispatch, getState) => {
		console.log('state: ', getState());
		dispatch(getUserStarted());

		fetch(`${URL_REQUEST}/events/`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			dispatch(getUserSuccess(res.response))
		})
		.catch(err => {
			dispatch(getUserFailure(err))
		});
	}
}
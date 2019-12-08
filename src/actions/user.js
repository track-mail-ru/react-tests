import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const getUserSuccess = (info) => ({
	type: GET_USER_SUCCESS,
	payload: info
});

const getUserStarted = () => ({
	type: GET_USER_REQUEST,
});

const getUserFailure = (error) => ({
	type: GET_USER_FAILURE,
	payload: {
		error  // error: error
	}
});

export function getUser() {
	return (dispatch, getState) => {
		console.log('state: ', getState());
		dispatch(getUserStarted());

		fetch(`${URL_REQUEST}/users/`, {
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
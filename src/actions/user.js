import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const getUserSuccess = () => ({
	type: GET_USER_SUCCESS,
});

const getUserStarted = () => ({
	type: GET_USER_REQUEST,
});

const getUserFailure = (err) => ({
	type: GET_USER_FAILURE,
	payload: {
		error: err  // error: error
	}
});

export async function getUser(dispatch, getState) {
	dispatch(getUserStarted());
	let result = null;

	await fetch(`${URL_REQUEST}/users/`, {
		method: 'GET'
	})
		.then(res => res.json())
		.then(res => {
			const info = res.response;
			dispatch(getUserSuccess());
			result = info;
		})
		.catch(err => {
			dispatch(getUserFailure(err));
		});

	return result;
}
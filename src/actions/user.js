import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,
} from '../constants/ActionTypes';

import { URL_REQUEST } from '../constants/helperConstant';

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
		.then(res => {
			if (res.status !== 200) {
				return Error('non auth');
			}
			return res;
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
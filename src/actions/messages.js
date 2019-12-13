import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,
} from '../constants/ActionTypes';

import { URL_REQUEST } from '../constants/helperConstant';

const getMessagesSuccess = () => ({
	type: GET_MESSAGES_SUCCESS,
});

const getMessagesStarted = () => ({
	type: GET_MESSAGES_REQUEST,
});

const getMessagesFailure = (err) => ({
	type: GET_MESSAGES_FAILURE,
	payload: {
		error: err  // error: error
	},
});

export async function getMessages(dispatch, getState, chatsIDs) {
	dispatch(getMessagesStarted());

	const messages = {};
	let errFlag = false;

	for (const i in chatsIDs) {
		const chatID = chatsIDs[i];
		errFlag = await fetch(`${URL_REQUEST}/messages/?chat_id=${chatID}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				messages[chatID] = res.response;
			})
			.catch(err => {
				dispatch(getMessagesFailure(err));
				return true;
			});
	}

	if (errFlag) { return null; }

	dispatch(getMessagesSuccess());
	return messages;
}
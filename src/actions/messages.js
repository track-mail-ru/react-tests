import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

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
	let err_flag = false;

	chatsIDs.forEach(async function(chatID) {
		await fetch(`${URL_REQUEST}/messages/?chat_id=${chatID}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			messages[chatID] = res.response;
		})
		.catch(err => {
			dispatch(getMessagesFailure(err));
			err_flag = true;
		});
	});

	if (err_flag) { return null; }

	dispatch(getMessagesSuccess());
	return messages;
}
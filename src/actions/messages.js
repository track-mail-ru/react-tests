import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const getMessagesSuccess = (messages) => ({
	type: GET_MESSAGES_SUCCESS,
	payload: messages
});

const getMessagesStarted = () => ({
	type: GET_MESSAGES_REQUEST,
});

const getMessagesFailure = (error) => ({
	type: GET_MESSAGES_FAILURE,
	payload: {
		error  // error: error
	}
});

export function getMessages(chatID) {
	return (dispatch, getState) => {
		console.log('state: ', getState());
		dispatch(getMessagesStarted());

		fetch(`${URL_REQUEST}/messages/?chat_id=${chatID}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			dispatch(getMessagesSuccess(res.response))
		})
		.catch(err => {
			dispatch(getMessagesFailure(err))
		});
	}
}
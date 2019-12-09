import {
	CHAT_LOAD_START,
	CHAT_LOAD_SUCCESS,
	CHAT_LOAD_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

import { getUser } from './user';
import { getChats } from './chats';
import { getMessages } from './messages';

const loadChatSuccess = (info) => ({
	type: CHAT_LOAD_SUCCESS,
	payload: info,
});

const loadChatStarted = () => ({
	type: CHAT_LOAD_START,
});

export default function(callback = null) {
	return async function(dispatch, getState) {
		console.log('state: ', getState());
		dispatch(loadChatStarted());

		let userInfo = await getUser(dispatch, getState);
		if (!userInfo) {
			console.log('Error: getUser()');
			return false;
		}

		let chats = await getChats(dispatch, getState, userInfo);
		if (!chats) {
			console.log('Error: getChats()');
			return false;
		}

		let messages = await getMessages(dispatch, getState, Object.keys(chats));
		if (!messages) {
			console.log('Error: getMessages()');
			return false;
		}

		dispatch(loadChatSuccess({
			myInfo: userInfo,
			chatsList: chats,
			messagesList: messages,
		}));

		if (callback) {
			callback();
		}
	}
} 
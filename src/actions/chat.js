import {
	CHAT_LOAD_START,
	UPLOAD_CHAT_INFO,
} from '../constants/ActionTypes';

import {
	MESSAGE_STATUS,
	URL_REQUEST,
} from '../constants/helperConstant';

import { getUser } from './user';
import { getChats } from './chats';
import { getMessages } from './messages';

const uploadChatInfo = (info) => ({
	type: UPLOAD_CHAT_INFO,
	payload: info,
});

const loadChatStarted = () => ({
	type: CHAT_LOAD_START,
});

export function checkAuth(successCallback = null, errorCallback = null) {
	return async function(dispatch, getState) {
		const userInfo = await getUser(dispatch, getState);
		if (!userInfo) {
			console.log('Error: getUser()');
			if (errorCallback) { errorCallback(); }
			return false;
		}

		dispatch(uploadChatInfo({ myInfo: userInfo }));
		if (successCallback) { successCallback(); }
	};
}

export function chatLoader(callback = null) {
	return async function(dispatch, getState) {
		dispatch(loadChatStarted());

		const userInfo = getState().chat.myInfo;
    
		const chats = await getChats(dispatch, getState, userInfo);
		if (!chats) {
			console.log('Error: getChats()');
			return false;
		}

		const messages = await getMessages(dispatch, getState, Object.keys(chats));
		if (!messages) {
			console.log('Error: getMessages()');
			return false;
		}

		dispatch(uploadChatInfo({
			messagesList: messages,
			chatsList: chats,
		}));

		if (callback) {
			callback();
		}
	};
}

export function updateChat(info) {
	return (dispatch, getState) => {
		dispatch(uploadChatInfo(info));
	};
}

function genUpdateChatState(chatState, chatID, messageID, reference, info) {
	const {messagesList} = chatState;
	const {chatsList} = chatState;
	const messages = messagesList[chatID];

	if (messages[messageID]) {
		messages[messageID] = {
			...messages[messageID],
			...info,
		};
		chatsList[chatID].lastMessage = {...messages[messageID]};
	} else {
		messages[reference] = {
			...messages[reference],
			...info,
		};
		chatsList[chatID].lastMessage = {...messages[reference]};
	}

	messagesList[chatID] = messages;
	chatState.messagesList = messagesList;
	chatState.chatsList = chatsList;

	return chatState;
}

export function sendMessage(chatID, addition=null, additionType=null, message=null) {
	return (dispatch, getState) => {
		const currentTime = new Date().getTime();
		const random = parseInt(Math.random() * 1000);
		const tempID = `${currentTime}_${random}`;
		let chatState = getState().chat;

		const messageInfo = {
			time: currentTime,
			text: message,
			self: true,
			status: MESSAGE_STATUS.sending,
		};

		const data = new FormData();

		if (message) {
			data.append('text', message);
		}

		if (addition) {
			messageInfo.addition = {
				...addition,
				type: additionType,
			};
			data.append('attachment_type', additionType);
			data.append('attachment', addition.file);
		}

		chatState = genUpdateChatState(
			chatState,
			chatID,
			null,
			tempID,
			messageInfo,
		);

		updateChat(chatState)(dispatch, getState);

		data.append('reference', tempID);
		data.append('chat_id', chatID);

		fetch(`${URL_REQUEST}/messages/add/`, {
			method: 'POST',
			body: data,
		}).then((response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			} else {
				console.log('Сообщение отправлено');
			}
		}).catch(() => {
			chatState = genUpdateChatState(
				chatState,
				chatID,
				null,
				tempID,
				{
					...messageInfo,
					status: MESSAGE_STATUS.error,
				},
			);

			updateChat(chatState)(dispatch, getState);
		});
	};
}

export function sendForm(value = '', additions = null) {
	return (dispatch, getState) => {
		const {activeChat} = getState().globalState.state;

		if (!activeChat) { 
			console.log('No activeChat');
			return null;
		}

		if (additions) {
			const lastAddition = additions.list.shift();

			additions.list.forEach((addition) => {
				sendMessage(
					activeChat,
					addition,
					additions.type
				)(dispatch, getState);
			});

			let message;
			if (!value) { message = value; }

			sendMessage(
				activeChat,
				lastAddition,
				additions.type,
				message
			)(dispatch, getState);
		} else {
			sendMessage(
				activeChat,
				null,
				null,
				value
			)(dispatch, getState);
		}
	};
}
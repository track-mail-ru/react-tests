import {
	GET_CHATS_REQUEST,
	GET_CHATS_SUCCESS,
	GET_CHATS_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const getChatsSuccess = () => ({
	type: GET_CHATS_SUCCESS,
});

const getChatsStarted = () => ({
	type: GET_CHATS_REQUEST,
});

const getChatsFailure = (err) => ({
	type: GET_CHATS_FAILURE,
	payload: {
		error: err  // error: error
	}
});

export async function getChats(dispatch, getState, myInfo) {
	dispatch(getChatsStarted());

	const chatsList = {};
	let result = null;

	await fetch(`${URL_REQUEST}/chats/`, {
		method: 'GET'
	})
	.then(res => res.json())
	.then(res => {
		const { response } = res;
		Object.keys(response).forEach(index => {
			const chat = response[index];

			const chatInfo = {
				id: chat.id,
				chatName: chat.chatName,
				isGroupChat: chat.isGroupChat,
				avatar: chat.avatar,
				countUnredMessages: chat.countUnredMessages,
				lastMessage: chat.lastMessage,
				penPals: chat.penPals,
			};

			if (!chatInfo.isGroupChat) {
				const penPalsIDs = Object.keys(chatInfo.penPals);
				let penPalID = penPalsIDs.shift();
				if (parseInt(penPalID) === parseInt(myInfo.id)) {
					penPalID = penPalsIDs.shift();
				}
				chatInfo.penPal = chatInfo.penPals[penPalID];
				chatInfo.chatName = chatInfo.penPal.fullName;
				delete chatInfo.penPals;
			}

			chatsList[index] = chatInfo;
		});

		dispatch(getChatsSuccess());
		result = chatsList;
	})
	.catch(err => {
		dispatch(getChatsFailure(err));
		return null;
	});

	return result;
}
import {
	GET_CHATS_REQUEST,
	GET_CHATS_SUCCESS,
	GET_CHATS_FAILURE,

	URL_REQUEST,
} from '../constants/ActionTypes';

const getChatsSuccess = (chats) => ({
	type: GET_CHATS_SUCCESS,
	payload: chats
});

const getChatsStarted = () => ({
	type: GET_CHATS_REQUEST,
});

const getChatsFailure = (error) => ({
	type: GET_CHATS_FAILURE,
	payload: {
		error  // error: error
	}
});

export function getChats(myInfo) {
	return (dispatch, getState) => {
		console.log('state: ', getState());
		dispatch(getChatsStarted());

		const chatsList = {};

		fetch(`${URL_REQUEST}/chats/`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			const { response } = res;
			const messagesList = Object.keys(response).forEach(index => {
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
					if (parseInt(penPalID) === parseInt(info.myInfo.id)) {
						penPalID = penPalsIDs.shift();
					}
					chatInfo.penPal = chatInfo.penPals[penPalID];
					chatInfo.chatName = chatInfo.penPal.fullName;
					delete chatInfo.penPals;
				}

				chatsList[index] = chatInfo;
			});

			dispatch(getChatsSuccess(chatsList))
		})
		.catch(err => {
			dispatch(getChatsFailure(err))
		});
	}
}
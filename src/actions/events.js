import {
	GET_EVENTS_REQUEST,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,
	DELETE_EVENTS,

	URL_REQUEST,
} from '../constants/ActionTypes';

import { updateChat } from './chat';

const getEventsSuccess = (events) => ({
	type: GET_EVENTS_SUCCESS,
	payload: events
});

const getEventsStarted = () => ({
	type: GET_EVENTS_REQUEST,
});

const getEventsFailure = (error) => ({
	type: GET_EVENTS_FAILURE,
	payload: {
		error  // error: error
	}
});

const deleteEvents_ = () => ({
	type: DELETE_EVENTS,
});

export function getEvents() {
	return async (dispatch, getState) => {
		dispatch(getEventsStarted());

		fetch(`${URL_REQUEST}/events/`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				const events = res.response;
				dispatch(getEventsSuccess(events));

				const {
					messagesList,
					chatsList,
					myInfo,
				} = getState().chat;
			
				events.forEach((event) => {
					const currentEvent = event.event;

					const {
						reference,
						chatID,
						id,
					} = currentEvent;

					const currentMessageList = messagesList[chatID];

					const attachment = currentEvent.addition;
					const myID = parseInt(myInfo.id);
					const userID = parseInt(currentEvent.userID);

					switch (event.eventType) {
						case 'newMessage':
							const newMessage = {
								time: currentEvent.time,
								text: currentEvent.text,
								self: myID === userID,
								status: currentEvent.status,
							};

							if (attachment) {
								newMessage.addition = attachment;
							}
						
							chatsList[chatID].lastMessage = {
								...newMessage,
								reference,
								id,
							};

							if (newMessage.self) {
								chatsList[chatID].countUnredMessages = 0;
							} else if (!(reference in currentMessageList)) {
								chatsList[chatID].countUnredMessages ++;
							}

							currentMessageList[reference] = newMessage;
							messagesList[chatID] = currentMessageList;

							break;

						case 'redMessage':
							if (reference in currentMessageList){
								currentMessageList[reference].status = 2;
							} else {
								currentMessageList[id].status = 2;
							}

							messagesList[chatID] = currentMessageList;

							if (chatsList[chatID].lastMessage.id === id
						|| chatsList[chatID].lastMessage.reference === reference) {
								chatsList[chatID].lastMessage.status = 2;
							}

							break;
						default:
							break;
					}
				});

				updateChat({
					messagesList,
					chatsList,
					myInfo,
				})(dispatch, getState);
			})
			.catch(err => {
				console.log(err);
				dispatch(getEventsFailure(err));
			});
	};
}

export function deleteEvents() {
	return (dispatch, getState) => {
		dispatch(deleteEvents_());
	};
}
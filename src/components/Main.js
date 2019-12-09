import React from 'react';
import { InitializeRecordStream } from '../lib/InitializeRecordStrem';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import { Profile } from './Profile';
import Parent from './Parent.Context';
import styles from '../static/styles/Main.module.css';

import { connect } from 'react-redux';
import chatLoader from '../actions/chatLoader';
import getEvents from '../actions/events';
import store from '../store';

class Main extends React.Component {
	constructor(props) {
		super(props);

		const {
			chatLoader,
			getEvents,
		} = props;

		this.state = {
			chatLoader,
			getEvents,

			mediaRecorder: null,
			activeChat: null,
			frameStyles: {
				ChatForm: null,
				ChatList: null,
				Profile: null,
			},
		};
	}

	componentDidMount() {
		const {
			chatLoader,
			getEvents,
		} = this.state;

		chatLoader(() => {
			setInterval(() => {
				getEvents(this.checkEvents.bind(this));
			}, 6000);
		});

		/*this.getInfo(() => {
			const {
				myInfo,
			} = this.state;

			const url = 'http://192.168.1.76/back/events/';

			const myId = myInfo.id;

			setInterval(() => {
				fetch(url, {
					method: 'GET'
				})
					.then((res) => res.json())
					.then((res) => {
						const list = res.response;
						list.forEach((event) => {
							console.log(event);
							if ('newMessage' in event) {
								const message = event.newMessage;
								const attachment = message.addition;

								this.addMessageToList(
									message.chatID,
									message.reference,
									message.time,
									(message.userID === myId),
									message.status,
									message.text,
									attachment,
								);
							} else if ('redMessage' in event) {
								const {
									chatID,
									messageID,
									reference,
								} = event.redMessage;
								this.updateStatusMessageList(
									chatID,
									messageID,
									reference,
									2
								);
							}
						});
					}).catch(console.log);
			}, 500);
		});

		/* let source = new EventSource(url);

		source.onopen = (event) => {
			console.log('Stream was opened');
		}

		source.onmessage = (event) => {
			let data = JSON.parse(event.data);
			if (data && 'text' in data) {
				

				const currentMessage = {
					time: (new Date(data.timestamp)).getTime(),
					text: data.text,
					self: false,
					status: 2,
				};

				const messageList = this.state.messageList;
				messageList[2].push(currentMessage);

				this.setState({
					messageList,
				});
			}
		}

		source.onerror = (event) => {
			console.log(event);
			source = new EventSource(url);
		} */
	}

	/*async getInfo(callback=null) {
		const info = {
			chatsList: {},
			messageList: {},
			myInfo: null,
		};

		await fetch('http://192.168.1.76/back/users/', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((response) => {
				info.myInfo = response.response;
			});

		await fetch('http://192.168.1.76/back/chats/', {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((res) => {
				const { response } = res;
				let i = 0;
				const keys = Object.keys(response);
				keys.forEach((index) => {
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

					info.chatsList[index] = chatInfo;
				
					fetch(`http://192.168.1.76/back/messages/?chat_id=${index}`, {
						method: 'GET'
					})
					.then((res_) => res_.json())
					.then((res_) => {
						i++;
						info.messageList[index] = res_.response;
						if (keys.length === i) {
							this.setState(info);
							if (callback) { callback(); }
							console.log('Data was recieved');
						}
					})
					.catch(console.log);
				});
			})
			.catch(console.log);

		

		/* try {

			info = {
				chatsList: JSON.parse(localStorage.getItem('chatsList')),
				messageList: JSON.parse(localStorage.getItem('messageList')),
				myInfo: JSON.parse(localStorage.getItem('myInfo')),
			};
		} catch {
			info = {
				chatsList: null,
				messageList: null,
				myInfo: null,
			};
		}
		return info;
	}*/

	async requireRecorder() {
		if (this.state.mediaRecorder) {
			return this.state.mediaRecorder;
		}

		return InitializeRecordStream().then((value) => {
			this.setState({mediaRecorder: value});
			return value;
		}).catch((err) => {
			throw new Error(err);
		});
	}

	apearFrame(framename, newState = null) {
		let { state } = this;
		state.frameStyles[framename] = {
			animationName: styles.chatApear,
		};

		if (newState && newState instanceof Object) {
			state = Object.assign(state, newState);
		}

		if (state !== this.state) {
			this.setState(state);
		}
	}

	disapearFrame(framename = null) {
		const { state } = this;

		const style = {
			animationName: styles.chatDisapear,
		};

		if (!framename) {
			const { frameStyles } = state;
			for (const frame in frameStyles) {
				if (frameStyles[frame]) {
					frameStyles[frame] = style;
				}
			}
			state.frameStyles = frameStyles;
		} else if (state.frameStyles[framename]) {
			state.frameStyles[framename] = style;
		}

		if (state !== this.state) {
			this.setState(state);
		}
	}

	myRouter() {
		const { pathname } = this.props.location;
		switch (true) {
			case /chat\/\d+\/?$/.test(pathname):
				const chatId = parseInt(pathname.match(/\d+/));
				this.apearFrame('ChatForm', {
					activeChat: chatId,
				});
				break;
			case /profile\/?/.test(pathname):
				this.apearFrame('Profile');
				break;
			default:
				this.disapearFrame();
				break;
		}
	}

	checkEvents(state) {
		const {
			events,
			chatLoader
		} = state.events;

		const {
			messageList,
			chatsList,
			myInfo,
		} = chatLoader;

		console.log(events);

		events.forEach((event) => {
			if ('newMessage' in event) {
				const message = event.newMessage;
				const attachment = message.addition;
				const chatID = message.chatID;

				const currentMessageList = messageList[chatID];

				const myID = parseInt(myInfo.id);
				const userID = parseInt(message.userID);
				const ref = message.reference;

				const newMessage = {
					time: message.time,
					text: message.text,
					self: myID === userID,
					status: message.status,
				};

				if (ref in currentMessageList){
					currentMessageList[ref] = newMessage;
				} else {
					currentMessageList[message.id] = newMessage;
				}
				
				chatsList[chatID].lastMessage = newMessage;
				messageList[chatID] = currentMessageList;
			} else if ('redMessage' in event) {
				const {
					chatID,
					messageID,
					reference,
				} = event.redMessage;

				const currentMessageList = messageList[chatID];

				if (reference in currentMessageList){
					currentMessageList[reference].status = 2;
				} else {
					currentMessageList[messageID].status = 2;
				}

				messageList[chatID] = currentMessageList;
				chatsList[chatID].lastMessage.status = 2;
			}
		});
	}

	updateStatusMessageList(chatId, messageID, reference, status) {
		const {
			messageList,
			chatsList,
		} = this.state;

		const messages = messageList[chatId];

		if (messages[reference]) {
			messages[reference].status = status;
		} else if (messages[messageID]) {
			messages[messageID].status = status;
		}

		messageList[chatId] = messages;
		chatsList[chatId].lastMessage.status = status;

		this.setState({
			messageList,
			chatsList,
		});
	}

	addMessageToList(chatId, messageID, time, isSelf, status, text=null, attachment=null) {
		const {
			messageList,
			chatsList,
		} = this.state;

		const info = {
			time,
			text,
			self: isSelf,
			status,
		};

		if (attachment) {
			info.addition = attachment;
		}

		messageList[chatId][messageID] = info;

		chatsList[chatId].lastMessage.text = text;
		chatsList[chatId].lastMessage.time = time;
		chatsList[chatId].lastMessage.status = status;


		if (isSelf) {
			chatsList[chatId].countUnredMessages = 0;
		} else {
			chatsList[chatId].countUnredMessages ++;
		}
		
		this.setState({
			messageList,
			chatsList,
		});
	}

	async sendMessage(chatID, addition=null, additionType=null, message=null) {
		const currentTime = new Date().getTime();
		const random = parseInt(Math.random() * 1000);
		const tempID = `${currentTime}_${random}`;

		const addMessage = (status) => {
			this.addMessageToList(
				chatID,
				tempID,
				currentTime,
				true,
				status,
				message,
				{...addition, type: additionType}
			);
		};

		addMessage(0);

		const data = new FormData();

		if (message) {
			data.append('text', message);
		}

		if (addition) {
			data.append('attachment_type', additionType);
			data.append('attachment', addition.file);
		}

		data.append('reference', tempID);
		data.append('chat_id', chatID);

		fetch('http://192.168.1.76/back/messages/add/', {
			method: 'POST',
			body: data,
		}).then((response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			} else {
				console.log('Сообщение отправлено');
			}
		}).catch(() => {
			addMessage(4);
		});
	}

	formEntered(value, additions = null) {
		const {
			activeChat
		} = this.state;

		if (additions) {
			const lastAddition = additions.list.shift();

			additions.list.forEach((addition) => {
				this.sendMessage(
					activeChat,
					addition,
					additions.type
				);
			});

			let message = null;
			if (value !== '') { message = value; }

			this.sendMessage(
				activeChat,
				lastAddition,
				additions.type,
				message
			);
		} else {
			this.sendMessage(
				activeChat,
				null,
				null,
				value
			);
		}
		/*

		

		if (additions) {
			const countAdditions = additions.list.length;
			additions.list.forEach((addition, index) => {
				const currentMessage = {
					time: new Date().getTime(),
					text: '',
					self: true,
					status: 0,
				};

				if (countAdditions - 1 === index) {
					currentMessage.text = value;
				}

				currentMessage.addition = {
					type: additions.type,
					name: addition.name,
					path: addition.path
				};

				messageList[activeChat - 1].push(currentMessage);

				const data = new FormData();
				data.append(additions.type, addition.file);

				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: data,
				}).then(() => {
					alert('Вложение отправлено');
				}).catch(console.log);
			});
		} else {
			const currentMessage = {
				time: new Date().getTime(),
				text: value,
				self: true,
				status: 0,
			};

			messageList[activeChat - 1].push(currentMessage);

			const data = new FormData();
			data.append('text', value);
			data.append('author', "АЛёшка");

			fetch('http://192.168.1.11:9000/add-message', {
				method: 'POST',
				body: data,
			}).then(() => {
				alert('сообщение отправлено');
			}).catch(console.log);
		}

		this.setState({
			messageList,
		}); */
	}

	render() {
		this.myRouter();

		const {
			activeChat,
			frameStyles
		} = this.state;

		return (
			<Parent.Provider value={this}>
				<div className={styles.wrap}>
					<ChatList style={frameStyles.ChatList} />
					<ChatForm
						style={frameStyles.ChatForm}
						activeChat={activeChat}
					/>
					<Profile style={frameStyles.Profile} />
				</div>
			</Parent.Provider>
		);
	}
}

const mapDispatchToProps = {
	chatLoader,
	getEvents,
};

export default connect(
  	null,
  	mapDispatchToProps,
)(Main);


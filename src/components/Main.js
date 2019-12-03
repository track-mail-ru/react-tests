import React from 'react';
import { InitializeRecordStream } from '../lib/InitializeRecordStrem';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';
import { Profile } from './Profile';
import Parent from './Parent.Context';
import styles from '../static/styles/Main.module.css';

export class Main extends React.Component {
	constructor(props) {
		super(props);
		this.mediaRecorder = null;
		this.state = {
			chatsList: {},
			messageList: {},
			myInfo: null,
			mediaRecorder: null,
			activeChat: null,
			frameStyles: {
				ChatForm: null,
				ChatList: null,
				Profile: null,
			},
		};
	}

	async getInfo(callback=null) {
		const info = {
			chatsList: {},
			messageList: {},
			myInfo: null,
		};

		await fetch('http://192.168.1.6/back/users/', {
			method: 'GET'
		})
		.then((response) => response.json())
		.then((response) => {
			info.myInfo = response.response;
		});

		await fetch('http://192.168.1.6/back/chats/', {
			method: 'GET'
		})
		.then((response) => response.json())
		.then((response) => {
			response = response.response;
			let i = 0;
			const keys = Object.keys(response);
			keys.forEach((index) => {
				let chat = response[index];

				let chatInfo = {
					id: chat.id,
					chatName: chat.chatName,
					isGroupChat: chat.isGroupChat,
					avatar: chat.avatar,
					countUnredMessages: null,
					lastMessage: chat.lastMessage,
					penPals: chat.penPals,
				}

				if (!chatInfo.isGroupChat) {
					const penPalsIDs = Object.keys(chatInfo.penPals);
					let penPalID = penPalsIDs.shift();
					if (penPalID == info.myInfo.id) {
						penPalID = penPalsIDs.shift();
					}
					chatInfo['penPal'] = chatInfo.penPals[penPalID];
					chatInfo.chatName = chatInfo.penPal.fullName;
					delete chatInfo['penPals'];
				}

				info.chatsList[index] = chatInfo;
				
				fetch(`http://192.168.1.6/back/messages/?chat_id=${index}`, {
					method: 'GET'
				})
				.then((response) => response.json())
				.then((response) => {
					info.messageList[index] = response.response;
					if (keys.length === i) {
						this.setState({
							messageList: info.messageList,
						});
						console.log('Data was recieved');
					}
				})
				.catch(console.log);

				i++;
			});
		})
		.catch(console.log);

		this.setState(info);

		if (callback) { callback(); }

		/*try {

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
		return info;*/
	}

	componentDidMount() {
		this.getInfo(() => {
			const {
				myInfo,
			} = this.state;

			const url = 'http://192.168.1.6/back/events/';

			const myId = myInfo.id;

			setInterval(() => {
				fetch(url, {
					method: 'GET'
				})
				.then((response) => response.json())
				.then((response) => {
					let list = response.response;

					list.forEach((message) => {
						let attachment = message.addition;

						this.addMessageToList(
							message.chatID,
							message.reference,
							message.time,
							(message.userID === myId),
							message.status,
							message.text,
							attachment,
						);
					});
				}).catch(console.log);
			}, 200);
		});

		/*let source = new EventSource(url);

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
		}*/
	}

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

	addMessageToList(chatId, messageID, time, isSelf, status, text=null, attachment=null) {
		const {
			messageList,
			chatsList,
		} = this.state;

		const info = {
			time: time,
			text: text,
			self: isSelf,
			status: status,
		};

		if (attachment) {
			info['addition'] = attachment;
		}

		chatsList[chatId].lastMessage.text = text;
		chatsList[chatId].lastMessage.time = time;

		if (isSelf) {
			chatsList[chatId].lastMessage.status = 2;
			chatsList[chatId].countUnredMessages = 0;
		} else {
			chatsList[chatId].lastMessage.status = 3;
			chatsList[chatId].countUnredMessages ++;
		}
		
		messageList[chatId][messageID] = info;

		this.setState({
			messageList: messageList,
			chatsList: chatsList,
		});
	}

	async send_message(chatID, addition=null, additionType=null, message=null) {
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

		data.append('temp_id', tempID);
		data.append('chat_id', chatID);

		fetch('http://192.168.1.6/back/messages/add/', {
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
			let last_addition = additions.list.shift();

			additions.list.forEach((addition) => {
				this.send_message(
					activeChat,
					addition,
					additions.type
				);
			});

			let message = null;
			if (value !== '') { message = value; }

			this.send_message(
				activeChat,
				last_addition,
				additions.type,
				message
			);
		} else {
			this.send_message(
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
		});*/
	}

	render() {
		this.myRouter();

		const {
			activeChat,
			frameStyles,
			chatsList,
			messageList,
			myInfo,
		} = this.state;

		return (
			<Parent.Provider value={this}>
				<div className={styles.wrap}>
					<ChatList style={frameStyles.ChatList} chatsList={chatsList} />
					<ChatForm
						style={frameStyles.ChatForm}
						myInfo={myInfo}
						chatInfo={activeChat && activeChat in chatsList && chatsList[activeChat]}
						messageList={activeChat && activeChat in messageList && messageList[activeChat]}
					/>
					<Profile style={frameStyles.Profile} />
				</div>
			</Parent.Provider>
		);
	}
}
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
		const info = this.getInfo();
		this.mediaRecorder = null;
		this.state = {
			chatsList: info.chatsList,
			messageList: info.messageList,
			myInfo: info.messageList,
			mediaRecorder: null,
			activeChat: null,
			frameStyles: {
				ChatForm: null,
				ChatList: null,
				Profile: null,
			},
		};
	}

	getInfo() {
		let info = null;
		try {
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
	}

	componentDidMount() {
		const url = 'http://192.168.1.10:9000/events/';


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
			case /chat\/\d\/?$/.test(pathname):
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

	async send_message(chat_id, attachment=null, attachment_type=null, message=null){
		const data = new FormData();

		if (attachment) {
			data.append('attachment_type', attachment_type);
			data.append('attachment', attachment);
		}

		if (message) {
			data.append('text', message);
		}

		data.append('chat_id', chat_id);

		return fetch('http://192.168.1.10/messages/add/', {
			method: 'POST',
			body: data,
		});
	}

	formEntered(value, additions = null) {
		const {
			activeChat,
			messageList
		} = this.state;

		if (additions) {
			let last_addition = additions.list.shift();

			additions.list.forEach((addition) => {
				this.send_message(
					activeChat,
					addition.file,
					additions.type
				).then(() => {
					console.log('Сообщение отправлено');
				}).catch(console.log);
			});

			let message = null;
			if (value === '') { message = value; }

			this.send_message(
				activeChat,
				last_addition.file,
				additions.type,
				message
			).then(() => {
				console.log('Сообщение отправлено');
			}).catch(console.log);
		} else {
			this.send_message(activeChat, null, null, value);
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
						chatInfo={activeChat && chatsList[activeChat - 1]}
						messageList={activeChat && messageList[activeChat - 1]}
					/>
					<Profile style={frameStyles.Profile} />
				</div>
			</Parent.Provider>
		);
	}
}
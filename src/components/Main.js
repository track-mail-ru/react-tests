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

	formEntered(value, additions = null) {
		const { activeChat, messageList } = this.state;

		const currentMessage = {
			time: new Date().getTime(),
			text: value,
			self: true,
			status: 0,
		};

		if (additions) {
			currentMessage.additions = additions;

			/* console.log(additions);

			if (additions.type === 'images') {
				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: file,
				});
			} */
		}

		messageList[activeChat - 1].push(currentMessage);
		this.setState({
			messageList,
		});
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
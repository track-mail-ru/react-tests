import React from 'react';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';
import { Profile } from './Profile';
import Parent from './Parent.Context';
import styles from '../static/styles/Main.module.css';

export class Main extends React.Component {
	constructor(props) {
		super(props);
		const info = this.getInfo();
		this.state = {
			chatsList: info.chatsList,
			messageList: info.messageList,
			myInfo: info.messageList,
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
			const {frameStyles} = state;
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
		const { 
			pathname,
		} = this.props.location;
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
		const {
			activeChat,
			messageList
		} = this.state;

		let currentMessage = {
			time: new Date().getTime(),
			text: value,
			self: true,
			status: 0,
		};

		if (additions) {
			currentMessage['additions'] = additions;
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

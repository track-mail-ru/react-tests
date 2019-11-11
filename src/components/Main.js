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

	myRouter() {
		let path = this.props.location.pathname;
		switch (true) {
			case /chat\/\d\/?$/.test(path):
				let chat_id = parseInt(path.match(/\d+/));
				this.apearFrame('ChatForm', {
					activeChat: chat_id,
				});
				break;
			case /profile\/?/.test(path):
				this.apearFrame('Profile');
				break;
			default:
				this.disapearFrame();
				break;
		}
	}

	apearFrame(framename, new_state = null) {
		let { state } = this;
		state.frameStyles[framename] = {
			animationName: styles.chatApear,
		};

		if (new_state && new_state instanceof Object) {
			state = Object.assign(state, new_state)
		}

		if (state !== this.state) {
			this.setState(state);
		}
	}

	disapearFrame(framename = null) {
		let { state } = this;

		const style = {
			animationName: styles.chatDisapear,
		};

		if (!framename) {
			let frameStyles = state.frameStyles;
			for (const frame in frameStyles) {
				if (frameStyles[frame]) {
					frameStyles[frame] = style;
				}
			}
			state.frameStyles = frameStyles;
		} else {
			if (state.frameStyles[framename]) {
				state.frameStyles[framename] = style;
			}
		}

		if (state !== this.state) {
			this.setState(state);
		}
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

	formEntered(value) {
		const { activeChat, messageList } = this.state;
		messageList[activeChat - 1].push({
			time: new Date().getTime(),
			text: value,
			self: true,
			status: 0,
		});
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

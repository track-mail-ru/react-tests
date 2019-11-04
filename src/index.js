import React from 'react';
import { render } from 'react-dom';
import { ChatList } from './components/ChatList';
import { ChatForm } from './components/ChatForm';
import Parent from './components/Parent.Context';
import './static/styles/index.css';
import styles from './static/styles/Main.module.css';

import './components/test.js';

export class Main extends React.Component {
	constructor(props) {
		super(props);
		let info = this.getInfo();
		this.state = {
			chatsList: info.chatsList,
			messageList: info.messageList,
			myInfo: info.messageList,
			activeChat: null,
			frameStyles: {
				ChatForm: null,
				ChatList: null,
			},
		};
	}

	closeChat() {
		let state = this.state;
		state.frameStyles['ChatForm'] = {
			animationName: styles.chatDisapear,
		};
		this.setState(state);
	}

	openChat(chatId) {
		let state = this.state;
		state.frameStyles['ChatForm'] = {
			animationName: styles.chatApear,
		};
		state.activeChat = chatId;
		this.setState(state);
	}

	formEntered(value) {
		let chatId = this.state.activeChat;
		let messageList = this.state.messageList;
		messageList[chatId - 1].push({
			time: new Date().getTime(),
			text: value,
			self: true,
			status: 0,
		});
		this.setState({
			messageList: messageList,
		});
	}

	getInfo() {
		try {
			var info = {
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

	render() {
		let state = this.state;
		return (
			<Parent.Provider value={this}>
				<div className={styles.wrap}>
					<ChatList
						style={state.frameStyles.ChatList}
						chatsList={state.chatsList}
					/>
					<ChatForm
						style={state.frameStyles.ChatForm}
						myInfo={state.myInfo}
						chatInfo={state.activeChat && state.chatsList[state.activeChat - 1]}
						messageList={
							state.activeChat && state.messageList[state.activeChat - 1]
						}
					/>
				</div>
			</Parent.Provider>
		);
	}
}

render(<Main />, document.getElementById('root'));

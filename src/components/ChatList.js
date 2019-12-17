import React from 'react';
import { connect } from 'react-redux';
import { Chat } from './Chat.js';
import styles from '../static/styles/ChatList.module.css';
import BaseForm from '../static/styles/BaseForm.module.css';

function ChatList(props) {
	const {
		style,
		chatsList
	} = props;

	let list = [];
	if (!chatsList || !Object.keys(chatsList).length) {
		list = <div className={styles.noneMessages}>Сообщений пока нет (</div>;
	} else {
		let lastChatTime = null;
		let $i = 0;
		Object.keys(chatsList).forEach((index) => {
			const chat = chatsList[index];

			if (chat.lastMessage.addition) {
				chat.lastMessage.text = <span className={styles.addition}>Вложение</span>;
			}

			const block = <Chat key={$i++} chatInfo={chat} />;
			if (chat.lastMessage.time > lastChatTime) {
				list.unshift(block);
			} else {
				list.push(block);
			}
			lastChatTime = chat.lastMessage.time;
		});
	}

	return (
		<div style={style} className={BaseForm.conteiner}>
			<div className={BaseForm.header}>
				<div className={BaseForm.menu} />
				<span className={BaseForm.formName}>Сообщения</span>
			</div>
			<div className={BaseForm.content}>{list}</div>
			<div className={styles.buttonNew}>
				<div className={styles.pen} />
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	chatsList: state.chat.chatsList,
	style: state.globalState.state.frameStyles.ChatList,
	...props,
});

export default connect(
	mapStateToProps,
	null,
)(ChatList);

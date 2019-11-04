import React from 'react';
import { Chat } from './Chat.js';
import styles from './../static/styles/ChatList.module.css';

export function ChatList(props) {
	let chatsList = props.chatsList;
	let list = [];
	if (!chatsList) {
		list = <div className={styles.noneMessages}>{'Сообщений пока нет ('}</div>;
	} else {
		let lastChatTime = null;
		for (let id in chatsList) {
			let chat = chatsList[id];
			let block = <Chat key={id} chatInfo={chat} />;
			if (chat.lastMessageTime > lastChatTime) {
				list.unshift(block);
			} else {
				list.push(block);
			}
			lastChatTime = chat.lastMessageTime;
		}
	}

	return (
		<div className={styles.chatList}>
			<div className={styles.header}>
				<div className={styles.menu}></div>
				<span className={styles.formName}>Сообщения</span>
			</div>
			<div className={styles.content}>{list}</div>
			<div className={styles.buttonNew}>
				<div className={styles.pen}></div>
			</div>
		</div>
	);
}

import React from 'react';
import { TimeToDate } from '../lib/TimeToDate';
import styles from './../static/styles/Chat.module.css';

export function Chat(props) {
	const chatInfo = props.chatInfo;
	const time = TimeToDate(chatInfo.lastMessageTime);

	let status = null;
	switch (chatInfo.messageStatus) {
		case 0:
			status = styles.sending;
			break;
		case 1:
			status = styles.sent;
			break;
		case 2:
			status = styles.red;
			break;
		case 3:
			status = styles.newMessage;
			break;
		default:
			status = styles.error;
			break;
	}

	let statusContent = null;
	switch (chatInfo.messageStatus) {
		case 3:
			statusContent = chatInfo.countUnredMessages;
			break;
		case 4:
			statusContent = '!';
			break;
		default:
			statusContent = '';
			break;
	}

	let avatarStyle = {
		backgroundImage: null,
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};

	try {
		avatarStyle.backgroundImage = `url(${require(`../static/images/${chatInfo.avatar}`)})`;
	} catch {
		avatarStyle.backgroundImage = `url(${require('../static/images/default.png')})`;
	}

	console.log(status);

	return (
		<div className={styles.chat}>
			<div className={styles.chatAvatar} style={avatarStyle}></div>
			<div className={styles.chatInfo}>
				<div className={styles.chatName}>
					<span className={styles.name}>{chatInfo.chatName}</span>
					<span className={styles.messageTime}>{time}</span>
				</div>
				<div className={styles.lastMessage}>
					<p>{chatInfo.lastMessage}</p>
					<span className={styles.messageStatus + ' ' + status}>
						{statusContent}
					</span>
				</div>
			</div>
		</div>
	);
}

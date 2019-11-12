import React from 'react';
import { TimeToDate } from '../lib/TimeToDate';
import Parent from './Parent.Context';
import styles from '../static/styles/Chat.module.css';

import { giveMeImage } from '../lib/KOSTUL';

export function Chat(props) {
	const { chatInfo } = props;
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

	let img = giveMeImage(chatInfo.avatar);
	if (!img) { img = giveMeImage('default.png'); }

	const avatarStyle = {
		backgroundImage: `url(${img})`,
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};

	return (
		<Parent.Consumer>
			{(value) => (
				<div
					onClick={value.openChat.bind(value, chatInfo.id)}
					className={styles.chat}
				>
					<div className={styles.chatAvatar} style={avatarStyle} />
					<div className={styles.chatInfo}>
						<div className={styles.chatName}>
							<span className={styles.name}>{chatInfo.chatName}</span>
							<span className={styles.messageTime}>{time}</span>
						</div>
						<div className={styles.lastMessage}>
							<p>{chatInfo.lastMessage}</p>
							<span className={`${styles.messageStatus} ${status}`}>
								{statusContent}
							</span>
						</div>
					</div>
				</div>
			)}
		</Parent.Consumer>
	);
}

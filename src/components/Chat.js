import React from 'react';
import { Link } from 'react-router-dom';
import { TimeToDate } from '../lib/TimeToDate';
import styles from '../static/styles/Chat.module.css';

import { giveMeImage } from '../lib/KOSTUL';

export function Chat(props) {
	const { chatInfo } = props;
	const { lastMessage } = chatInfo;
	const time = TimeToDate(lastMessage.time);

	let statusContent = null;
	let status = null;
	switch (lastMessage.status) {
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
			statusContent = chatInfo.countUnredMessages;
			break;
		case 4:
			statusContent = '!';
			status = styles.error;
			break;
		default:
			statusContent = '';
			break;
	}

	const avatarStyle = {
		backgroundImage: `url(${giveMeImage(chatInfo.avatar)})`,
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};

	return (
		<Link to={`/chat/${chatInfo.id}`}>
			<div
				/* onClick={value.openChat.bind(value, chatInfo.id)} */
				className={styles.chat}
			>
				<div className={styles.chatAvatar} style={avatarStyle} />
				<div className={styles.chatInfo}>
					<div className={styles.chatName}>
						<span className={styles.name}>{chatInfo.chatName}</span>
						<span className={styles.messageTime}>{time}</span>
					</div>
					<div className={styles.lastMessage}>
						<p>{lastMessage.text}</p>
						<span className={`${styles.messageStatus} ${status}`}>
							{statusContent}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

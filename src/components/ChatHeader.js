import React from 'react';
import { Link } from 'react-router-dom';
import { TimeToDate } from '../lib/TimeToDate';
import styles from '../static/styles/ChatHeader.module.css';

import { giveMeImage } from '../lib/KOSTUL';

export function ChatHeader(props) {
	const { chatInfo } = props;

	let onlineStatus = 'групповой чат';
	if (!chatInfo.isGroupChat) {
		const online = chatInfo.penPal.status;
		if (!online) {
			onlineStatus = 'сейчас онлайн';
		} else {
			onlineStatus = `был в сети в ${TimeToDate(online)}`;
		}
	}

	const userImageStyles = {
		backgroundImage: `url(${giveMeImage(chatInfo.avatar)})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
	};

	return (
		<div className={styles.header}>
			<Link to="/">
				<div className={`${styles.headerButton} ${styles.backButton}`} />
			</Link>
			<div className={styles.nameConteiner}>
				<div className={styles.userImage} style={userImageStyles} />
				<div className={styles.userName}>
					<div className={styles.name}>{chatInfo.chatName}</div>
					<div className={styles.status}>{onlineStatus}</div>
				</div>
			</div>
			<div className={`${styles.headerButton} ${styles.searchButton}`} />
			<div className={`${styles.headerButton} ${styles.optionsButton}`} />
		</div>
	);
}

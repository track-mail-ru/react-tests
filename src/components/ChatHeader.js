import React from 'react';
import { TimeToDate } from '../lib/TimeToDate';
import styles from '../static/styles/ChatHeader.module.css';

export function ChatHeader(props) {
	const { backToList, chatInfo } = props;

	let onlineStatus = 'групповой чат';
	if (!chatInfo.isGroupChat) {
		const online = chatInfo.penPal.status;
		if (!online) {
			onlineStatus = 'сейчас онлайн';
		} else {
			onlineStatus = `был в сети в ${TimeToDate(online)}`;
		}
	}

	let avatar = null;
	try {
		avatar = require(`../static/images/${chatInfo.avatar}`);
	} catch {
		avatar = require('../static/images/default.png');
	}

	const userImageStyles = {
		backgroundImage: `url(${avatar})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
	};

	return (
		<div className={styles.header}>
			<div
				onClick={backToList}
				className={`${styles.headerButton} ${styles.backButton}`}
			/>
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

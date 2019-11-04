import React from 'react';
import { FormInput } from './FormInput';
import { DateMarker } from './DateMarker';
import { MessageBox } from './MessageBox';
import { TimeToDate } from './../lib/TimeToDate';
import { ItIsThatDay } from './../lib/ItIsThatDay';
import styles from './../static/styles/ChatForm.module.css';

export function ChatForm(props) {
	const messageList = props.messageList;
	const chatInfo = props.chatInfo;
	const myInfo = props.myInfo;

	let onlineStatus = 'групповой чат';
	if (!chatInfo.isGroupChat) {
		let online = chatInfo.penPal.status;
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
		avatar = require(`../static/images/default.png`);
	}

	let userImageStyles = {
		backgroundImage: `url(${avatar})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
	};

	let lastTime = null;
	let list = [];
	let $i = 0;
	for (let id in messageList) {
		let elem = messageList[id];
		let currentTime = elem.time;

		let Message = <MessageBox key={$i++} info={elem} />;
		let Marker = null;
		if (!ItIsThatDay(currentTime, lastTime)) {
			Marker = <DateMarker key={$i++} time={currentTime} />;
		}

		if (currentTime >= lastTime) {
			if (Marker) {
				list.push(Marker);
			}
			list.push(Message);
		} else {
			list.unshift(Message);
			if (Marker) {
				list.unshift(Marker);
			}
		}

		lastTime = currentTime;
	}

	return (
		<div className={styles.chatForm}>
			<div className={styles.header}>
				<div className={styles.headerButton + ' ' + styles.backButton}></div>
				<div className={styles.nameConteiner}>
					<div className={styles.userImage} style={userImageStyles}></div>
					<div className={styles.userName}>
						<div className={styles.name}>{chatInfo.chatName}</div>
						<div className={styles.status}>{onlineStatus}</div>
					</div>
				</div>
				<div className={styles.headerButton + ' ' + styles.searchButton}></div>
				<div className={styles.headerButton + ' ' + styles.optionsButton}></div>
			</div>
			<div className={styles.content}>
				<div className={styles.messageWrap}>
					<DateMarker />
					{list}
				</div>
			</div>
			<div className={styles.footer}>
				<FormInput placeholder="Ваше сообщение" />
			</div>
		</div>
	);
}

import React from 'react';
import { FormInput } from './FormInput';
import { DateMarker } from './DateMarker';
import { MessageBox } from './MessageBox';
import { ChatHeader } from './ChatHeader';
import { ItIsThatDay } from './../lib/ItIsThatDay';
import Parent from './Parent.Context';
import styles from './../static/styles/ChatForm.module.css';

export function ChatForm(props) {
	const style = props.style;
	const messageList = props.messageList;
	const chatInfo = props.chatInfo;
	/*const myInfo = props.myInfo;*/

	if (!chatInfo) {
		return '';
	}

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

		if (Marker) {
			list.push(Marker);
		}
		list.push(Message);

		lastTime = currentTime;
	}

	return (
		<div style={style} className={styles.chatForm}>
			<Parent.Consumer>
				{(value) => (
					<ChatHeader
						backToList={value.closeChat.bind(value)}
						chatInfo={chatInfo}
					/>
				)}
			</Parent.Consumer>
			<div className={styles.content}>
				<div className={styles.messageWrap}>
					<DateMarker />
					{list}
				</div>
			</div>
			<div className={styles.footer}>
				<Parent.Consumer>
					{(value) => (
						<FormInput
							formEntered={value.formEntered.bind(value)}
							placeholder="Ваше сообщение"
						/>
					)}
				</Parent.Consumer>
			</div>
		</div>
	);
}

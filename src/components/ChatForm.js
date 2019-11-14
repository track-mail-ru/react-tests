import React from 'react';
import { FormInput } from './FormInput';
import { DateMarker } from './DateMarker';
import { MessageBox } from './MessageBox';
import { ChatHeader } from './ChatHeader';
import { ItIsThatDay } from '../lib/ItIsThatDay';
import Parent from './Parent.Context';
import styles from '../static/styles/ChatForm.module.css';

export function ChatForm(props) {
	const {
		style,
		messageList,
		chatInfo,
		/* myInfo, */
	} = props;

	if (!chatInfo) {
		return '';
	}

	let lastTime = null;
	const list = [];
	let $i = 0;
	messageList.forEach((elem) => {
		const currentTime = elem.time;

		const Message = <MessageBox key={$i++} info={elem} />;
		let Marker = null;
		if (!ItIsThatDay(currentTime, lastTime)) {
			Marker = <DateMarker key={$i++} time={currentTime} />;
		}

		if (Marker) {
			list.push(Marker);
		}
		list.push(Message);

		lastTime = currentTime;
	});

	return (
		<div style={style} className={styles.chatForm}>
			<Parent.Consumer>
				{(value) => <ChatHeader chatInfo={chatInfo} />}
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

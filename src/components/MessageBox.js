import React from 'react';
import { TimeToTime } from './../lib/TimeToTime';
import styles from './../static/styles/MessageBox.module.css';

export function MessageBox(props) {
	const info = props.info;
	if (info.self) {
		var boxStyle = styles.self;
	}
	return (
		<div className={styles.messageConteiner}>
			<div className={styles.messageBox + ' ' + boxStyle}>
				<div className={styles.text}>{info.text}</div>
				<div className={styles.time}>{TimeToTime(info.time)}</div>
			</div>
		</div>
	);
}

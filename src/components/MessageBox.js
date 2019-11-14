import React from 'react';
import { TimeToTime } from '../lib/TimeToTime';
import styles from '../static/styles/MessageBox.module.css';

export function MessageBox(props) {
	const { info } = props;
	let boxStyle = null;
	if (info.self) {
		boxStyle = styles.self;
	}

	let conteinerClass = null;
	let color = null;
	switch (info.status) {
		case 0:
			conteinerClass = styles.newBox;
			color = '#9DD4F3';
			break;
		case 1:
			color = '#3958F3';
			break;
		case 3:
			color = '#3958F3';
			conteinerClass = styles.newBox;
			break;
		case 4:
			color = '#F32626';
			break;
		default:
			color = 'transparent';
			break;
	}

	return (
		<div className={`${styles.messageConteiner} ${conteinerClass}`}>
			<div className={`${styles.messageBox} ${boxStyle}`}>
				<div className={styles.text}>{info.text}</div>
				<div className={styles.time}>{TimeToTime(info.time)}</div>
				<div style={{ backgroundColor: color }} className={styles.status} />
			</div>
		</div>
	);
}

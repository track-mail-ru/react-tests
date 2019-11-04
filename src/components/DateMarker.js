import React from 'react';
import { TimeToStringDate } from '../lib/TimeToStringDate';
import styles from '../static/styles/DateMarker.module.css';

export function DateMarker(props) {
	const { time } = props;

	let timeStatus = 'Начало диалога';
	if (time) {
		timeStatus = TimeToStringDate(time);
	}

	return <div className={styles.messageDate}>{timeStatus}</div>;
}

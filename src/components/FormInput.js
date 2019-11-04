import React from 'react';
import styles from './../static/styles/FormInput.module.css';

export function FormInput(props) {
	return (
		<div className={styles.formInput}>
			<div className={styles.inputButton + ' ' + styles.additionalButton}></div>
			<input placeholder={props.placeholder} />
			<div className={styles.inputButton + ' ' + styles.sendButton}></div>
		</div>
	);
}

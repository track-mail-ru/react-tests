import React from 'react';
import styles from './../static/styles/FormInput.module.css';

export function FormInput(props) {
	const formEntered = props.formEntered;
	const input = React.useRef(null);

	const onSubmit = () => {
		let value = input.current.value.trim();
		if (value !== '') {
			input.current.value = '';
			formEntered(value);
		}
	};

	const onKeyPress = (event) => {
		if (event.charCode === 13) {
			onSubmit();
		}
	};

	return (
		<div className={styles.formInput}>
			<div className={styles.inputButton + ' ' + styles.additionalButton}></div>
			<input
				onKeyPress={onKeyPress}
				ref={input}
				placeholder={props.placeholder}
			/>
			<div
				onClick={onSubmit}
				className={styles.inputButton + ' ' + styles.sendButton}
			></div>
		</div>
	);
}

import React from 'react';
import styles from '../static/styles/FormInput.module.css';

export function FormInput(props) {
	const { placeholder, formEntered } = props;
	const input = React.useRef(null);

	const onSubmit = () => {
		const value = input.current.value.trim();
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

	console.log(formEntered);

	return (
		<div className={styles.formInput}>
			<div className={`${styles.inputButton} ${styles.additionalButton}`} />
			<input onKeyPress={onKeyPress} ref={input} placeholder={placeholder} />
			<div
				onClick={onSubmit}
				className={`${styles.inputButton} ${styles.sendButton}`}
			/>
		</div>
	);
}

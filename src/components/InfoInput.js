import React from 'react';
import styles from '../static/styles/InfoInput.module.css';

export function InfoInput(props) {
	const {
		placeholder,
		/* onChange, */
		value,
		className,
	} = props;

	let default_ = null;
	if (value.trim() !== '') {
		default_ = styles.active;
	}

	const [active, setActive] = React.useState(default_);
	const handler = (event) => {
		if (event.target.value.trim() !== '') {
			setActive(styles.active);
		} else {
			setActive(null);
		}
	};

	return (
		<div className={className}>
			<div className={`${styles.inputBlock} ${active}`}>
				<div className={styles.placeholder}>{placeholder}</div>
				<input
					onChange={handler}
					className={styles.input}
					defaultValue={value}
				/>
			</div>
		</div>
	);
}
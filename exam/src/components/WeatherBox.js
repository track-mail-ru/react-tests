import React from 'react';
import styles from '../static/styles/WheatherBox.module.css';

export function WheatherBox(props) {
	return (
		<div className={styles.block}>
			<div className={styles.top}>
				<div className={styles.city}>
					<span className={styles.name}>Moscow</span>
					<span className={styles.location}>Russia</span>
				</div>
				<div className={styles.temp}>17 C</div>
			</div>
			<div className={styles.bottom}>
				Humidity 77% | Southwest | 1.3 m/s
			</div>
		</div>
	);
}
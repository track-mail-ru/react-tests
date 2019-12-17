import React from 'react';
import styles from '../static/styles/WheatherBox.module.css';

export function WheatherBox(props) {
	const {
		info,
	} = props;

	console.log(info);

	const getDirection = (deg) => {
		if (deg >= 315 && deg <= 45) {
			return 'Северный';
		} else if (deg >= 45 && deg <= 135) {
			return 'Западный';
		} else if (deg >= 135 && deg <= 225) {
			return 'Южный';
		} else {
			return 'Восточный';
		}
	};

	return (
		<div className={styles.block}>
			<div className={styles.top}>
				<div className={styles.city}>
					<span className={styles.name}>{info.name}</span>
					<span className={styles.location}>{info.sys.country}</span>
				</div>
				<div className={styles.temp}>{`${parseInt(info.main.temp)} C`}</div>
			</div>
			<div className={styles.bottom}>
				{`${info.main.humidity}% | ${getDirection(info.wind.direct)} | ${info.wind.speed} m/s`}
			</div>
		</div>
	);
}
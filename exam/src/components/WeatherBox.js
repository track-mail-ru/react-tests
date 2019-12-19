import React from 'react';
import styles from '../static/styles/WheatherBox.module.css';
import { GET_IMAGE_URL } from '../constants/helperConstant';

export function WheatherBox(props) {
	const {
		info,
	} = props;

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

	const icon = info.weather[0].icon;

	return (
		<div className={styles.block}>
			<div className={styles.top}>
				<div className={styles.city}>
					<span className={styles.name}>{info.name}</span>
					<span className={styles.location}>{info.sys.country}</span>
				</div>
				<div className={styles.temp}>
					<img
						alt={`${icon}.png`}
						className={styles.img} 
						src={`${GET_IMAGE_URL}${icon}.png`}
					/>
					<span className={styles.text}>
						{`${parseInt(info.main.temp)} C`}
					</span>
				</div>
			</div>
			<div className={styles.bottom}>
				{`${info.main.humidity}% | ${getDirection(info.wind.direct)} | ${info.wind.speed} m/s`}
			</div>
		</div>
	);
}
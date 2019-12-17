import React from 'react';
import styles from '../static/styles/City.module.css';

export function City(props) {
	return (
		<div className={styles.block}>
			<span>{props.name}</span>
		</div>
	);
}
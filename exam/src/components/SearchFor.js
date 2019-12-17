import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import styles from '../static/styles/SearchFor.module.css';

import { City } from './City';

export function SearchFor(props) {
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<Link to='/'>
					<div className={styles.backButton}></div>
				</Link>
				<input className={styles.searchLine} placeholder="Type a city name..." />
			</div>
			<div className={styles.content}>
				<City name='Moscow' />
			</div>
		</div>
	);
}
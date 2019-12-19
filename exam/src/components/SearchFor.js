import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../static/styles/SearchFor.module.css';

import City from './City';

import { getWeatherByName } from '../actions/getWeather';

function SearchFor(props) {
	const {
		getWeatherByName,
		tempWeather,
	} = props;

	const [timeOut, setTimeOut] = React.useState(null);
	const input = React.useRef(null);

	const onChange = () => {
		if (timeOut) { clearInterval(timeOut); }
		const timer = setTimeout(() => {
			getWeatherByName(input.current.value);
		}, 500);
		setTimeOut(timer);
	}; 

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<Link to='/'>
					<div className={styles.backButton}></div>
				</Link>
				<input 
					className={styles.searchLine}
					placeholder="Type a city name..."
					onChange={onChange}
					ref={input}
				/>
			</div>
			<div className={styles.content}>
				{ tempWeather.id && <City ID={tempWeather.id} name={tempWeather.name} /> }
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	tempWeather: state.weather.tempWeather,
	...props,
}); 

const mapDispatchToProps = {
	getWeatherByName,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SearchFor);
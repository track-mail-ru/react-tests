import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from '../static/styles/Main.module.css';

import { WheatherBox } from './WeatherBox';
import SearchFor from './SearchFor';

import { getWeather, getWeatherByGPS } from '../actions/getWeather';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.getWeather_ = props.getWeather;
		this.getWeatherByGPS_ = props.getWeatherByGPS;
	}

	componentDidMount() {
		this.getWeather_();
		this.getWeatherByGPS_();
	}

	generateList(weatherList) {
		return weatherList.map((elem) => {
			return <WheatherBox key={elem.id} info={elem} />;
		});
	}

	render() {
		const {
			weather,
		} = this.props;

		let weatherList;
		if (weather) {
			weatherList = this.generateList(weather);
		}
		
		return (
			<Router>
				<div className={styles.globalWrap}>
					<Switch>
						<Route path='/search'>
							<SearchFor />
						</Route>
						<Route path='/'>
							<div className={styles.wrap}>
								<div className={styles.header}>
									<span className={styles.pageName}>
										Manage city
									</span>
								</div>
								<div className={styles.content}>
									{weatherList}
								</div>
							</div>
							<Link to='/search'>
								<div className={styles.hoverButton}>+</div>
							</Link>
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state, props) => ({
	weather: state.weather.list,
	IDs: state.state.IDs,
	...props,
}); 

const mapDispatchToProps = {
	getWeather,
	getWeatherByGPS,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main);


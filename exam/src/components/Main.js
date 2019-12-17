import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from '../static/styles/Main.module.css';

import { WheatherBox } from './WeatherBox';
import { SearchFor } from './SearchFor';

import { getWeather } from '../actions/getWeather';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			getWeather_: props.getWeather,
			citiesID: [
				524901,
				703448,
				2643743,
			]
		};
	}

	componentDidMount() {
		const { 
			getWeather_,
			citiesID,
		} = this.state;

		getWeather_(citiesID);
	}

	generateList(weatherList) {
		return weatherList.map((elem) => {
			return <WheatherBox info={elem} />;
		});
	}

	render() {
		const {
			weather,
		} = this.props;

		let weatherList;
		if (weather.list) {
			weatherList = this.generateList(weather.list);
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
	weather: state.weather.state,
	...props,
}); 

const mapDispatchToProps = {
	getWeather,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main);


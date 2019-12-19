import {
	GET_WEATHER_SUCCESS,
	ADD_WEATHER_SUCCESS,
	GET_WEATHER_FAILURE,
	GET_WEATHER_REQUEST,
} from '../constants/ActionTypes';

import {
	GET_WHEATHER_BY_NAME_URL,
	GET_WHEATHER_URL,
	APP_ID,
	UNITS,
} from '../constants/helperConstant';

import { addNewID } from './state';

const getWeatherSuccess = (data) => ({
	type: GET_WEATHER_SUCCESS,
	payload: data.list,
});

const addWeatherSuccess = (data) => ({
	type: ADD_WEATHER_SUCCESS,
	payload: data,
});

const getWeatherRequest = () => ({
	type: GET_WEATHER_REQUEST,
});

const getWeatherFailure = (error) => ({
	type: GET_WEATHER_FAILURE,
	payload: error,
});

export function getWeatherByGPS() {
	return (dispatch, getState) => {
		dispatch(getWeatherRequest());

		const geoOptions = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 27000,
		};

		navigator.geolocation.getCurrentPosition(
			(data) => {
				const lat = data.coords.latitude;
				const lon = data.coords.longitude;

				const String_ = `\
					${GET_WHEATHER_BY_NAME_URL}\
					?lat=${lat}\
					&lon=${lon}\
					&appid=${APP_ID}
				`;

				fetch(String_, {
					method: 'GET'
				})
					.then(res => res.json())
					.then(res => {
						addNewID(res.id)(dispatch, getState);
					})
					.catch(err => {
						dispatch(getWeatherFailure(err));
					})
			},
			console.error,
			geoOptions,
		);
	};
}

export function getWeather() {
	return (dispatch, getState) => {
		dispatch(getWeatherRequest());

		const IDs = getState().state.IDs;

		let String_ = `${GET_WHEATHER_URL}?id=`;

		IDs.forEach((id, index) =>	{
			if (index) { String_ += ','; }
			String_ += `${id}`
		});

		String_ = `${String_}&units=${UNITS}&appid=${APP_ID}`;

		fetch(String_, {
			method: 'GET',
		})
			.then(res => res.json())
			.then(res => {
				dispatch(getWeatherSuccess(res));
			})
			.catch(err => {
				console.error(err);
				dispatch(getWeatherFailure(err));
			});
	};
}

export function getWeatherByName(name) {
	return (dispatch, getState) => {
		dispatch(getWeatherRequest());

		const String_ = `${GET_WHEATHER_BY_NAME_URL}?q=${name}&appid=${APP_ID}`;

		fetch(String_, {
			method: 'GET',
		})
			.then(res => res.json())
			.then(res => {
				dispatch(addWeatherSuccess(res));
			})
			.catch(err => {
				console.error(err);
				dispatch(getWeatherFailure(err));
			})
	};
}
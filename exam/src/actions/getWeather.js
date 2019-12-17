import {
	GET_WEATHER_SUCCEESS,
	GET_WEATHER_FAILURE,
	GET_WEATHER_REQUEST,
} from '../constants/ActionTypes';

import {
	GET_WHEATHER_URL,
	APP_ID,
	UNITS,
} from '../constants/helperConstant';

const getWeatherSuccess = (data) => ({
	type: GET_WEATHER_SUCCEESS,
	payload: data,
});

const getWeatherRequest = () => ({
	type: GET_WEATHER_REQUEST,
});

const getWeatherFailure = (error) => ({
	type: GET_WEATHER_FAILURE,
	payload: error,
});

export function getWeather(IDs) {
	return (dispatch, getState) => {
		dispatch(getWeatherRequest());

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
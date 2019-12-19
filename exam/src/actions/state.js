import {
	SET_IDS,
} from '../constants/ActionTypes';

import { getWeather } from './getWeather';

const setIDs = (IDs) => ({
	type: SET_IDS,
	payload: IDs,
});

export function addNewID(ID) {
	return (dispatch, getState) => {
		const IDs = getState().state.IDs;
		if (IDs.indexOf(ID) === -1) {
			IDs.push(ID);
			dispatch(setIDs(IDs));
			getWeather()(dispatch, getState);
		}
	};
}

export function removeID(ID) {
	return (dispatch, getState) => {
		let IDs = getState().state.IDs;
		IDs = IDs.filter((elem) => elem !== ID);
		dispatch(setIDs(IDs));
		getWeather()(dispatch, getState);
	};
}
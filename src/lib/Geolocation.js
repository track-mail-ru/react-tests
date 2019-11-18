export function geoLocation(callbackSuccess, callbackError = null) {
	if ('geolocation' in navigator) {
		const geoOptions = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 27000,
		};

		navigator.geolocation.getCurrentPosition(
			callbackSuccess,
			console.log,
			geoOptions,
		);
	} else if (callbackError) { callbackError('Permisition denied'); }
}
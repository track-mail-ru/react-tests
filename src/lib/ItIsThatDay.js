export function ItIsThatDay(time, lastTime = false) {
	const date = new Date(time);

	if (!lastTime) {
		lastTime = {
			year: null,
			month: null,
			date: null,
		};
	} else {
		let lastDate = new Date(lastTime);
		lastTime = {
			year: lastDate.getFullYear(),
			month: lastDate.getMonth(),
			date: lastDate.getDate(),
		};
	}

	const currentDate = {
		year: date.getFullYear(),
		month: date.getMonth(),
		date: date.getDate(),
	};

	if (
		currentDate.year !== lastTime.year ||
		currentDate.month !== lastTime.month ||
		currentDate.date !== lastTime.date
	) {
		return false;
	}
	return true;
}

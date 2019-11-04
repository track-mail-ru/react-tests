export function ItIsThatDay(time, lastTime = false) {
	const date = new Date(time);
	let lastTime_ = lastTime;

	if (!lastTime_) {
		lastTime_ = {
			year: null,
			month: null,
			date: null,
		};
	} else {
		const lastDate = new Date(lastTime_);
		lastTime_ = {
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
		currentDate.year !== lastTime_.year ||
		currentDate.month !== lastTime_.month ||
		currentDate.date !== lastTime_.date
	) {
		return false;
	}
	return true;
}

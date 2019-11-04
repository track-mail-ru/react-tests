export function TimeToStringDate(time) {
	let currentDate = new Date();
	currentDate = {
		year: currentDate.getFullYear(),
		month: currentDate.getMonth(),
		date: currentDate.getDate(),
	};

	let date = new Date(time);
	date = {
		year: date.getFullYear(),
		month: date.getMonth(),
		date: date.getDate(),
	};

	const ruMonth = {
		0: 'января',
		1: 'февраля',
		2: 'марта',
		3: 'апреля',
		4: 'мая',
		5: 'июня',
		6: 'июля',
		7: 'августа',
		8: 'сентября',
		9: 'октября',
		10: 'ноября',
		11: 'декабря',
	};

	let text = '';
	if (
		currentDate.year === date.year &&
		currentDate.month === date.month &&
		currentDate.date === date.date
	) {
		text = 'Сегодня,';
	}
	text += ` ${date.date} ${ruMonth[date.month]}`;
	if (currentDate.year !== date.year) {
		text += ` ${date.year}`;
	}

	return text;
}

export function TimeToDate(dialogTime) {
	const messageTime = new Date(dialogTime);
	const messageDate = {
		year: messageTime.getFullYear(),
		month: messageTime.getMonth(),
		date: messageTime.getDate(),
		time: messageTime
			.toString()
			.split(' ')[4]
			.split(':'),
	};

	let currentDate = new Date();
	currentDate = {
		year: currentDate.getFullYear(),
		month: currentDate.getMonth(),
		date: currentDate.getDate(),
	};

	const ruMonth = {
		1: 'Янв.',
		2: 'Фев.',
		3: 'Мар.',
		4: 'Апр.',
		5: 'Май',
		6: 'Июн.',
		7: 'Июл.',
		8: 'Авг.',
		9: 'Сен.',
		10: 'Окт.',
		11: 'Ноя.',
		12: 'Дек.',
	};

	if (
		currentDate.year === messageDate.year &&
		currentDate.month === messageDate.month &&
		currentDate.date === messageDate.date
	) {
		return `${messageDate.time[0]}:${messageDate.time[1]}`;
	}
	const time = messageTime.toString().split(' ');
	return `${time[2]} ${ruMonth[messageDate.month + 1]} ${time[3]}`;
}

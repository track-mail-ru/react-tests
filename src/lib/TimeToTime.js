export function TimeToTime(time) {
	let date = new Date(time);
	date = date
		.toString()
		.split(' ')[4]
		.split(':');
	return `${date[0]}:${date[1]}`;
}

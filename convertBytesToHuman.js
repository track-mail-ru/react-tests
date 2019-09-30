/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
	if(typeof bytes != 'number') return false;
	if(parseInt(bytes) != bytes) return false;
	if(bytes < 0) return false;

	const types = [
		'B',
		'KB',
		'MB',
		'GB',
		'TB',
		'PB',
 	];

	var type = 0;

	while(bytes >= 1024 && type < types.length - 1){
		bytes = bytes / 1024;
		type++;
	}

	return bytes.toFixed(2) + ' ' + types[type];
}

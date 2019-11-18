export function onFillImages(event, additions, callbackSuccess, callbackError = null) {
	let additionsList = event.target.files;
	if (!additionsList.length) {
		return false;
	}

	let flag = false;
	additionsList = [...additionsList].map((file) => {
		if (file.size > 5 * 1024 * 1024) { flag = true; }

		return {
			name: file.name,
			path: window.URL.createObjectURL(file),
		};
	});

	if (flag) {
		if (callbackError) { callbackError('Слишком большой файл'); }
		return false;
	}

	if (additions) {
		additionsList = [...additions.list, ...additionsList];
	}

	if (additions && additions.type !== 'images') {
		if (callbackError) { callbackError('Вы уже добавили другой тип файлов'); }
		return false;
	}

	if (additionsList.length > 10) {
		additionsList = additionsList.slice(0, 10);
	}

	callbackSuccess(additionsList);

	return false;
}

export function onFillDocuments(event, additions, callbackSuccess, callbackError = null) {
	let additionsList = event.target.files;
	if (!additionsList.length) {
		return false;
	}

	let flag = false;
	additionsList = [...additionsList].map((file) => {
		if (file.size > 5 * 1024 * 1024) { flag = true; }

		return {
			name: file.name,
			path: window.URL.createObjectURL(file),
		};
	});

	if (flag) {
		if (callbackError) { callbackError('Слишком большой файл'); }
		return false;
	}

	if (additions) {
		additionsList = [...additions.list, ...additionsList];
	}

	if (additions && additions.type !== 'documents') {
		if (callbackError) { callbackError('Вы уже добавили другой тип файлов'); }
		return false;
	}

	if (additionsList.length > 10) {
		additionsList = additionsList.slice(0, 10); // Ещё добавить вывод ошибки
	}

	callbackSuccess(additionsList);

	return false;
}
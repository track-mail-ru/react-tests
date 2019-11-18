export async function startRecord(mediaRecorder, callbackStart = null, callbackEnd = null, callbackSuccess = null) {
	if (mediaRecorder) {
		mediaRecorder.start();

		if (callbackStart) { callbackStart(); }

		let chunks = [];
		mediaRecorder.addEventListener('stop', (event) => {
			const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
			const audioURL = URL.createObjectURL(blob);
			chunks = [];

			if (callbackSuccess) { callbackSuccess(audioURL); }
		});

		mediaRecorder.addEventListener('dataavailable', (event) => {
			chunks.push(event.data);
		});
	} else if (callbackEnd) { callbackEnd(); }
}

export function stopRecord(mediaRecorder, callback = null) {
	if (mediaRecorder) {
		mediaRecorder.stop();
	}

	if (callback) { callback(); }
}
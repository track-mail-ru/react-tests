export async function InitializeRecordStream() {
	let mediaRecorder = null;

	try {
		const constrains = { audio: true };
		const stream = await navigator.mediaDevices.getUserMedia(constrains);
		mediaRecorder = new MediaRecorder(stream);
	} catch(err) {
		throw new Error(err);
	}

	return mediaRecorder;
}
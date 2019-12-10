import React from 'react';
import { geoLocation } from '../lib/Geolocation';
import { startRecord, stopRecord } from '../lib/Recording';
import { onFillImages, onFillDocuments } from '../lib/onFillInput';
import styles from '../static/styles/FormInput.module.css';
import docImg from '../static/images/docImg.png';
import geoImg from '../static/images/geoImg.png';
import audioImg from '../static/images/audioImg.png';
import { connect } from 'react-redux';
import { sendForm } from '../actions/chat';

function FormInput(props) {
	const {
		requireRecorder,
		placeholder,
		mediaRecorder,
		sendForm,
	} = props;

	const [dragFiles, setDragFiles] = props.dragFiles;

	const input = React.useRef(null);
	const doc = React.useRef(null);
	const img = React.useRef(null);
	const [menuStyle, setMenuStyle] = React.useState(null);
	const [additions, setAdditions] = React.useState(null);
	const [sendButtonType, setSendButtonType] = React.useState('mic');
	const [recording, setRecording] = React.useState(false);
	let additionsBoxStyles = null;
	let list = null;

	const onSubmit = () => {
		const value = input.current.value.trim();
		if (value !== '' || additions) {
			if (!additions || additions.type !== 'audio') {
				input.current.value = '';
				sendForm(value, additions);
			} else {
				sendForm('', additions);
			}
			setAdditions(null);
		}
	};

	const onKeyPress = (event) => {
		if (event.charCode === 13) {
			onSubmit();
		}
	};

	const removeFile = (i) => {
		const additionsList = additions.list;
		additionsList.splice(i, 1);
		if (additionsList.length) {
			setAdditions({
				type: additions.type,
				list: additionsList,
			});
		} else {
			setAdditions(null);
		}
	};

	const recordStatus = (status) => {
		if (recording !== status) {
			setRecording(status);
		}
	};

	if (dragFiles) {
		const additions_ = additions || {};
		additions_.type = 'document';
		additions_.list = [
			{
				name: dragFiles.name,
				path: window.URL.createObjectURL(dragFiles),
				file: dragFiles,
			},
		];
		
		if (additions_ !== additions) {
			setAdditions(additions_);
		}

		setDragFiles(null);
	}

	if (additions) {
		additionsBoxStyles = {
			height: '100px',
		};

		list = additions.list.map((addition, i) => {
			return (
				<Addition
					key={i}
					remove={removeFile.bind(null, i)}
					type={additions.type}
					addition={addition}
				/>
			);
		});
	}

	if (recording) {
		if (sendButtonType !== 'cancel') { setSendButtonType('cancel'); }
	} else if ((input.current && input.current.value !== '') || additions){
		if (sendButtonType !== 'send') { setSendButtonType('send'); }
	} else if (sendButtonType !== 'mic') { setSendButtonType('mic'); }

	return (
		<div className={styles.wrap}>
			<div style={additionsBoxStyles} className={styles.additionsBox}>
				<ul className={styles.additionsBoxUl}>{list}</ul>
			</div>
			<div className={styles.formInput}>
				<div
					onClick={() => {
						!menuStyle && setMenuStyle({
							height: '120px',
							boxShadow: '0 0 60px 10px #151716',
						});
						menuStyle && setMenuStyle(null);
					}}
					className={`${styles.inputButton} ${styles.additionalButton}`}
				/>
				<input
					type="text"
					onKeyPress={onKeyPress}
					ref={input}
					placeholder={placeholder}
					onChange={(event) => {
						if (sendButtonType !== 'cancel') {
							if (event.target.value !== '') {
								if (sendButtonType !== 'send') {
									setSendButtonType('send');
								}
							} else if (sendButtonType !== 'mic') {
								setSendButtonType('mic');
							}
						}
					}}
				/>
				<SendButton
					cancel={() => {
						stopRecord(mediaRecorder, () => {
							recordStatus(false);
						});
					}}
					record={() => {
						requireRecorder().then((media) => {
							startRecord(media, () => {
								recordStatus(true);
							}, () => {
								recordStatus(false);
							}, (audioURL, blob) => {
								setAdditions({
									type: 'audio',
									list: [
										{
											name: 'Аудиозапись',
											path: audioURL,
											file: blob,
										},
									],
								});
							});
						}).catch(console.log);
					}}
					submit={onSubmit}
					type={sendButtonType}/>
			</div>
			<div style={menuStyle} className={styles.menu}>
				<ul>
					<li
						onClick={() => {
							setMenuStyle(null);
							img.current.click();
						}}
					>
						<div className={`${styles.menuButton} ${styles.menuImage}`} />
						<span className={styles.span}>изображение</span>
						<input
							onChange={(event) => {
								onFillImages(event, additions, (additionsList) => {
									setAdditions({
										type: 'image',
										list: additionsList,
									});
								});
							}}
							ref={img}
							type="file"
							multiple
							style={{ display: 'none' }}
							accept="image/*"
						/>
					</li>
					<li
						onClick={() => {
							setMenuStyle(null);
							doc.current.click();
						}}
					>
						<div className={`${styles.menuButton} ${styles.menuDocument}`} />
						<span className={styles.span}>документ</span>
						<input
							onChange={(event) => {
								onFillDocuments(event, additions, (additionsList) => {
									setAdditions({
										type: 'document',
										list: additionsList,
									});
								});
							}}
							ref={doc}
							type="file"
							multiple
							style={{ display: 'none' }}
						/>
					</li>
					<li
						onClick={() => {
							setMenuStyle(null);
							geoLocation((pos) => {
								const { latitude } = pos.coords;
								const { longitude } = pos.coords;

								setAdditions({
									type: 'geolocation',
									list: [
										{
											name: 'Геопозиция',
											path: `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=15`,
										},
									],
								});
							});
						}}
					>
						<div className={`${styles.menuButton} ${styles.menuGeo}`} />
						<span className={styles.span}>геолокация</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

function Addition(props) {
	const {
		remove,
		type,
		addition,
	} = props;

	const addStyle = {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		height: '65px',
	};

	switch (type) {
		case 'image':
			addStyle.backgroundImage = `url(${addition.path})`;
			break;
		case 'document':
			addStyle.backgroundImage = `url(${docImg})`;
			break;
		case 'geolocation':
			addStyle.backgroundImage = `url(${geoImg})`;
			break;
		case 'audio':
			addStyle.backgroundImage = `url(${audioImg})`;
			break;
		default:
			break;
	}

	return (
		<li>
			<div onClick={remove} className={styles.remove}>
				-
			</div>
			<div style={addStyle} className={styles.image} />
			<span className={styles.imageName}>{addition.name}</span>
		</li>
	);
}

function SendButton(props) {
	const {
		submit,
		record,
		cancel,
		type,
	} = props;

	let content = null;

	switch (type) {
		case 'mic':
			content = <div
				onClick={record}
				className={`${styles.inputButton} ${styles.micButton}`}
			/>;
			break;
		case 'send':
			content = <div
				onClick={submit}
				className={`${styles.inputButton} ${styles.sendButton}`}
			/>;
			break;
		case 'cancel':
			content = <div
				onClick={cancel}
				className={`${styles.inputButton} ${styles.cancelButton}`}
			/>;
			break;
		default:
			break;
	}

	return content;
}

/*const mapStateToProps = (state, props) => ({
  	chatInfo: state.chat.chatsList[props.activeChat],
  	messageList: state.chat.messagesList[props.activeChat],
  	myInfo: state.chat.myInfo,
  	...props,
});*/

const mapDispatchToProps = {
	sendForm,
};

export default connect(
  	null,
  	mapDispatchToProps,
)(FormInput);
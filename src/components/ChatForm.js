import React from 'react';
import { FormInput } from './FormInput';
import { DateMarker } from './DateMarker';
import { MessageBox } from './MessageBox';
import { ChatHeader } from './ChatHeader';
import { ItIsThatDay } from '../lib/ItIsThatDay';
import Parent from './Parent.Context';
import styles from '../static/styles/ChatForm.module.css';
import docImg from '../static/images/document.png';
import imgImg from '../static/images/image.png';

export function ChatForm(props) {
	const {
		style,
		messageList,
		chatInfo,
		/* myInfo, */
	} = props;

	let isImage = false;
	const [dragActive, setDragActive] = React.useState(false);
	const [dragFiles, setDragFiles] = React.useState(null);

	if (!chatInfo) {
		return '';
	}

	let lastTime = null;
	const list = [];
	let $i = 0;
	messageList.forEach((elem) => {
		const currentTime = elem.time;

		const Message = <MessageBox key={$i++} info={elem} />;
		let Marker = null;
		if (!ItIsThatDay(currentTime, lastTime)) {
			Marker = <DateMarker key={$i++} time={currentTime} />;
		}

		if (Marker) {
			list.push(Marker);
		}
		list.push(Message);

		lastTime = currentTime;
	});

	const dragOver = (event) => {
		/*console.log(event.dataTransfer.files);
		if (event.dataTransfer.files[0].type.split('\\')[0] == 'image') {
			isImage = true;
		} else {
			isImage = false;
		}*/
		event.preventDefault();
		event.stopPropagation();
		setDragActive(true);
	};

	const dragLeave = () => {
		setDragActive(false);
	};

	const drop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragActive(false);
		setDragFiles(event.dataTransfer.files[0]);
	}

	return (
		<div
			onDrop={drop}
			onDragOver={dragOver}
			onDragLeave={dragLeave}
			style={style}
			className={styles.chatForm}
		>
			<div className={`${styles.DNDWrap} ${dragActive && styles.activeZone}`}>
				<div className={styles.DNDChild}>
					<img alt='' className={styles.DNDImage} src={docImg}/>
					<span className={styles.DNDSpan}>Перетащите сюда как документы</span>
				</div>
				{isImage && 
					(
						<div className={styles.DNDChild}>
							<img alt='' className={styles.DNDImage} src={imgImg}/>
							<span className={styles.DNDSpan}>Перетащите сюда как изображение</span>
						</div>
					)
				}
			</div>
			<Parent.Consumer>
				{(value) => <ChatHeader chatInfo={chatInfo} />}
			</Parent.Consumer>
			<div className={styles.content}>
				<div className={styles.messageWrap}>
					<DateMarker />
					{list}
				</div>
			</div>
			<div className={styles.footer}>
				<Parent.Consumer>
					{(value) => (
						<FormInput
							requireRecorder={value.requireRecorder.bind(value)}
							mediaRecorder={value.state.mediaRecorder}
							formEntered={value.formEntered.bind(value)}
							dragFiles={[dragFiles, setDragFiles]}
							placeholder="Ваше сообщение"
						/>
					)}
				</Parent.Consumer>
			</div>
		</div>
	);
}

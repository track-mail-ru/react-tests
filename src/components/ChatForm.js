import React from 'react';
import { connect } from 'react-redux';
import FormInput from './FormInput';
import { DateMarker } from './DateMarker';
import { MessageBox } from './MessageBox';
import { ChatHeader } from './ChatHeader';
import { ItIsThatDay } from '../lib/ItIsThatDay';
import styles from '../static/styles/ChatForm.module.css';
import docImg from '../static/images/document.png';
import imgImg from '../static/images/image.png';


function ChatForm(props) {
	const {
		style,
		messageList,
		chatInfo,
		myInfo,
	} = props;

	const isImage = false;
	const [dragActive, setDragActive] = React.useState(false);
	const [dragFiles, setDragFiles] = React.useState(null);

	if (!chatInfo || !messageList) {
		return '';
	}

	let lastTime = null;
	let list = [];
	let $i = 0;

	if (!messageList) {
		list = <DateMarker/>;
	}

	Object.keys(messageList).forEach((index) => {
		const elem = messageList[index];
		const currentTime = elem.time;

		elem.self = elem.self || elem.userID === myInfo.id;

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
		/* console.log(event.dataTransfer.files);
		if (event.dataTransfer.files[0].type.split('\\')[0] == 'image') {
			isImage = true;
		} else {
			isImage = false;
		} */
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
	};

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
					<span className={styles.DNDSpan}>Перетащите сюда файл<br/>для загрузки как документ</span>
				</div>
				{isImage && 
					(
						<div className={styles.DNDChild}>
							<img alt='' className={styles.DNDImage} src={imgImg}/>
							<span className={styles.DNDSpan}>Перетащите сюда файл<br/>для загрузки как изображение</span>
						</div>
					)
				}
			</div>
			<ChatHeader chatInfo={chatInfo} />
			<div className={styles.content}>
				<div className={styles.messageWrap}>
					{[
						() => !list.lenght && <DateMarker />,
						list,
					]}
				</div>
			</div>
			<div className={styles.footer}>
				<FormInput
					dragFiles={[dragFiles, setDragFiles]}
					placeholder="Ваше сообщение"
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	chatInfo: state.chat.chatsList[
		state.globalState.state.activeChat
	],
	messageList: state.chat.messagesList[
		state.globalState.state.activeChat
	],
	myInfo: state.chat.myInfo,
	style: state.globalState.state.frameStyles.ChatForm,
	...props,
});

export default connect(
	mapStateToProps,
	null,
)(ChatForm);

import React from 'react';
import { TimeToTime } from '../lib/TimeToTime';
import styles from '../static/styles/MessageBox.module.css';
import { MESSAGE_STATUS } from '../constants/helperConstant';

export function MessageBox(props) {
	const { info } = props;

	let boxStyle = null;
	if (info.self) {
		boxStyle = styles.self;
	}

	let conteinerClass = null;
	let color = null;

	switch (info.status) {
		case MESSAGE_STATUS.sending:
			conteinerClass = styles.newBox;
			color = '#9DD4F3';
			break;
		case MESSAGE_STATUS.sent:
			color = '#3958F3';
			break;
		case MESSAGE_STATUS.read:
			color = 'transparent';
			break;
		case MESSAGE_STATUS.new:
			color = '#3958F3';
			conteinerClass = styles.newBox;
			break;
		case MESSAGE_STATUS.error:
			color = '#F32626';
			break;
		default:
			color = 'transparent';
			break;
	}
	return (
		<div className={`${styles.messageConteiner} ${conteinerClass}`}>
			<div className={`${styles.messageBox} ${boxStyle}`}>
				{ ('addition' in info) && <Addition addition={info.addition} />}
				<div className={styles.text}>{info.text}</div>
				<div className={styles.time}>{TimeToTime(info.time)}</div>
				<div style={{ backgroundColor: color }} className={styles.status} />
			</div>
		</div>
	);
}

function Addition(props) {
	const {
		type,
		name,
		path,
	} = props.addition;

	const [isPlaying, setPlayStatus] = React.useState(false);
	const audio = React.useRef(null);
	let content = null;

	switch (type) {
		case 'geolocation':
			content = (
				<div>
					<a href={path}>
						<span className={styles.additionText}>Геолокация</span>
						<div className={`${styles.defaultAddition} ${styles.geolocation}`} />
					</a>
				</div>
			);
			break;
		case 'image':
			content = <img alt={name} src={path} className={styles.image} />;
			break;
		case 'document':
			content = (
				<div>
					<a href={path}>
						<span className={styles.additionText}>{name}</span>
						<div className={`${styles.defaultAddition} ${styles.document}`} />
					</a>
				</div>
			);
			break;
		case 'audio':
			const play = () => {
				if (!isPlaying) {
					audio.current.play();
					setPlayStatus(true);
				} else {
					audio.current.pause();
					setPlayStatus(false);
				}
			};

			const stop = () => {
				setPlayStatus(false);
			};

			const statusStyle = !isPlaying ? styles.audioPlay : styles.audioStop;

			content = (
				<div onClick={play}>
					<span className={styles.additionText}>Аудиосообщение</span>
					<div className={styles.defaultAddition}>
						<div className={`${styles.audioStatus} ${statusStyle}`}/>
					</div>
					<audio onEnded={stop} ref={audio} src={path}/>
				</div>
			);
			break;
		default:
			break;
	}

	return content;
}

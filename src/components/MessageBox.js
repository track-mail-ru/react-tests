import React from 'react';
import { TimeToTime } from '../lib/TimeToTime';
import styles from '../static/styles/MessageBox.module.css';

export function MessageBox(props) {
	const { info } = props;

	let boxStyle = null;
	if (info.self) {
		boxStyle = styles.self;
	}

	let conteinerClass = null;
	let color = null;
	switch (info.status) {
		case 0:
			conteinerClass = styles.newBox;
			color = '#9DD4F3';
			break;
		case 1:
			color = '#3958F3';
			break;
		case 3:
			color = '#3958F3';
			conteinerClass = styles.newBox;
			break;
		case 4:
			color = '#F32626';
			break;
		default:
			color = 'transparent';
			break;
	}

	return (
		<div className={`${styles.messageConteiner} ${conteinerClass}`}>
			<div className={`${styles.messageBox} ${boxStyle}`}>
				{ ('additions' in info) && <Addition additions={info.additions} />}
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
		list,
	} = props.additions;

	let content = null;

	switch (type) {
		case 'geolocation':
			content = (
				<div>
					<a href={list[0].path}>
						<span className={styles.additionText}>Геолокация</span>
						<div className={`${styles.defaultAddition} ${styles.geolocation}`} />
					</a>
				</div>
			);
			break;
		case 'images':
			content = list.map((elem, i) => {
				const {
					path,
					name,
				} = elem;

				return <img key={i} alt={name} src={path} className={styles.image} />;
			});
			break;
		case 'documents':
			content = list.map((elem, i) => {
				const {
					path,
					name,
				} = elem;

				return (
					<div key={i} style={{margin: '10px 5px'}}>
						<a href={path}>
							<span className={styles.additionText}>{name}</span>
							<div className={`${styles.defaultAddition} ${styles.document}`} />
						</a>
					</div>
				);
			});
			break;
		default:
			break;
	}

	return (
		<div className={styles.addition}>
			{ content }
		</div>
	);
}

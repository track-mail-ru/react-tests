import React from 'react';
import { FormInput } from './FormInput';
import { DateMarker } from './DateMarker';
import styles from './../static/styles/ChatForm.css';

export function ChatForm(props) {
	let userImageStyles = {
		backgroundImage: `url(${require('../static/images/image.jpg')})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
	};

	console.log(styles.header);

	return (
		<div className="chat-form">
			<div className="header">
				<div className="header-button back-button"></div>
				<div className="name-conteiner">
					<div className="user-image" style={userImageStyles}></div>
					<div className="user-name">
						<div className="name">Виталий Кисель</div>
						<div className="status">в сети 5 минут назад</div>
					</div>
				</div>
				<div className="header-button search-button"></div>
				<div className="header-button options-button"></div>
			</div>
			<div className="content">
				<div className="message-wrap">
					<DateMarker />
				</div>
			</div>
			<div className="footer">
				<FormInput placeholder="Ваше сообщение" />
			</div>
		</div>
	);
}

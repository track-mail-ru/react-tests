import React from 'react';
import { timeToDate } from '../lib/TimeToDate';
import './../static/styles/Chat.css';

export function Chat(props) {
	const chatInfo = props.chatInfo;
	const time = timeToDate(chatInfo.lastMessageTime);

	let status = null;
	switch(chatInfo.messageStatus) {
		case 0:
			status = 'sending';
			break;
		case 1:
			status = 'sent';
			break;
		case 2:
			status = 'red';
			break;
		case 3:
			status = 'new-message';
			break;
		default:
			status = 'error';
			break;
	}

	let statusContent = null;
	switch(chatInfo.messageStatus) {
		case 3:
			statusContent = chatInfo.countUnredMessages;		      				
			break;
		case 4:
			statusContent = '!'
			break;
		default:
			statusContent = '';
			break;
	}

	let avatarStyle = {
		backgroundImage: null,
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};

	try {
		avatarStyle.backgroundImage = `url(${ require(`../static/images/${ chatInfo.avatar }`) })`;
	} catch {
		avatarStyle.backgroundImage = `url(${ require('../static/images/default.png') })`;
	}

	return (
		<div className='chat'>
		  	<div className='chat-avatar' style={ avatarStyle }></div>
		  	<div className='chat-info'>
		    	<div className='chat-name'>
		      		<span className='name'>{ chatInfo.chatName }</span>
		      		<span className='message-time'>{ time }</span>
		    	</div>
		    	<div className='last-message'>
		      		<p>{ chatInfo.lastMessage }</p>
		      		<span className={ `message-status ${ status }` }>{ statusContent }</span>
		    	</div>
		  	</div>
		</div>
	);
}
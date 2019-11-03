import React from 'react';
import './../static/styles/ChatList.css';
import { Chat } from './Chat.js';

export function ChatList(props) {
	let chatsList = props.chatsList;
	let list = [];
	if (!chatsList) {
		list = <div className='none-messages'>{ 'Сообщений пока нет (' }</div>;
	} else {
		let lastChatTime = null;
		for (let id in chatsList) {
			let chat = chatsList[id];
			let block = <Chat key={ id } chatInfo={ chat } />;
			if(chat.lastMessageTime > lastChatTime){
				list.unshift(block);
			} else {
				list.push(block);
			}
			lastChatTime = chat.lastMessageTime;	
		}
	}

	return (
		<div className='chat-list'>
			<div className='header'>
			  <div className='menu'></div>
			  <span className='form-name'>Сообщения</span>
			</div>
			<div className='content'>
				{ list }
			</div>
			<div className='button-new'>
			  <div className='pen'></div>
			</div>
		</div>
	);
}
import React from 'react';
import { render } from 'react-dom';
import './static/styles/index.css';
import './static/styles/Main.css';
import { ChatList } from './components/ChatList';
import { ChatForm } from './components/ChatForm';

export class Main extends React.Component {
	constructor(props) {
		super(props);
		let info = this.getInfo();
		this.state = {
			chatsList: info.chatsList,
			messageList: info.messageList,
		};
	}

	getInfo() {
		try { 
			var info = {
				chatsList: JSON.parse(localStorage.getItem('chatsList')),
				messageList: JSON.parse(localStorage.getItem('messageList')),
			};
		} catch {
			info = {
				chatsList: null,
				messageList: null,
			};
		}
		return info;
	}

	render() {
		return (
			<div className='wrap'>
				{/*<ChatList chatsList={ this.state.chatsList } />*/}
				<ChatForm />
			</div>
		);
	}
}

localStorage.setItem('chatsList', JSON.stringify({
	1: {
		chatName: 'Виталик Кисель',
		isGroupChat: false,
		mebmers: {
			122: {
				name: 'Виталик',
				fullName: 'Виталик Кисель',
				avatar: 'image.jpg',
				status: 0, // 0 - online, что-то друго последнее время онлайн
			},
			123: {
				name: 'Вы',
				fullName: 'Виталик Кисель',
				avatar: '',
				status: 0, // 0 - online, что-то друго последнее время онлайн
			}
		},
		penPalLast: 122,
		countUnredMessages: 4,
		avatar: 'image.jpg',
		lastMessage: 'Ты чего игноришь???',
		lastMessageTime: (new Date()).getTime() - 366666,
		messageStatus: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
	}, 
	2: {
		chatName: 'ДР Павла Дурова',
		isGroupChat: true,
		mebmers: {
			122: {
				name: 'Виталик',
				fullName: 'Виталик Кисель',
				avatar: 'image.jpg',
				status: 0, // 0 - online, что-то друго последнее время онлайн
			},
			123: {
				name: 'Вы',
				fullName: 'Виталик Кисель',
				avatar: '',
				status: 0, // 0 - online, что-то друго последнее время онлайн
			},
			133: {
				name: 'Павел',
				fullName: 'Павел Дуров',
				avatar: '',
				status: 0, // 0 - online, что-то друго последнее время онлайн
			}
		},
		penPalLast: 133,
		countUnredMessages: 1,
		avatar: 'pie.png',
		lastMessage: 'Приглашаю вас всех на моё ДР',
		lastMessageTime: (new Date()).getTime(),
		messageStatus: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
	},
}));

localStorage.setItem('messageList', JSON.stringify({
	1: [
		{
			id: 0,
			time: (new Date()).getTime() - 366666,
			text: 'Привет',
			status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка 
		},
		{
			id: 0,
			time: (new Date()).getTime() - 366666,
			text: 'Что ты будешь Паше дарить?',
			status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка 
		},
		{
			id: 0,
			time: (new Date()).getTime() - 366666,
			text: 'Давай что-то подарим вместе?',
			status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка 
		},
		{
			id: 0,
			time: (new Date()).getTime() - 366666,
			text: 'Ты чего игноришь???',
			status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка 
		},
	],
	2: [
		{
			id: 0,
			time: 123544332553,
			text: 'Какое-то сообщение',
			status: 0, // 0 - прочитано, 1 - ошибка 
		},
		{
			id: 1,
			time: 123544332544,
			text: 'Последнее сообщение 2',
			status: 0, // 0 - прочитано, 1 - ошибка 
		},
	]
}));

render (
	<Main />,
	document.getElementById('root'),
);
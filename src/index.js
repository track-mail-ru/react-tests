import React from 'react';
import { render } from 'react-dom';
import { ChatList } from './components/ChatList';
import { ChatForm } from './components/ChatForm';
import './static/styles/index.css';
import styles from './static/styles/Main.module.css';

export class Main extends React.Component {
	constructor(props) {
		super(props);
		let info = this.getInfo();
		this.state = {
			chatsList: info.chatsList,
			messageList: info.messageList,
			myInfo: info.messageList,
			activeChat: 1,
		};
	}

	getInfo() {
		try {
			var info = {
				chatsList: JSON.parse(localStorage.getItem('chatsList')),
				messageList: JSON.parse(localStorage.getItem('messageList')),
				myInfo: JSON.parse(localStorage.getItem('myInfo')),
			};
		} catch {
			info = {
				chatsList: null,
				messageList: null,
				myInfo: null,
			};
		}
		return info;
	}

	render() {
		let state = this.state;
		return (
			<div className={styles.wrap}>
				{/*<ChatList chatsList={ this.state.chatsList } />*/}
				<ChatForm
					myInfo={state.myInfo}
					chatInfo={state.activeChat && state.chatsList[state.activeChat]}
					messageList={state.activeChat && state.messageList[state.activeChat]}
				/>
			</div>
		);
	}
}

localStorage.setItem(
	'myInfo',
	JSON.stringify({
		id: 7,
		name: 'Вы',
		fullName: 'Владимир Путин',
		userName: 'volodya007',
		avatar: '',
	}),
);

localStorage.setItem(
	'chatsList',
	JSON.stringify({
		1: {
			chatName: 'Виталик Кисель',
			isGroupChat: false,
			penPal: {
				name: 'Виталик',
				fullName: 'Виталик Кисель',
				avatar: 'image.jpg',
				status: new Date().getTime() - 366666, // 0 - online, что-то друго последнее время онлайн
			},
			penPalLast: 122,
			countUnredMessages: 4,
			avatar: 'image.jpg',
			lastMessage: 'Ты чего игноришь???',
			lastMessageTime: new Date().getTime() - 366666,
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
				133: {
					name: 'Павел',
					fullName: 'Павел Дуров',
					avatar: '',
					status: 0, // 0 - online, что-то друго последнее время онлайн
				},
			},
			penPalLast: 133,
			countUnredMessages: 1,
			avatar: 'pie.png',
			lastMessage: 'Приглашаю вас всех на моё ДР',
			lastMessageTime: new Date().getTime(),
			messageStatus: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
		},
	}),
);

localStorage.setItem(
	'messageList',
	JSON.stringify({
		1: [
			{
				id: 0,
				time: new Date().getTime() - 366666,
				text: 'Привет) Идёшь на др к Дурову?',
				self: true,
				status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка
			},
			{
				id: 1,
				time: new Date().getTime() - 366666,
				text: 'Привет, да иду',
				self: false,
				status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка
			},
			{
				id: 2,
				time: new Date().getTime() - 366666,
				text: 'Что ты будешь Паше дарить?',
				self: false,
				status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка
			},
			{
				id: 3,
				time: new Date().getTime() - 366666,
				text: 'Давай что-то подарим вместе?',
				self: false,
				status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка
			},
			{
				id: 4,
				time: new Date().getTime() - 366666,
				text: 'Ты чего игноришь???',
				self: false,
				status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка
			},
			{
				id: -9,
				time: new Date('2018-1-1').getTime(),
				text: 'Ку-ку???',
				self: false,
				status: 0, // 0 - непрочитано, 1 - прочитано, 2 - ошибка
			},
		],
		2: [
			{
				id: 5,
				time: 123544332553,
				text: 'Какое-то сообщение',
				status: 0, // 0 - прочитано, 1 - ошибка
			},
			{
				id: 6,
				time: 123544332544,
				text: 'Последнее сообщение 2',
				status: 0, // 0 - прочитано, 1 - ошибка
			},
		],
	}),
);

render(<Main />, document.getElementById('root'));

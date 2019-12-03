localStorage.setItem(
	'myInfo',
	JSON.stringify({
		id: 3,
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
			id: 2,
			chatName: 'ДР Павла Дурова',
			isGroupChat: true,
			mebmers: {
				122: {
					name: 'Виталик Кисель',
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
			lastMessageTime: new Date().getTime() - 1002214,
			messageStatus: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
		},
		35: {
			id: 35,
			chatName: 'Общий чат FRONTEND',
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
			avatar: '',
			lastMessage: 'Павел Дуров создал групповой чат',
			lastMessageTime: new Date().getTime(),
			messageStatus: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
		},
	}),
);

localStorage.setItem(
	'messageList',
	JSON.stringify({
		1: {
			0: {
				id: 0,
				time: new Date().getTime() - 366666,
				text: 'Привет) Идёшь на др к Дурову?',
				self: true,
				status: 4, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
			1: {
				id: 1,
				time: new Date().getTime() - 366666,
				text: 'Привет, да иду',
				self: false,
				status: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
			2: {
				id: 2,
				time: new Date().getTime() - 366666,
				text: 'Что ты будешь Паше дарить?',
				self: false,
				status: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
			3: {
				id: 3,
				time: new Date().getTime() - 366666,
				text: 'Давай что-то подарим вместе?',
				self: false,
				status: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
			4: {
				id: 4,
				time: new Date().getTime() - 366666,
				text: 'Ты чего игноришь???',
				self: false,
				status: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
		},
		2: {
			5: {
				id: 5,
				time: new Date().getTime(),
				text: 'Привет, друзья!',
				status: 2, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
			6: {
				id: 6,
				time: new Date().getTime(),
				text: 'Приглашаю вас всех на моё ДР',
				status: 3, // 0 - отправляется, 1 - отправлено, 2 - прочитано, 3 - новое сообщение, 4 - ошибка
			},
		},
		35: {},
	}),
);

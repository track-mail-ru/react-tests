localStorage.setItem('dialogList', JSON.stringify([0, 1]));

localStorage.setItem('dialogID_0', JSON.stringify({
    0: {
        text: "Тестовое сообщение",
        time: (new Date('2019-10-10')).getTime(),
        owner: 121,
        status: "red"
    },
}));

localStorage.setItem('dialogID_1', JSON.stringify({
    0: {
        text: "Лол",
        time: (new Date()).getTime(),
        owner: 121,
        status: "new"
    },
}));
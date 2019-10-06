const template = document.createElement('template');
template.innerHTML = `
    <style>
        *{
            margin: 0;
            padding: 0;
            --fontNormalSize: 1.1em;
            --fontMinSize: 0.95em;
            --fontMaxSize: 1.2em;
            --fontMinMinSize: 0.8em;
            box-sizing: border-box;
        }

        li{
            list-style: none;
        }

        html, body{
            height: 100%;
            font-family: -apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,Noto Sans Armenian,Noto Sans Bengali,Noto Sans Cherokee,Noto Sans Devanagari,Noto Sans Ethiopic,Noto Sans Georgian,Noto Sans Hebrew,Noto Sans Kannada,Noto Sans Khmer,Noto Sans Lao,Noto Sans Osmanya,Noto Sans Tamil,Noto Sans Telugu,Noto Sans Thai,sans-serif;
            font-size: var(--fontNormSize);
            color: #E2E3E5;
        }

        :host{
            width: 100%;
            height: 100%;
            background-color: #191919;
            background: url(/src/images/background.png);
            display: flex;
            flex-direction: column;
        }

        .header{
            background-color: #2C2D2F;
            width: 100%;
            z-index: 1;
            box-shadow: 0 0 2px 0 #151716;
        }

        .content{
            width: 100%;
            display: flex;
            flex: auto;
            flex-wrap: wrap;
            flex-direction: column-reverse;
            align-content: flex-end;
            z-index: 0;
            overflow-y: auto;
        }

        ::-webkit-scrollbar {
            width: 0px;
        }

        .messageWrap{
            display: block;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
        }

        message-box{
            box-sizing: border-box;
            width: 100%;
            padding: 0 10px 20px 10px;
        }

        .messageDate{
            width: 100%;
            text-align: center;
            font-size: var(--fontMinMinSize);
            font-weight: 600;
            padding: 30px 0;
            color: #9A9B9D;
        }

        .footer{
            width: 100%;
            background-color: #191919;
            outline: 1px solid #242424;
            z-index: 1;
        }
    </style>
    <div class="header">
        <dialog-info></dialog-info>
    </div>
    <div class="content">
        <div class="messageWrap">
            <div class="messageDate">Сегодня, 6 октября</div>
        </div>
    </div>
    <div class="footer">
        <form-input placeholder="Ваше сообщение"></form-input>
    </div>
`;

class MessageForm extends HTMLElement {
    constructor () {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this._shadowRoot.querySelector('form-input');
        this.$messages = this._shadowRoot.querySelector('.messageWrap');

        this.dialogID = 0;

        this.$input.addEventListener('onSubmit', this._onSubmit.bind(this));

        this._messageLoader();
    }

    _waitingForMessage () {
        let messages = newMessages[this.dialogID];
        console.log(messages);
    }

    _messageLoader () {
        let currentID = parseInt(localStorage.getItem(this.dialogID + '_curentID'));
        let i = currentID - 100;
        if(i < 0) i = 0;

        do {
            let messageBox = JSON.parse(localStorage.getItem('msg_' + this.dialogID + '_' + i));
            if(messageBox != null) this._renderMessage(messageBox);
        } while (++i && i <= currentID);
    }

    _renderMessage (messageBox) {
        this.$messages.innerHTML += `<message-box
            messageID="${messageBox['messageID']}"
            owner="${messageBox['owner']}"
            text="${messageBox['message']}"
            time="${messageBox['time']}"
        ></message-box>`;
    }

    _newMessage (owner, text, additions = null) {
        let currentID = parseInt(localStorage.getItem(this.dialogID + '_curentID')) + 1;
        if(isNaN(currentID)) currentID = 0;
        localStorage.setItem(this.dialogID + '_curentID', currentID);

        let time = new Date();
        var messageBox = {
            messageID: currentID,
            owner: ((owner) ? 'enemy' : 'self'), 
            message: text,
            additions: null,
            time: time.getTime()
        };

        localStorage.setItem('msg_' + this.dialogID + '_' + currentID, JSON.stringify(messageBox));
        this._renderMessage(messageBox);
    }

    _onSubmit (event) {
        if(this.$input.value != ''){
            this._newMessage(0, this.$input.value);
            this.$input.setAttribute('value','');
        }
    }
}

customElements.define('message-form', MessageForm);

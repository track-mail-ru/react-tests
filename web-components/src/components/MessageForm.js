const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
        }

        .result {
            color: red;
        }

        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Введите сообщеине"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        this.$messages = this._shadowRoot.querySelector('.result');
        this.dialogID = 0;

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
        this.addEventListener('onClick', this._waitingForMessage.bind(this));

        this._messageLoader();
    }

    _waitingForMessage () {
        let messages = newMessages[this.dialogID];
        console.log(messages);
    }

    _messageLoader () {
        let currentID = parseInt(localStorage.getItem(this.dialogID + '_curentID'));
        let depth = 0;

        do {
            let messageBox = JSON.parse(localStorage.getItem(this.dialogID + '_' +  currentID));
            if(messageBox != null) this._renderMessage(messageBox);
        } while (currentID-- && depth++ < 100);
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
        console.log(currentID);
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
        event.preventDefault();
        this._newMessage(0, this.$input.value);
    }

    _onKeyPress (event) {
        if (event.keyCode == 13 && this.$input.value != '') {
            this.$form.dispatchEvent(new Event('submit'));
            this.$input.setAttribute('value','');
        }
    }
}

customElements.define('message-form', MessageForm);

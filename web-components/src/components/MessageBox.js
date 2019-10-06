const template = document.createElement('template');
template.innerHTML = `
    <style>
        .messageBox{
            width: 60%;
            padding: 10px;
            outline: 1px solid red;
        }

        .self{
            float: right;
        }

        .self:after{
            clear: both;
        }

        a{
            display: block;
            color: #333;
        }
    </style>
    <div class="messageBox" messageID>
        <a class="text"></a>
        <a class="time"></a>
    </div>
`;

class MessageForm extends HTMLElement {
    constructor () {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$wrap = this._shadowRoot.querySelector('.messageBox'); 
        this.$text  = this._shadowRoot.querySelector('.text');
        this.$time = this._shadowRoot.querySelector('.time');
    }

    static get observedAttributes() {
        return ['messageID', 'owner', 'text', 'time'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case 'messageID':
                this.$wrap.attr('messageID', newValue);
                break;

            case 'owner':
                this.$wrap.classList.add(newValue);
                break;

            case 'text':
                this.$text.innerText = newValue;
                break;

            case 'time':
                let time = new Date(parseInt(newValue));
                this.$time.innerText = time.getHours() + ':' + time.getMinutes();
                break;
        }
    }
}

customElements.define('message-box', MessageForm);

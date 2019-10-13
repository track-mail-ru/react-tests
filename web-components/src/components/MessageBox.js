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

  .messageBox{
    display: inline-block;
    background-color: #2C2D2F;
    border-radius: 15px;
    padding: 10px;
    text-align: justify;
    max-width: 60%;
    word-break: break-all;
  }

  .messageBox .time{
    width: 100%;
    text-align: right;
    font-size: var(--fontMinSize);
    margin-top: 5px;
    color: #656668;
  }

  .self{
    float: right;
    background-color: #454648 !important;
    color: #E2E3E5 !important;
  }

  .self .time{
    color: #77787A !important;
  }

  .self:after{
    clear: both;
  }
</style>
<li>
  <div class="messageBox">
    <div class="text">Какой-то текст</div>
    <div class="time">19:05</div>
  </div>
</li>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$wrap = this.shadowRoot.querySelector('.messageBox');
    this.$text = this.shadowRoot.querySelector('.text');
    this.$time = this.shadowRoot.querySelector('.time');
  }

  static get observedAttributes() {
    return ['messageID', 'owner', 'text', 'time'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
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
        let date = new Date(parseInt(newValue, 10));
        date = date.toString().split(' ')[4].split(':');
        this.$time.innerText = `${date[0]}:${date[1]}`;
        break;
    }
  }
}

customElements.define('message-box', MessageForm);

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
    background: url(../static/images/background.png);
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

  .footer{
    width: 100%;
    background-color: #191919;
    outline: 1px solid #242424;
    box-shadow: 0 0 2px 0 #151716;
    z-index: 1;
  }
</style>
<div class="header">
  <dialog-info></dialog-info>
</div>
<div class="content">
  <div class="messageWrap">
    <date-marker></date-marker>
  </div>
</div>
<div class="footer">
  <form-input placeholder="Ваше сообщение"></form-input>
</div>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('form-input');
    this.$messages = this.shadowRoot.querySelector('.messageWrap');

    this.dialogID = 0;
    this.lastRenderMessageDate = {
      year: null,
      month: null,
      date: null,
    };

    this.$input.addEventListener('onSubmit', this.onSubmit.bind(this));

    this.messageLoader();
  }

  messageLoader() {
    const currentID = parseInt(localStorage.getItem(`${this.dialogID}_curentID`), 10);

    let i = currentID - 100; // временно 100
    if (i < 0) i = 0;

    do {
      const messageBox = JSON.parse(localStorage.getItem(`msg_${this.dialogID}_${i}`));
      if (messageBox != null) this.renderMessage(messageBox);
    } while (++i && i <= currentID);
  }

  renderDate(time) {
    let elem = document.createElement('date-marker');
    elem = this.$messages.appendChild(elem);
    elem.setAttribute('time', time);
  }

  renderMessage(messageBox) {
    const time = new Date(messageBox.time);

    const currentDate = {
      year: time.getFullYear(),
      month: time.getMonth(),
      date: time.getDate(),
    }

    if (
      currentDate.year !== this.lastRenderMessageDate.year
      || currentDate.month !== this.lastRenderMessageDate.month
      || currentDate.date !== this.lastRenderMessageDate.date
    ) {
      this.renderDate(messageBox.time);
      this.lastRenderMessageDate = currentDate;
    }

    let elem = document.createElement('message-box');
    elem = this.$messages.appendChild(elem);

    elem.setAttribute('messageID', messageBox.messageID);
    elem.setAttribute('owner', messageBox.owner);
    elem.setAttribute('text', messageBox.message);
    elem.setAttribute('time', messageBox.time);
  }

  newMessage(owner, text, additions = null) {
    let currentID = parseInt(localStorage.getItem(`${this.dialogID}_curentID`), 10) + 1;
    if (isNaN(currentID)) currentID = 0;
    localStorage.setItem(`${this.dialogID}_curentID`, currentID);

    const time = new Date();
    const messageBox = {
      messageID: currentID,
      owner: ((owner) ? 'enemy' : 'self'),
      message: text,
      additions: additions,
      time: time.getTime(),
    };

    localStorage.setItem('msg_' + this.dialogID + '_' + currentID, JSON.stringify(messageBox));
    this.renderMessage(messageBox);
  }

  onSubmit() {
    if (this.$input.value !== '') {
      this.newMessage(0, this.$input.value);
      this.$input.setAttribute('value', '');
    }
  }
}

customElements.define('message-form', MessageForm);

const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :host{
    width: 100%;
    height: 100%;
    background-color: #191919;
    display: flex;
    flex-direction: column;
  }

  .header{
    background-color: #2C2D2F;
    width: 100%;
    height: 60px;
    flex-shrink: 0;
    flex-grow: 0;
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
    background: url(static/images/background.png);
    background-size: 60px;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  .messageWrap{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
  }

  message-box{
    box-sizing: border-box;
    padding: 0 10px 20px 10px;
    width: 100%;
    display: block;
    overflow: hidden;
  }

  message-box.newBox{
    animation-name: messageBoxApearence;
    animation-duration: 0.4s;
  }

  .footer{
    width: 100%;
    background-color: #191919;
    outline: 1px solid #242424;
    box-shadow: 0 0 2px 0 #151716;
    z-index: 1;
  }

  @keyframes messageBoxApearence{
    from{
      max-height: 0;
      opacity: 0;
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;
    }

    to{
      max-height: 100%;
      opacity: 1;
      padding-top: 0;
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 20px;
    }
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
    this.$header = this.shadowRoot.querySelector('dialog-info');
  }

  // Метод отрисовки/перерисовки всех сообщений
  messageLoader() {
    let dialogInfo = {};
    try { dialogInfo = JSON.parse(localStorage.getItem(`dialogID_${this.dialogID}`)); } catch (SyntaxError) { console.log('It can not to parse dialog messages.'); }
    if (dialogInfo == null) { return false; }

    this.$messages.innerHTML = '';

    Object.keys(dialogInfo).forEach((messageID) => {
      const message = dialogInfo[messageID];
      this.renderMessage(messageID, message);
    });
  }

  // Метод перерисовки одного сообщения с указанным messageID
  messageChange(messageID) {
    const elem = this.$messages.querySelector(`message-box[messageid="${messageID}"]`);

    let messageBox = {};
    try { messageBox = JSON.parse(localStorage.getItem(`dialogID_${this.dialogID}`))[messageID]; } catch (SyntaxError) { console.log('It can not to parse dialog messages.'); }
    if (messageBox === null) { messageBox = {}; }

    this.messageSetAttributes(elem, messageBox);
  }

  renderDate(time) {
    let elem = document.createElement('date-marker');
    elem = this.$messages.appendChild(elem);
    elem.setAttribute('time', time);
  }

  // Метод добавления сообщения с конкретным messageID
  // и информацией messageBox
  renderMessage(messageID, messageBox, newFlag = false) {
    const time = new Date(messageBox.time);

    if (!this.lastRenderMessageDate) {
      this.lastRenderMessageDate = {
        year: null,
        month: null,
        date: null,
      };
    }

    const currentDate = {
      year: time.getFullYear(),
      month: time.getMonth(),
      date: time.getDate(),
    };

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
    this.messageSetAttributes(elem, messageBox);

    if (newFlag) { elem.classList.add('newBox'); }
  }

  clearChat() {
    delete this.lastRenderMessageDate;

    let elem = document.createElement('date-marker');
    elem = this.$messages.appendChild(elem);
  }

  messageSetAttributes(elem, messageBox) {
    Object.keys(messageBox).forEach((attribute) => {
      elem.setAttribute(attribute.toLowerCase(), messageBox[attribute]);
    });
  }

  static get observedAttributes() {
    return ['dialogid'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.dialogID = newValue;
  }
}

customElements.define('message-form', MessageForm);

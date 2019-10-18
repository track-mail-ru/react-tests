const template = document.createElement('template');
template.innerHTML = `
<style>
  .wrap{
    width: 100%;
    height: 100%;
    position: relative;
  }

  .wrap *{
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
</style>
<div class="wrap">
  <dialog-list></dialog-list>
</div>
`;

class Main extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$wrap = this.shadowRoot.querySelector('.wrap');
    this.$dialogList = this.shadowRoot.querySelector('dialog-list');

    this.$dialogList.dialogLoader();
    this.addEventOpenDialog();
  }

  openChat(dialogID) {
    if (this.$chatForm !== undefined) { return false; }

    this.$chatForm = document.createElement('message-form');
    this.$chatForm = this.$wrap.appendChild(this.$chatForm);
    this.$chatForm.setAttribute('dialogid', dialogID);

    this.$chatForm.style.zIndex = 10;

    this.$chatForm.messageLoader();
    this.$chatForm.$header.addEventListener('clickBackButton', () => this.closeChat());
    this.$chatForm.$input.addEventListener('onSubmit', () => this.onSubmitMessage(dialogID));
  }

  closeChat() {
    if (this.$chatForm === undefined) { return false; }
    this.$wrap.removeChild(this.$chatForm);
    this.$chatForm = undefined;
  }

  addEventOpenDialog() {
    if (this.addedEvent === undefined) { this.addedEvent = []; }

    let dialogList = [];
    try { dialogList = JSON.parse(localStorage.getItem('dialogList')); } catch (SyntaxError) { console.log('It can not to parse dialog list.'); }

    dialogList.forEach((dialogID) => {
      if (!(dialogID in this.addedEvent)) {
        const elem = this.$dialogList.$content.querySelector(`object-dialog[dialogid="${dialogID}"]`);
        elem.addEventListener('click', () => this.openChat(dialogID));
        this.addedEvent.push(dialogID);
      }
    });
  }

  onSubmitMessage(dialogID) {
    if (this.$chatForm === undefined) { return false; }

    const inputLine = this.$chatForm.$input.value;
    if (!inputLine) { return false; }
    this.$chatForm.$input.clearInput();

    let messageList = {};
    try { messageList = JSON.parse(localStorage.getItem(`dialogID_${dialogID}`)); } catch (SyntaxError) { console.log('It can not to parse dialog messages.'); }
    if (messageList === null) messageList = {};

    let lastMessageID = Math.max(...Object.keys(messageList));

    const currentMessage = messageList[++lastMessageID] = {
      text: inputLine,
      time: (new Date()).getTime(),
      owner: 'self',
      status: 'sending',
    };

    localStorage.setItem(`dialogID_${dialogID}`, JSON.stringify(messageList));
    this.$chatForm.renderMessage(lastMessageID, currentMessage);

    const dialogInfo = currentMessage;
    dialogInfo.dialogAvatar = this.$dialogList.dialogAvatar(dialogID);
    dialogInfo.dialogName = this.$dialogList.dialogName(dialogID);

    this.$dialogList.dialogUpdate(dialogID, dialogInfo);
  }
}

customElements.define('main-component', Main);

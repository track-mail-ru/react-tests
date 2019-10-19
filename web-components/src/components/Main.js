const template = document.createElement('template');
template.innerHTML = `
<style>
  .wrap{
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .wrap *{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }

  message-form{
    z-index: 1;
    right: -100%;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  message-form.apear{
    animation-name: chatApearence;
  }

  message-form.disapear{
    animation-name: chatDisapear;
  }

  @keyframes chatDisapear{
    from{
      right: 0;
      opacity: 1;
    }

    to{
      right: -100%;
      opacity: 0.8;
    }
  }

  @keyframes chatApearence{
    from{
      right: -100%;
      opacity: 0.8;
    }

    to{
      right: 0;
      opacity: 1;
    }
  }
</style>
<div class="wrap">
  <dialog-list></dialog-list>
  <message-form></message-form>
</div>
`;

class Main extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$wrap = this.shadowRoot.querySelector('.wrap');
    this.$dialogList = this.shadowRoot.querySelector('dialog-list');
    this.$chatForm = this.shadowRoot.querySelector('message-form');

    this.$dialogList.dialogLoader();
    this.addEventOpenDialog();
  }

  openChat(dialogID) {
    this.$chatForm.setAttribute('dialogid', dialogID);

    this.$chatForm.classList.remove('disapear');
    this.$chatForm.classList.add('apear');

    this.$chatForm.messageLoader();
    this.$chatForm.$header.addEventListener('clickBackButton', () => this.closeChat());
    this.$chatForm.$input.addEventListener('onSubmit', () => this.onSubmitMessage(dialogID));
  }

  closeChat() {
    this.$chatForm.classList.remove('apear');
    this.$chatForm.classList.add('disapear');
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
    this.$chatForm.renderMessage(lastMessageID, currentMessage, true);

    const dialogInfo = currentMessage;
    dialogInfo.dialogAvatar = this.$dialogList.dialogAvatar(dialogID);
    dialogInfo.dialogName = this.$dialogList.dialogName(dialogID);

    this.$dialogList.dialogUpdate(dialogID, dialogInfo);
  }
}

customElements.define('main-component', Main);

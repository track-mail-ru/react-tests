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

  ::-webkit-scrollbar {
    width: 0px;
  }

  :host{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    position: relative;
  }

  .header{
    background-color: #2C2D2F;
    width: 100%;
    height: 60px;
    z-index: 1;
    box-shadow: 0 0 2px 0 #151716;
    flex-shrink: 0;
    padding-left: 30px;
  }

  .header .menu{
    width: 30px;
    height: 100%;
    display: inline-block;
    margin-right: 20px;
    background: url(static/images/menu.png) no-repeat center center;
    background-size: 30px;
    float: left;
  }

  .header .formName{
    line-height: 60px;
    float: left;
    color: #A9A9AC;
    font-weight: bold;
  }

  .formName:after{
    clear: both;
  }

  .content{
    flex: auto;
    background-color: #1A1A1A;
    overflow-y: auto;
    z-index: 0;
  }

  .noneMessages{
    width: 100%;
    text-align: center;
    padding-top: 50%;
    font-size: var(--fontMinSize);
    color: #4C4C4D;
  }

  .dialogWrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto; 
  }

  .buttonNew{
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    opacity: 0.6;
    background-color: #61A0C4;
    border-radius: 30px;
    transition-duration: 0.2s;
    cursor: pointer;
    animation-name: pencil;
    animation-duration:  3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-delay: 1s;
  }

  .buttonNew:hover{
    opacity: 1.0;
  }

  .pen{
    background: url(static/images/pen.png) no-repeat center center;
    background-size: 30px;
    width: 30px;
    height: 60px;
    margin: auto;
  }

  @keyframes pencil{
    from{
      bottom: 30px;
      right: 30px;
      transform: rotate(0deg);
    }

    7.5%{
      bottom: 30px;
      right: 30px;
      transform: rotate(60deg);
    }

    15%{
      bottom: 30px;
      right: 30px;
      transform: rotate(-30deg);
    }

    22.5%{
      bottom: 30px;
      right: 30px;
      transform: rotate(15deg);
    }

    30%{
      bottom: 30px;
      right: 30px;
      transform: rotate(-7.5deg);
    }

    37.5%{
      bottom: 30px;
      right: 30px;
      transform: rotate(3.25deg);
    }

    45%{
      bottom: 30px;
      right: 30px;
      transform: rotate(-1.625deg);
    }

    50%{
      bottom: 30px;
      right: 30px;
      transform: rotate(0deg);
    }
  }
</style>
<div class="header">
  <div class="menu"></div>
  <a class="formName">Сообщения</a>
</div>
<div class="content">
  <div class="noneMessages">Сообщений пока нет (</div>
</div>
<div class="buttonNew">
  <div class="pen"></div>
</div>
`;

class DialogList extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$content = this.shadowRoot.querySelector('.content');
  }

  dialogLoader() {
    const dialogList = JSON.parse(localStorage.getItem('dialogList'));
    if (dialogList != null && dialogList.length) this.$content.innerHTML = '';

    let lastTime = 0;
    Object.keys(dialogList).forEach((dialogID) => {
      const messageList = JSON.parse(localStorage.getItem(`dialogID_${dialogID}`));
      const lastMessageID = Math.max.apply(null, Object.keys(messageList));

      let countOfUnreadMessages = null;

      Object.keys(messageList).forEach((messageID) => {
        if (messageList[messageID].owner !== 'self' && messageList[messageID].status === 'new') countOfUnreadMessages++;
      });

      const dialogInfo = messageList[lastMessageID];
      dialogInfo.unreadMessages = countOfUnreadMessages;
      dialogInfo.dialogName = this.dialogName(dialogID);
      dialogInfo.dialogAvatar = this.dialogAvatar(dialogID);
      delete dialogInfo.owner;

      //if (countOfUnreadMessages != null) dialogInfo.status = 'new';

      const messageTime = dialogInfo.time;
      if (messageTime > lastTime) this.renderDialog(dialogID, dialogInfo);
      else { this.renderDialog(dialogID, dialogInfo, false); }
      lastTime = messageTime;
    });
  }

  // Временные функции за отсутствием бекэнда

  dialogAvatar(dialogID) {
    return 'static/images/image.jpg';
  }

  dialogName(dialogID) {
    return 'Виталий Кисель';
  }

  dialogUpdate(dialogID, dialogInfo) {
    const elem = this.$content.querySelector(`object-dialog[dialogid="${dialogID}"]`);
    this.$content.insertBefore(elem, this.$content.firstChild);
    elem.dialogReRender(dialogInfo);
  }

  renderDialog(dialogID, dialogInfo, intoFirst = true) {
    let elem = document.createElement('object-dialog');

    if (intoFirst) {
      elem = this.$content.insertBefore(elem, this.$content.firstChild);
    } else { elem = this.$content.appendChild(elem); }

    elem.setAttribute('dialogid', dialogID);
    elem.dialogRender(dialogInfo);
  }
}

customElements.define('dialog-list', DialogList);

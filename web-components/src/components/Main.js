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

    this.dialogLoader();
  }

  openChat(dialogID) {
    if(this.$chatForm != undefined) return false;
    this.$chatForm = document.createElement('message-form');
    this.$chatForm.messageLoader(dialogID);
    this.$chatForm = this.$wrap.appendChild(this.$chatForm);
    this.$chatForm.style.zIndex = 1;
  }

  closeChat() {
    if(this.$chatForm == undefined) return false;
    this.$wrap.removeChild(this.$chatForm);
    this.$chatForm = undefined;
  }

  /*
  {
    "dialogID": 1124,
    "messageID": 112,
    "userID": 1241,
    "message": "message like blablabla",
    "messageTime": 12125125, //UnixTime 
    "additional": "image.jpg",
    "messageStatus": "sent",
  }

  localStorage.setItem('dialogList', JSON.stringify({
    0: {
      'dialogName': 'Виталий Кисель 0',
      'message': 'dgasdgasdgasdg',
      'dialogAvatar': 'static/images/image.jpg',
      'messageTime': (new Date('2019-10-12')),
      'messageStatus': 'new',
    },

    10: {
      'dialogName': 'Виталий Кисель 1',
      'message': 'dgasdgasdgasdg',
      'dialogAvatar': 'static/images/image.jpg',
      'messageTime': (new Date('2019-10-12')),
      'messageStatus': 'new',
    },
  }))
  */
  updateDialogInfo(dialogInfo) {
    let dialogID = dialogInfo['dialogID'];
    let dialogList = JSON.parse(localStorage.getItem('dialogList'));
    let dialogInfoTemp = dialogList[dialogID];

    for(let key in dialogInfo){
      if(key == 'dialogAvatar') dialogInfoTemp['dialogAvatar'] = this.getDialogAvatar(dialogID);
      else if(key == 'dialogName') dialogInfoTemp['dialogName'] = this.getDialogName(dialogID);
      else dialogInfoTemp[key] = dialogInfo[key];
    }

    dialogList[dialogID] = dialogInfoTemp;
    localStorage.setItem('dialogList', JSON.stringify(dialogList));

    this.$dialogList.dialogUpdate(dialogID, dialogInfoTemp);
  }

  newDialogMessage(dialogInfo) {
    let dialogList = JSON.parse(localStorage.getItem('dialogList'));
    let dialogID = dialogInfo['dialogID'];
    let dialogInfoTemp = {
      "dialogName": this.getDialogName(dialogID),
      "dialogAvatar": this.getDialogAvatar(dialogID),
      "message": dialogInfo['message'],
      "messageTime": dialogInfo['messageTime'],
      "messageStatus": dialogInfo['messageStatus']
    };
    dialogList[dialogID] = dialogInfoTemp;
    localStorage.setItem('dialogList', JSON.stringify(dialogList));
    this.$dialogList.renderDialog(dialogID, dialogInfoTemp);
  }

  getDialogAvatar(dialogID) {
    return 'static/images/image.jpg';
  }

  getDialogName(dialogID) {
    return 'Виталий Кисель';
  }

  dialogLoader() {
    const dialogList = JSON.parse(localStorage.getItem('dialogList'));
    this.$dialogList.dialogLoader(dialogList);
  }
}

customElements.define('main-component', Main);

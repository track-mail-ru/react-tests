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

  .dialog{
    display: flex;
    padding: 10px 10px 0 10px;
    width: 100%;
    height: 90px;
    cursor: pointer;
  }

  .dialog:hover{
    background-color: #1D1D1D;
  }

  .dialogAvatar{
    width: 70px;
    height: 70px;
    border-radius: 50px;
    margin: 0 20px;
  }

  .dialogInfo{
    flex: auto;
    height: 100%;
    border-bottom: 1px solid #242424;
    padding: 12px;
  }

  .dialogName{
    margin-bottom: 10px;
  }

  .dialogName a{
    font-size: var(--fontMinSize);
    font-weight: bold;
  }

  .messageTime{
    color: #939395;
    font-size: var(--fontMinMinSize);
    float: right;
  }

  .messageTime:after{
    clear: both;
  }

  .lastMessage{
    color: #939395;
    display: flex;
  }

  .lastMessage p{
    flex: auto;
    overflow: hidden;
    margin-right: 20px;
    text-overflow: ellipsis;
    font-size: var(--fontMinSize);
    white-space: nowrap;
  }

  .messageStatus{
    height: 18px;
    width: 18px;
    display: inline-block;
  }

  .sending{
    background: url(static/images/sending.png) no-repeat center center;
    background-size: 18px;
  }

  .sent{
    background: url(static/images/sent.png) no-repeat center center;
    background-size: 18px;
  }

  .red{
    background: url(static/images/readed.png) no-repeat center center;
    background-size: 18px;
  }

  .newMessages{
    background-color: #497994;
    border-radius: 12px;
    font-size: var(--fontMinMinSize);
    text-align: center;
    font-weight: bold;
    color: #E2E3E5;
    padding: 3px 8px;
    width: unset;
    height: unset;
  }
</style>
<div class="dialog">
  <div class="dialogAvatar"></div>
  <div class="dialogInfo">
    <div class="dialogName">
      <a></a>
      <span class="messageTime"></span>
    </div>
    <div class="lastMessage">
      <p></p>
      <span class="messageStatus"></span>
    </div>
  </div>
</div>
`;

class ObjectDialog extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$userName = this.shadowRoot.querySelector('.dialogName a');
    this.$userAvatar = this.shadowRoot.querySelector('.dialogAvatar');
    this.$messageTime = this.shadowRoot.querySelector('.messageTime');
    this.$lastMessage = this.shadowRoot.querySelector('.lastMessage p');
    this.$messageStatus = this.shadowRoot.querySelector('.messageStatus');
  }

  dialogReRender(tempDialogInfo) {
    if (tempDialogInfo.dialogName !== this.dialogInfo.dialogName) {
      this.dialogInfo.dialogName = tempDialogInfo.dialogName;
      this.$userName.innerText = this.dialogInfo.dialogName;
    }

    if (tempDialogInfo.text !== this.dialogInfo.text) {
      this.dialogInfo.text = tempDialogInfo.text;
      this.$lastMessage.innerText = this.dialogInfo.text;
    }

    if (tempDialogInfo.dialogAvatar !== this.dialogInfo.dialogAvatar) {
      this.dialogInfo.dialogAvatar = tempDialogInfo.dialogAvatar;
      this.$userAvatar.setAttribute('style', `background: url(${this.dialogInfo.dialogAvatar}) no-repeat center center; background-size: cover;`);
    }

    if (tempDialogInfo.time !== this.dialogInfo.time) {
      this.dialogInfo.time = tempDialogInfo.time;
      this.dateRender(this.dialogInfo.time);
    }

    if (tempDialogInfo.status !== this.dialogInfo.status) {
      this.dialogInfo.status = tempDialogInfo.status;
      this.statusRender(this.dialogInfo.status);
    }
  }

  dialogRender(dialogInfo) {
    this.dialogInfo = dialogInfo;
    this.$userName.innerText = this.dialogInfo.dialogName;
    this.$lastMessage.innerText = this.dialogInfo.text;
    this.$userAvatar.setAttribute('style', `background: url(${this.dialogInfo.dialogAvatar}) no-repeat center center; background-size: cover;`);
    this.dateRender(this.dialogInfo.time);
    this.statusRender(this.dialogInfo.status, this.dialogInfo.unreadMessages);
  }

  dateRender(dialogTime) {
    const messageTime = new Date(dialogTime);
    const messageDate = {
      year: messageTime.getFullYear(),
      month: messageTime.getMonth(),
      date: messageTime.getDate(),
      time: messageTime.toString().split(' ')[4].split(':'),
    };

    let currentDate = new Date();
    currentDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      date: currentDate.getDate(),
    };

    const ruMonth = {
      1: 'Янв.',
      2: 'Фев.',
      3: 'Мар.',
      4: 'Фпр.',
      5: 'Май',
      6: 'Июн.',
      7: 'Июл.',
      8: 'Авг.',
      9: 'Сен.',
      10: 'Окт.',
      11: 'Ноя.',
      12: 'Дек.',
    };

    if (
      currentDate.year === messageDate.year
      && currentDate.month === messageDate.month
      && currentDate.date === messageDate.date
    ) { this.$messageTime.innerText = `${messageDate.time[0]}:${messageDate.time[1]}`; } else {
      const time = messageTime.toString().split(' ');
      this.$messageTime.innerText = `${ruMonth[messageDate.month + 1]} ${time[2]} ${time[3]}`;
    }
  }

  statusRender(dialogStatus, unreadMessages = '!') {
    switch (dialogStatus) {
      case 'new':
        this.$messageStatus.className = 'messageStatus';
        this.$messageStatus.classList.add('newMessages');
        this.$messageStatus.innerText = unreadMessages;
        break;

      default:
        this.$messageStatus.className = 'messageStatus';
        this.$messageStatus.classList.add(dialogStatus);
        this.$messageStatus.innerText = '';
        break;
    }
  }

  static get observedAttributes() {
    return ['dialogid'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.dialogID = newValue;
  }
}

customElements.define('object-dialog', ObjectDialog);

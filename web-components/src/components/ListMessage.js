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

  .userAvatar{
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

  .userName{
    margin-bottom: 10px;
  }

  .userName a{
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

  .readed{
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
    padding-top: 4px;
  }
</style>
<div class="dialog">
  <div class="userAvatar"></div>
  <div class="dialogInfo">
    <div class="userName">
      <a></a>
      <span class="messageTime">19:07</span>
    </div>
    <div class="lastMessage">
      <p></p>
      <span class="messageStatus"></span>
    </div>
  </div>
</div>
`;

class ObjectMessage extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$userName = this.shadowRoot.querySelector('.userName a');
    this.$messageTime = this.shadowRoot.querySelector('.messageTime');
    this.$lastMessage = this.shadowRoot.querySelector('.lastMessage p');
    this.$messageStatus = this.shadowRoot.querySelector('.messageStatus');
    this.$userAvatar = this.shadowRoot.querySelector('.userAvatar');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const messageInfo = JSON.parse(localStorage.getItem('messageList'))[newValue];
    
    this.$userName.innerText = messageInfo['userName'];
    this.$lastMessage.innerText = messageInfo['lastMessage'];
    this.$userAvatar.setAttribute('style', `background: url(${messageInfo['userAvatar']}) no-repeat center center; background-size: cover;`);

    const messageTime = new Date(messageInfo['messageTime']);
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
    ) 
      this.$messageTime.innerText = messageDate.time[0] + ':' + messageDate.time[1];
    else {
      let time = messageTime.toString().split(' ');
      this.$messageTime.innerText = `${ruMonth[messageDate.month + 1]} ${time[2]} ${time[3]}`
    }

    switch(messageInfo['messageStatus']) {
      case 'new':
        this.$messageStatus.classList.add('newMessages');
        this.$messageStatus.innerText = '*';
        break;

      default:
        this.$messageStatus.className = 'messageStatus';
        this.$messageStatus.classList.add(messageInfo['messageStatus']);
        break;
    }
  }

  static get observedAttributes() {
    return ['messagetime'];
  }
}

customElements.define('object-message', ObjectMessage);

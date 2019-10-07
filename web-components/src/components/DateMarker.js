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

  :host{
    width: 100%;
  }

  .messageDate{
    width: 100%;
    text-align: center;
    font-size: var(--fontMinMinSize);
    font-weight: 600;
    padding: 30px 0;
    color: #9A9B9D;
  }
</style>
<div class="messageDate"></div>
`;

class DialogInformation extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$text = this.shadowRoot.querySelector('.messageDate');

    this.addEventListener('reRender', this.renderElement.bind(this));
  }

  static get observedAttributes() {
    return ['time'];
  }

  renderElement() {
    let currentDate = new Date();
    currentDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      date: currentDate.getDate(),
    };

    let date = new Date(this.time);
    date = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };

    const ruMonth = {
      1: 'января',
      2: 'февраля',
      3: 'марта',
      4: 'апреля',
      5: 'мая',
      6: 'июня',
      7: 'июля',
      8: 'фвгуста',
      9: 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря',
    };

    if (
      currentDate.year === date.year
      && currentDate.month === date.month
      && currentDate.date === date.date
    ) this.$text.innerText = 'Сегодня,';
    this.$text.innerText += ' ' + date.date + ' ' + ruMonth[date.month];
    if (currentDate.year !== date.year) this.$text.innerText += ' ' + date.year;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.time = parseInt(newValue, 10);
    this.renderElement();
  }
}

customElements.define('date-marker', DialogInformation);

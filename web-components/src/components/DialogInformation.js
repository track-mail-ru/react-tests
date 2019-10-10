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
    height: 60px;
    display: flex;
    flex-direction: row;
  }

  .headerButton{
    height: 100%;
    width: 30px;
    margin: 0 15px;
    cursor: pointer;
  }

  .nameConteiner{
    flex: auto;
    height: 100%;
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .nameConteiner .userImage{
    height: 44px;
    width: 44px;
    border-radius: 25px;
    margin-right: 15px;
  }

  .nameConteiner .userName{
    /*flex: auto;*/
    height: 100%;
    padding-top: 5px;
  }

  .userName .name{
    font-size: var(--fontMinSize);
  }

  .userName .status{
    font-size: var(--fontMinMinSize);
    color: #9A9B9D;
  }

  .backButton{
    background: url(static/images/back.png) no-repeat center center;
    background-size: 100%;
  }

  .searchButton{
    background: url(static/images/search.png) no-repeat center center;
    background-size: 90%;
    margin-right: 0;
  }

  .optionsButton{
    background: url(static/images/options.png) no-repeat center center;
    background-size: 90%;
  }

  .backButton{
    height: 100%;
    width: 30px;
    opcaity: 0.85;
    transition-duration: 0.15s;
  }

  .backButton:hover{
    opacity: 1.0;
  }

  .backButton:active{
    opacity: 0.6;
  }
</style>
<div class="headerButton backButton"></div>
<div class="nameConteiner">
  <div class="userImage" style="background: url(static/images/image.jpg) no-repeat center center; background-size: cover;"></div>
  <div class="userName">
    <div class="name">Виталий Кисель</div>
    <div class="status">в сети 5 минут назад</div>
  </div>
</div>
<div class="headerButton searchButton"></div>
<div class="headerButton optionsButton"></div>
`;

class DialogInformation extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /* static get observedAttributes() {
      return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if(name == "value") this.$input.value = newValue;
      this.$input.setAttribute(name, newValue);
  } */
}

customElements.define('dialog-info', DialogInformation);

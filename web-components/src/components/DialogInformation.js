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
    /*background: url(/src/images/back.png) no-repeat center center;*/
    background: url(https://psv4.userapi.com/c848424/u110041918/docs/d14/fec849c344ba/back.png?extra=c1jT0ow4yMX9ZKF2_nztfTZ7TytsZjTv4NQt7JcNYFan82V11xIrXrE9Mh9FsuBM1MGqxI5LPTXBJ-vMikYdk9GUXYWoOpsnomIQKcB7KSsaf1pawEkr0FQ1cYKyyGjnvgDI06klA0KONzzB9koMOjCd) no-repeat center center;
    background-size: 100%;
  }

  .searchButton{
    /*background: url(/src/images/search.png) no-repeat center center;*/
    background: url(https://psv4.userapi.com/c848424/u110041918/docs/d6/3c452045f7e7/search.png?extra=GHQXWozRrNDw_osbOqye59ZUhlfJmqEl_d2ay92PFmT5_MlJkxvWL_XJTunhalQkZfDy9qJN8GmTelbwg5AlghqDMY4hxxSyQs4Kbv2PrBIlGtTk8JK5gRyaw75ab3yXS6AqeU-8tmw2UNB6ZtymkVGn) no-repeat center center;
    background-size: 90%;
    margin-right: 0;
  }

  .optionsButton{
    /*background: url(/src/images/options.png) no-repeat center center;*/
    background: url(https://psv4.userapi.com/c848424/u110041918/docs/d7/097016da0796/options.png?extra=aF4-yNBnQNPmCqGZrRuOi_RvuWxssRdILYcgBCcKgx_KRDGLP3zYhRZ0JVoHheXqOVkzOAaeiAzxP2RPzPuWv08uXn5fwH2i1DWifSrsbi9xxa805jHBqS7EfkWxTdskruORk1C8BQWtdxlV4Jc0Pe2r) no-repeat center center;
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
  <div class="userImage" style="background: url(https://psv4.userapi.com/c848424/u110041918/docs/d2/0a5b5afc9a32/image.jpg?extra=FsfOvdfzDSvmFMLPCKYSxPm_-d3WUIRgvwUX3aPEFaM9w4SSiSN6aHkQm_LPrrkDo1x2_JksaXuoOEFsvTh0gjzLKawDC8uD5d0PDPe6-2V_cNw5TfMpruAAqhXBcHgZQ_b5x2naFO44W5nIBY09vmQp) no-repeat center center; background-size: cover;"></div>
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

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
    display: flex;
    height: 50px;
    flex-direction: row;
  }
  
  input{
    color: #AAAEB1;
    border: none;
    outline: 0;
    flex: auto;
    height: 100%;
    background-color: transparent;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,Noto Sans Armenian,Noto Sans Bengali,Noto Sans Cherokee,Noto Sans Devanagari,Noto Sans Ethiopic,Noto Sans Georgian,Noto Sans Hebrew,Noto Sans Kannada,Noto Sans Khmer,Noto Sans Lao,Noto Sans Osmanya,Noto Sans Tamil,Noto Sans Telugu,Noto Sans Thai,sans-serif;
    font-size: var(--fontNormSize);
  }

  .additionalButton{
    background: url(static/images/sprait_1.png) no-repeat center center;
    background-size: 90%;
  }

  .sendButton{
    background: url(static/images/sprait_2.png) no-repeat center center;
    background-size: 90%;
  }

  .inputButton{
    height: 100%;
    width: 30px;
    margin: 0 15px;
    cursor: pointer;
    opacity: 0.85;
    transition-duration: 0.15s;
  }

  .inputButton:hover{
    opacity: 1.0;
  }

  .inputButton:active{
    opacity: 0.6;
  }
</style>
<div class="inputButton additionalButton"></div>
<input/>
<div class="inputButton sendButton"></div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
    this.$sendButton = this.shadowRoot.querySelector('.sendButton');
    this.$additionalButton = this.shadowRoot.querySelector('.additionalButton');

    this.$sendButton.addEventListener('click', this.onSubmit.bind(this));
    this.$additionalButton.addEventListener('click', this.onAdditionalButton.bind(this));
    this.$input.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onSubmit() {
    this.dispatchEvent(new Event('onSubmit'));
  }

  onAdditionalButton() {
    this.dispatchEvent(new Event('clickAdditionalButton'));
  }

  onKeyPress(event) {
    if (event.keyCode === 13) this.onSubmit();
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  clearInput() {
    this.$input.value = '';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') this.$input.value = newValue;
    else this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }
}

customElements.define('form-input', FormInput);

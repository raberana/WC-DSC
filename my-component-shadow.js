const tmplt = document.createElement('template');

tmplt.innerHTML = `
          <style>
            h3 {
              font-style: italic;
            }
          </style>
  
          <h1>
            Hello <span id="name"></span>
          </h1>
          <h3>
            h3: Welcome to Web Components (from custom component)
          </h3>
          
          <button id="btn">TELL PARENT</button>
          <slot name="slot1" style="color: blue"></slot>
          <slot name="slot2" style="color: red"></slot>
          <slot style="color: green"></slot>
        `;

class MyComponentShadow extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();

    this._name = '';

    let shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(tmplt.content.cloneNode(true));

    this.nameElement = this.shadowRoot.querySelector('#name');

    this.buttonElement = this.shadowRoot.querySelector('#btn');

    this.buttonElement.addEventListener('click', e => {
      this.dispatchEvent(
        new CustomEvent('myComponentEvent', {
          detail: this._name
        })
      );
    });
  }

  set name(value) {
    this._name = value;

    this.nameElement.innerText = this._name;
  }

  get name() {
    return this._name;
  }

  attributeChangedCallback(propertyName, oldValue, newValue) {
    this[propertyName] = newValue;
  }
}

window.customElements.define('my-component-shadow', MyComponentShadow);

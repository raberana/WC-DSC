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
            h3 (from custom component): Welcome to Web Components 
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

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(tmplt.content.cloneNode(true));

    this.nameElement = this.shadowRoot.querySelector('#name');

    this.buttonElement = this.shadowRoot.querySelector('#btn');

    // Send message to parent container
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
  
  // callback executed if one of the exposed properties has changed
  attributeChangedCallback(propertyName, oldValue, newValue) {
    this[propertyName] = newValue;
  }
}

window.customElements.define('my-component-shadow', MyComponentShadow);

/* 
const tmplt = document.createElement('template');

tmplt.innerHTML = `
          <h1>
            Hello <span id="name"></span>
          </h1>
        `;

let shadowRoot = this.attachShadow({ mode: 'open' });

shadowRoot.appendChild(tmplt.content.cloneNode(true));

---------------------------------

<template id="my-paragraph">
  <p>My paragraph</p>
</template> 

let template = document.getElementById('my-paragraph');
let templateContent = template.content;
document.body.appendChild(templateContent);

---------------------------------

<better-button>
  <!-- the image and span are better-button's light DOM -->
  <img src="gear.svg" slot="icon">
  <span>Settings</span>
</better-button>

---------------------------------
The closed mode of Shadow DOM provides the same encapsulation as the open mode 
but additionally allows the component author to hide access to the ShadowRoot


*/

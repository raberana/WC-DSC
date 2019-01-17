class MyComponentShadow extends HTMLElement {
    constructor() {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});

        let tmplt = document.createElement('template');

        tmplt.innerHTML = `
          <style>
            h3 {
              font-style: italic;
            }
          </style>
  
          <h1>Hello DSC!</h1>
          <h3>Welcome to Web Components (from custom component)</h3>
        `;

        shadowRoot.appendChild(tmplt.content.cloneNode(true));
    }
}

window.customElements.define('my-component-shadow', MyComponentShadow);

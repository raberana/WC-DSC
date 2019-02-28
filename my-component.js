class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <style>
          h3 {
            font-style: italic;
          }
        </style>

        <h1>
          Hello DSC
        </h1>
        <h3>
          h3 (from custom component): Welcome to Web Components 
        </h3>
      `;
  }
}

window.customElements.define('my-component', MyComponent);

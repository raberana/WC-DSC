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
          h3: Welcome to Web Components (from custom component)
        </h3>
      `;
  }
}

window.customElements.define('my-component', MyComponent);

import { state } from "../../state";

customElements.define(
  "button-comp",
  class ComponentButton extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    addStyles() {
      const style = document.createElement("style");
      style.innerHTML = `

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .button {
        background-color: #006CFC;
        border: 8px solid #001997;
        border-radius: 10px;
        
        width: 100%;
        height: 100%;
        min-height: 50px;

        color: white;
        font-family: Odibee Sans;
        font-size: 2em;
        font-weight: 400;
        letter-spacing: 0.05em;
        text-align: center;

      }`;

      this.shadow.appendChild(style);
    }

    render() {
      const buttonContent = this.textContent;

      this.shadow.innerHTML = `
        <button class="button">${buttonContent}</button>
      `;

      this.addStyles();
    }
  }
);

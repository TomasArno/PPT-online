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

      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 13px;

      }

      .input {
        border: 10px solid #001997;
        border-radius: 10px;
        width: 100%;
        height: 72px;
        display: none;

        color: black;
        font-family: Odibee Sans;
        font-size: 40px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
      }

      .button {
        background-color: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
        
        width: 100%;
        height: 72px;

        color: white;
        font-family: Odibee Sans;
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;

      }`;

      const inputEl = this.shadow.querySelector(".input") as HTMLElement;
      const attributeAddEl = this.getAttribute("add");

      if (attributeAddEl) {
        inputEl.style.display = "initial";
      }

      this.shadow.appendChild(style);
    }

    render() {
      const buttonContent = this.textContent;
      const attributeTypeEl = this.getAttribute("type");

      if (attributeTypeEl == "new") {
        var content = "Tu nombre";
      } else {
        content = "Código";
      }

      this.shadow.innerHTML = `
      <div class="container">
      <input placeholder="${content}" class="input"/>
      <button class="button">${buttonContent}</button>
      </div>
      `;

      this.addStyles();
    }
  }
);

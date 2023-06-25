customElements.define(
  "button-comp",
  class ComponentButton extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const style = document.createElement("style");
      style.innerHTML = `
      .button {
        background-color: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
        
        width: 100%;
        height: 100%;

        color: white;
        font-family: Odibee Sans;
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;


      }`;
      this.shadow.appendChild(style);
      this.render();
    }

    render() {
      const buttonContent = this.textContent;

      const divEl = document.createElement("div");
      divEl.innerHTML = `
        <button class="button">${buttonContent}</button>
        `;
      this.shadow.appendChild(divEl);
    }
  }
);

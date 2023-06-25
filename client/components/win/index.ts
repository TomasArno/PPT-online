customElements.define(
  "result-img-win",
  class Result extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const style = document.createElement("style");
      style.innerHTML = `
      .img-result {
        width: 255px;
        height: auto;
      }
      
      .p-win {
        margin: 0;
        color: white;
        position: relative;
        bottom: 170px;

        font-family: Odibee Sans;
        font-size: 40px;
        font-weight: 400;
        line-height: 61px;
        letter-spacing: 0.05em;
        text-align: center;
      }

      @media (min-width: 768px) {
        .img-result {
          width: 300px;
        }

        .p-win {
          bottom: 190px;
          left: 5px;
        }
      }
      
      @media (min-width: 1023px) {
        .img-result {
          width: 400px;
        }

        .p-win {
          bottom: 240px;
          left: 5px;

          font-size: 55px;
        }
      }
      `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const componentEl = document.createElement("div");
      const imgWin = require("url:../../images/win.svg");

      componentEl.innerHTML = `
      <img class="img-result" src="${imgWin}">
      <p class ="p-win">Ganaste!</p>
      `;

      this.shadow.appendChild(componentEl);
    }
  }
);

customElements.define(
  "result-img-lose",
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
        
        .p-lose {
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
  
          .p-lose {
            bottom: 190px;
            left: 5px;
          }
        }
        
        @media (min-width: 1023px) {
          .img-result {
            width: 400px;
          }
  
          .p-lose {
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
      const imgLose = require("url:../../images/lose.svg");

      componentEl.innerHTML = `
        <img class="img-result" src="${imgLose}">
        <p class="p-lose">Perdiste</p>
        `;

      this.shadow.appendChild(componentEl);
    }
  }
);

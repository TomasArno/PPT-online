customElements.define(
  "title-comp",
  class ComponentTitle extends HTMLElement {
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

      .title {
        margin-top: 115px;
        
        width: 420px;
        color: #009048;
        text-align: center;
        font-size: 80px;
        font-weight: 700;
        line-height: 70px;
        letter-spacing: 0em;
      }

      @media (min-width: 767px) {
        .title {
          margin-top: 65px;
          font-size: 80px;
          line-height: 90px;
        }
      }

      @media (min-width: 1023px) {
        .title {
          margin-top: 75px;
          font-size: 90px;
          line-height: 100px;
        }
      }
      `;

      this.shadow.appendChild(style);
    }

    render() {
      this.shadow.innerHTML = `<h1 class="title">Piedra Papel o Tijera</h1>`;

      this.addStyles();
    }
  }
);

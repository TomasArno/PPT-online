import { Router } from "@vaadin/router";

customElements.define(
  "init-auth",
  class InitAuth extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
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

      .main {
        width: 100%;
        height: 100vh;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
      
      .button-container {
        width: 320px;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }

      @media (min-width: 768px) {
        .button-container {
          width: 400px;
        }
      }

      .btn {
        height: 55px;
      }
      
      .hand-img {
        height: 170px;
        position: relative;
        top: 40px;
      }

      @media (min-width: 768px) {
        .hand-img {
          height: 230px;
        }
      }

      
  `;
      this.shadow.appendChild(style);
    }

    render() {
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/piedra.svg");
      const rock = require("url:../../images/tijera.svg");

      this.shadow.innerHTML = `
      <main class="main">
        <title-comp></title-comp>
        <div class="button-container">
          <button-comp class="sign-up btn">Registrarse</button-comp>
          <button-comp class="log-in btn">Iniciar Sesión</button-comp>
        </div>
        <div class="images">
          <img class="hand-img" src="${rock}">
          <img class="hand-img" src="${paper}">
          <img class="hand-img" src="${scissors}">
        </div>
      </main>
      `;

      this.addStyles();

      this.setListeners();
    }

    setListeners() {
      this.shadow.querySelector(".sign-up").addEventListener("click", () => {
        Router.go("/sign-up");
      });
      this.shadow.querySelector(".log-in").addEventListener("click", () => {
        Router.go("/log-in");
      });
    }
  }
);

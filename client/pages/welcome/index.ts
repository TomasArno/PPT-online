import { Router } from "@vaadin/router";

customElements.define(
  "init-welcome",
  class InitWelcome extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    setListeners() {
      this.shadow
        .querySelector(".button-container")
        .addEventListener("click", () => {
          Router.go("/details");
        });
    }

    addStyles() {
      const style = document.createElement("style");
      style.innerHTML = `
      .main {
        width: 100%;
        height: 100vh;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
      
      .intro-title {
        margin-top: 115px;
        
        color: #009048;
        text-align: center;
        font-size: 80px;
        font-weight: 700;
        line-height: 70px;
        letter-spacing: 0em;
      }
      
      .button-container {
        width: 320px;
      }
      
      .hand-img {
        height: 170px;
        position: relative;
        top: 40px;
      }

      @media (min-width: 767px) {
        .hand-img {
          height: 250px;
        }
      }

      @media (min-width: 768px) {
        .intro-title {

        width: 350px;
        height: 280px;
        font-size: 100px;
        line-height: 90px;
        }

        .button-container {
          width: 400px;

        }
      }
  `;
      this.shadow.appendChild(style);
    }

    render() {
      // const paper = require("url:../../images/papel.svg");
      // const scissors = require("url:../../images/piedra.svg");
      // const rock = require("url:../../images/tijera.svg");
      const paper = "https://picsum.photos/200/300";
      const scissors = "https://picsum.photos/200/300";
      const rock = "https://picsum.photos/200/300";

      this.shadow.innerHTML = `
      <main class="main">
        <h1 class="intro-title">Piedra Papel ó Tijera</h1>
        <div class="button-container">
          <button-comp>¡Empezar!</button-comp>
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
  }
);

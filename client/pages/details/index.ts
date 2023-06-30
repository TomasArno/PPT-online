import { Router } from "@vaadin/router";

customElements.define(
  "init-details",
  class InitDetails extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    setListeners() {
      const buttonContainerEl = this.shadow.querySelector(
        ".button-container"
      ) as HTMLElement;

      buttonContainerEl.addEventListener("click", () => {
        Router.go("/game");
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
      
      .descrip-title {
        margin-top: 115px;
        
        color: black;
        text-align: center;
        font-family: American Typewriter;
        font-size: 40px;
        font-weight: 600;
        line-height: 40px;
        letter-spacing: 0px;
      }

      @media (min-width: 767px) {
        .descrip-title {
          width: 600px;
          height: 320px;
          font-size: 60px;
          line-height: 60px;
        }
      }
      
      .button-container {
        width: 320px;
      }

      @media (min-width: 767px) {
        .button-container {
          width: 400px;
        }
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
          <h3 class="descrip-title">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</h3>
          <div class="button-container">
            <button-comp>¡Jugar!</button-comp>
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

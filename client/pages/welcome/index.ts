import { Router } from "@vaadin/router";
import { state } from "../../state";

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
      
      @media (min-width: 767px) {
        .button-container {
          width: 400px;
        }
      }

      .btn {
        height: 50px;
      }

      
      .hand-img {
        height: 170px;
        position: relative;
        top: 40px;
      }

      @media (min-width: 767px) {
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
          <button-comp class="new-game btn">Nuevo Juego</button-comp>
          <button-comp class="join-game btn">Ingresar a una sala</button-comp>
          <button-comp class="log-out btn">Cerrar sesión</button-comp>
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
      let enteredFlag = false;

      const intervalId = setInterval(() => {
        enteredFlag = false;
      }, 1500);

      this.shadow.querySelector(".new-game").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;

          state.createRoom().then(() => {
            Router.go("/share-room");
            clearInterval(intervalId);
          });
        }
      });

      this.shadow.querySelector(".join-game").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;

          Router.go("/join-game");
          clearInterval(intervalId);
        }
      });

      this.shadow.querySelector(".log-out").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;
          state.deleteLocalStorage();
          Router.go("/");
          clearInterval(intervalId);
        }
      });
    }
  }
);

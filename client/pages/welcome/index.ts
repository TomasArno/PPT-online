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
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }

      .btn {
        height: 50px;
      }

      @media (min-width: 767px) {
        .intro-title {
          margin-top: 65px;
          width: 40%;
          font-size: 80px;
          line-height: 90px;
        }

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
      // const paper = "https://picsum.photos/200/300";
      // const scissors = "https://picsum.photos/200/300";
      // const rock = "https://picsum.photos/200/300";

      this.shadow.innerHTML = `
      <main class="main">
        <h1 class="intro-title">Piedra Papel o Tijera</h1>
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

      this.shadow.querySelector(".new-game").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;

          state.createRoom().then(() => {
            Router.go("/share-room");
          });
        }
      });

      this.shadow.querySelector(".join-game").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;

          Router.go("/join-game");
        }
      });

      this.shadow.querySelector(".log-out").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;
          state.deleteLocalStorage();
          Router.go("/");
        }
      });
    }
  }
);

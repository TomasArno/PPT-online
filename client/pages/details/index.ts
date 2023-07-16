import { Router } from "@vaadin/router";
import { state } from "../../state";

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

      .data-container {
        width: 70%;
        padding: 30px 0;
        display:flex;
        justify-content: space-between;
        font-size: 20px;
      }
      .data-container div {
        display:flex;
        flex-direction: column;
        text-align: right;
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

      state.subscribe(() => {
        const cs = state.getState();
        const rivalUserName = state.getOpponentData().userName;

        this.shadow.innerHTML = `
        <main class="main">
          <div class="data-container">
            <div class="player-info-container">
              <p>${cs.userData.userName}: 0</p>
              <p>${rivalUserName}: 0</p>
            </div>
            <div class="room-info-container">
              <p>Sala</p>
              <p>${cs.userData.userShortRoomId}</p>
            </div>
          </div>

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
      });
    }
    setListeners() {
      const buttonContainerEl = this.shadow.querySelector(
        ".button-container"
      ) as HTMLElement;

      buttonContainerEl.addEventListener("click", () => {
        // Router.go("/wait-room");
        state.deletePlayer();
      });
    }
  }
);

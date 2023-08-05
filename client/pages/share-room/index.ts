import { Router } from "@vaadin/router";
import { state } from "../../state";
import { State } from "../../interfaces";

customElements.define(
  "share-room",
  class ShareRoom extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      state.subscribe(() => {
        this.render();
      });
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
      
      .dinamic-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center; 
        row-gap: 40px;
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

      .dinamic-title {
        width: 80%;
        text-align: center;
        font-family: American Typewriter;
        font-size: 31px;
        line-height: 45px;
      }

      @media (min-width: 767px) {
        .dinamic-title {
          margin-top: 65px;
          font-size: 50px;
        }
      }

      .button-container {
        width: 320px;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
      }

      @media (min-width: 767px) {
        .button-container {
          width: 400px;
        }
      }

      .btn {
        height: 50px;
      }
  `;
      this.shadow.appendChild(style);
    }

    render() {
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/piedra.svg");
      const rock = require("url:../../images/tijera.svg");

      const cs: State = state.getState();
      const myData = state.getPlayersData(1);
      const opponentData = state.getPlayersData(2);

      const myUserName = myData.userName;
      const opponentUserName = opponentData.userName;

      if (myData.start && opponentData.start) {
        Router.go("/game");
      }

      this.shadow.innerHTML = `
        <main class="main">
          <div class="data-container">
            <div class="player-info-container">
              <p>${myUserName}: ${cs.rtDbData["history"][myUserName] || 0}</p>
              <p>${opponentUserName || "Player 2"}: ${
        cs.rtDbData["history"][opponentUserName] || 0
      }</p>
            </div>
            <div class="room-info-container">
                <p>Sala</p>
                <p>${cs.userData.shortRoomId}</p>
            </div>
          </div>
          <div class="dinamic-container"></div>
          <div class="images">
            <img class="hand-img" src="${rock}">
            <img class="hand-img" src="${paper}">
            <img class="hand-img" src="${scissors}">
          </div>
        </main>`;

      const dinamicContainerEl = this.shadow.querySelector(
        ".dinamic-container"
      ) as HTMLElement;

      if (!opponentData) {
        dinamicContainerEl.innerHTML = `
          <h3 class="dinamic-title">Compartí el código <br> <span class="room-code">${cs.userData.shortRoomId}</span> <br> con tu rival.</h3>`;
      } else if (!myData.start) {
        dinamicContainerEl.innerHTML = `
          <h3 class="dinamic-title">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</h3>
          <div class="button-container"><button-comp class="btn" id="button-play">¡Jugar!</button-comp><button-comp class="btn" id="button-back">Volver</button-comp></div>`;
      } else if (!opponentData.start) {
        dinamicContainerEl.innerHTML = `
          <h3 class="dinamic-title">Esperando a que <br><span class="player-name">${opponentData.userName}</span> presione<br> ¡Jugar!...</h3>`;
      }

      this.addStyles();
      this.setListeners(myData, opponentData);
    }

    setListeners(myData, opponentData) {
      if (opponentData && !myData.start) {
        const buttonPlayEl = this.shadow.querySelector(
          "#button-play"
        ) as HTMLFormElement;

        const buttonBackEl = this.shadow.querySelector(
          "#button-back"
        ) as HTMLFormElement;

        let enteredFlag = false;
        const intervalId = setInterval(() => {
          enteredFlag = false;
        }, 1500);

        buttonPlayEl.addEventListener("click", () => {
          if (!enteredFlag) {
            enteredFlag = true;
            state.setPlayerStateDb({ start: true }).then(() => {
              clearInterval(intervalId);
            });
          }
        });

        buttonBackEl.addEventListener("click", () => {
          state.deletePlayer();
          Router.go("/welcome");
          clearInterval(intervalId);
        });
      }
    }
  }
);

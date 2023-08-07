import { Router } from "@vaadin/router";
import { state } from "../../state";
import { State } from "../../interfaces";

customElements.define(
  "waiting-room",
  class WaitingRoom extends HTMLElement {
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
  `;
      this.shadow.appendChild(style);
    }

    render() {
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/piedra.svg");
      const rock = require("url:../../images/tijera.svg");

      const cs: State = state.getState();

      state.subscribe(() => {
        const myData = state.getPlayersData(1);
        const opponentData = state.getPlayersData(2);

        if (myData.start && opponentData.start) {
          Router.go("/game");
        }
      });

      const myData = state.getPlayersData(1);
      const opponentData = state.getPlayersData(2);

      if (myData.start && opponentData.start) {
        Router.go("/game");
      }

      const myUserName = myData.userName;
      const opponentUserName = opponentData.userName;

      this.shadow.innerHTML = `
        <main class="main">
          <div class="data-container">
            <div class="player-info-container">
              <p>${myUserName}: ${cs.rtDbData["history"][myUserName] || 0}</p>
              <p>${opponentUserName || "player 2"}: ${
        cs.rtDbData["history"][opponentUserName] || 0
      }</p>
            </div>
            <div class="room-info-container">
                <p>Sala</p>
                <p>${cs.userData.shortRoomId}</p>
            </div>
          </div>
          <div class="dinamic-container">
            <h3 class="dinamic-title">Esperando a que <br><span class="player-name">${
              opponentData.userName
            }</span> presione<br> ¡Jugar!...</h3>
          </div>
          <div class="images">
            <img class="hand-img" src="${rock}">
            <img class="hand-img" src="${paper}">
            <img class="hand-img" src="${scissors}">
          </div>
        </main>`;

      this.addStyles();
    }
  }
);

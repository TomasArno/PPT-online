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
        color: black;
        text-align: center;
        font-family: American Typewriter;
        font-size: 40px;
        line-height: 60px;
        letter-spacing: 0px;

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


      @media (min-width: 767px) {
        .dinamic-title {
          width: 600px;
          height: 320px;
          font-size: 60px;
          line-height: 60px;
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

      const cs: State = state.getState();
      const myData = state.getPlayersData(1);
      const opponentData = state.getPlayersData(2);

      const myUserName = myData.userName;
      const opponentUserName = opponentData.userName;

      if (myData.start && opponentData.start) {
        Router.go("/game");
      }

      //no crea nuevo usuario en el room sino que lo pisa, ver si los endpoints se pisan
      // ver si el error era porque se pisaban los endpoints ya que le agregué el users y ahora se diferencias

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
          <h3 class="descrip-title">Compartí el código <br> <span class="room-code">${cs.userData.shortRoomId}</span> <br> con tu rival.</h3>`;
      } else if (!myData.start) {
        dinamicContainerEl.innerHTML = `
          <h3 class="descrip-title">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</h3>
          <div class="button-container"><button-comp id="button-play">¡Jugar!</button-comp><button-comp id="button-back">Volver</button-comp></div>`;
      } else if (!opponentData.start) {
        dinamicContainerEl.innerHTML = `
          <h3 class="descrip-title">Esperando a que <br><span class="player-name">${opponentData.userName}</span> presione<br> ¡Jugar!...</h3>`;
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

        buttonPlayEl.addEventListener("click", () => {
          if (!enteredFlag) {
            console.log("seteo el start en true");

            enteredFlag = true;
            state.setPlayerStateDb({ start: true });
          }
        });

        buttonBackEl.addEventListener("click", () => {
          state.deletePlayer();
          Router.go("/welcome");
        });
      }
    }
  }
);

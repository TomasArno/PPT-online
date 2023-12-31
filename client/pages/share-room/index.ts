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
      
      .dinamic-container {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
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

      this.shadow.innerHTML = `
        <main class="main">
          <div class="dinamic-container">
            <h3 class="dinamic-title">Compartí el código <br> <span class="room-code">${cs.userData.shortRoomId}</span> <br> con tu rival.</h3>
          </div>
          <div class="images">
            <img class="hand-img" src="${rock}">
            <img class="hand-img" src="${paper}">
            <img class="hand-img" src="${scissors}">
          </div>
        </main>`;

      this.addStyles();
      this.setListeners();
    }

    setListeners() {
      state.subscribe(() => {
        const opponentData = state.getPlayersData(2);

        if (!opponentData) {
          Router.go("/share-room");
        } else {
          Router.go("/details");
        }
      });
    }
  }
);

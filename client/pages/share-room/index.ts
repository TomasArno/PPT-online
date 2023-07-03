import { Router } from "@vaadin/router";

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
      
      .code-container {
        color: black;
        text-align: center;
        font-family: American Typewriter;
        font-size: 40px;
        line-height: 60px;
        letter-spacing: 0px;
      }
      
      .button-container {
        width: 320px;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
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
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/piedra.svg");
      const rock = require("url:../../images/tijera.svg");
      // const paper = "https://picsum.photos/200/300";
      // const scissors = "https://picsum.photos/200/300";
      // const rock = "https://picsum.photos/200/300";

      this.shadow.innerHTML = `
      <main class="main">
        <div class="data-container">
          <div class="player-info-container">
            <p>Player 1: 0</p>
            <p>Player 2: 0</p>
          </div>
          <div class="room-info-container">
            <p>Sala</p>
            <p>123456</p>
          </div>
        </div>
        <div class="code-container">
          <h3 class="descrip-title">Compartí el código <br> <span class="room-code">123456</span> <br> con tu rival.</h3>
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
      // this.shadow.querySelector(".new-game").addEventListener("click", () => {
      //   Router.go("/new-game");
      // });
      // this.shadow.querySelector(".join-game").addEventListener("click", () => {
      //   Router.go("/join-game");
      // });
    }
  }
);

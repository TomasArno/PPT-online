import { Router } from "@vaadin/router";

customElements.define(
  "full-room",
  class FullRoom extends HTMLElement {
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
        justify-content: space-around;
      }
      
      .intro-title {        
        color: #009048;
        text-align: center;
        font-size: 80px;
        font-weight: 700;
        line-height: 70px;
        letter-spacing: 0em;
      }

      .info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 30px;
      }

      .descrip-title {        
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
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }
      
      .images {
        position: relative;
        top: 101px;
      }
      .hand-img {
        height: 170px;
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
        <h1 class="intro-title">Piedra Papel ó Tijera</h1>
        <div class="info-container">
          <h3 class="descrip-title">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala..</h3>
          <div class="button-container">
          <button-comp class="new-game">Volver</button-comp>
          </div>
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

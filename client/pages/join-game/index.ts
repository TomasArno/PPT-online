import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "join-game",
  class JoinGame extends HTMLElement {
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
      
      .comp-container {
        width: 320px;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }

      .btn {
        height: 50px;
      }

      .input {
        background-color: white;
        border: 8px solid #001997;
        border-radius: 10px;
        
        width: 100%;
        height: 50px;

        color: black;
        font-family: Odibee Sans;
        font-size: 40px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
      }
      
      .input::placeholder {
        color: #006CFC;
        font-size: 35px;
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

      @media (min-width: 768px) {
        .intro-title {

          margin-top: 65px;
          width: 40%;
          font-size: 80px;
          line-height: 90px;
        }

        .comp-container {
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
        <h1 class="intro-title">Piedra Papel o Tijera</h1>
        <div class="comp-container">
          <input placeholder="Room ID" class="input" />
          <button-comp class="join-game btn">Ingresar a la sala</button-comp>
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
      const inputEl = this.shadow.querySelector(".input") as HTMLFormElement;

      let enteredFlag = false;
      this.shadow.querySelector(".join-game").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;
          state.joinRoom(inputEl.value).then((res) => {
            res ? Router.go("/share-room") : Router.go("/full-room");
          });
        }
      });
    }
  }
);

import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "init-game",
  class InitGame extends HTMLElement {
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
      .main {
        width: 100%;
        height: 100vh;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
      
      .timer-container {
        border: 23px solid #000000;
        border-radius: 50%;
        width: 300px;
        height: 300px;
        margin: auto;
      }
      .timer {
        margin-top: 80px;
        font-family: American Typewriter;
        font-size: 100px;
        font-weight: 700;
        line-height: 100px;
        letter-spacing: 0em;
        text-align: center;
      }

      .my-hand-img {
        height: 235px;
      }

      @media (min-width: 767px) {
        .my-hand-img {
          height: 250px;
        }
      }

      .my-images {
        position: relative;
        top: 50px;
      }

      .my-images, .opponent-image {
        display: flex;
        justify-content: center;
      }
      
      .hand-selected {
        height: 355px;
      }
      
      .opponent-hand-img {
        height: 355px;
        transform: rotate(180deg);

        position: relative;
        bottom: 40px;
      }


      .warning-container {
        margin: auto;
        display: flex;
        flex-direction: column;
        row-gap: 50px;

      }

      @media (min-width: 767px) {
        .warning-container {
          row-gap: 80px;
        }
      }

      .warning {
        color: black;
        width: 410px;

        font-family: American Typewriter;
        font-size: 30px;
        font-weight: 600;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: center;
      }

      @media (min-width: 767px) {
        .warning {
          width: 700px;
          font-size: 50px;
          line-height: 60px;
        }
      }

      .btn-container {
        width: 80%;
        max-width: 400px;
        margin: 0 auto;
      }
      `;
      this.shadow.appendChild(style);
    }

    setListeners() {
      const redirectBtn = this.shadow.querySelector(
        ".redirect-btn"
      ) as HTMLElement;

      redirectBtn.addEventListener("click", () => {
        Router.go("/share-room");
      });
    }

    render() {
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/tijera.svg");
      const rock = require("url:../../images/piedra.svg");
      // const paper = "https://picsum.photos/200/300";
      // const scissors = "https://picsum.photos/200/300";
      // const rock = "https://picsum.photos/200/300";

      this.shadow.innerHTML = `
        <main class="main">
          <div class="timer-container">
            <div class="timer"></div>
          </div>
          <div class="my-images">
            <img class="my-hand-img scissors" id=scissors src="${scissors}">
            <img class="my-hand-img paper" id=paper src="${paper}">
            <img class="my-hand-img rock" id=rock src="${rock}">
          </div>
        </main>
        `;
      this.addStyles();

      const imgContainer = this.shadow.querySelector(".my-images") as any;
      const timerEl = this.shadow.querySelector(".timer") as HTMLElement;

      let counter = 3;

      const intervalId = setInterval(() => {
        timerEl.textContent = counter.toString();
        counter--;
        if (counter < 0) {
          clearInterval(intervalId);
          this.doNothing();
        }
      }, 1000);

      imgContainer.addEventListener("click", (e: Event) => {
        clearInterval(intervalId);
        this.setMovements(e);
      });
    }
    setMovements(event: Event) {
      const imgContainer = this.shadow.querySelector(
        ".my-images"
      ) as HTMLElement;
      const imagesEl = imgContainer.querySelectorAll(".my-hand-img");

      const selectedImg = event.target as HTMLImageElement;
      const urlImgSelected = selectedImg.getAttribute("src");
      const idImgSelected = selectedImg.getAttribute("id");

      state.setMove({
        choice: idImgSelected,
      });

      state.subscribe(() => {
        const cs = state.getState();

        const myChoice = state.getPlayersData(1).choice;
        const opponentChoice = state.getPlayersData(2).choice;

        if (
          myChoice &&
          // opponentChoice &&
          cs.lastWinner &&
          cs.rtDbData.history
        ) {
          Router.go("/results");
        }

        if (opponentChoice) {
          let opponentImgSelected;

          for (const img of imagesEl) {
            if (img.getAttribute("id") == opponentChoice) {
              opponentImgSelected = img;
            }
          }
          var opponentUrlImg = opponentImgSelected.getAttribute("src");
        }

        this.shadow.innerHTML = `
        <main class="main">
          <div class="opponent-image">
            <img class="opponent-hand-img" src="${opponentUrlImg || ""}">
          </div>
          
          <div class="my-images">
            <img class="hand-selected" src="${urlImgSelected}">
          </div>
        </main>
        `;
        this.addStyles();
      });

      setTimeout(() => {
        state.setWinner();
      }, 2500);
    }

    doNothing() {
      this.shadow.innerHTML = `
      <main class ="main">
        <div class="warning-container">
          <p class="warning">¡Recordá elegir una opción antes que pasen los 3 segundos!</p>
      
          <div class ="btn-container">
            <button-comp class ="redirect-btn">Volver</button-comp>
          </div>
        </div>
      </main>
        `;
      const buttonEl = this.shadow.querySelector(
        ".btn-container"
      ) as HTMLElement;

      const cs = state.getState();

      buttonEl.addEventListener("click", () => {
        cs.lastWinner = "";
        state.setState(cs);

        state.setPlayerStateDb({ start: false, choice: "" });

        Router.go("/share-room");
      });
      this.addStyles();
      this.setListeners();
    }
  }
);

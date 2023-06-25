import { state } from "../../state";

customElements.define(
  "init-results",
  class InitResults extends HTMLElement {
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
      .container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
      .score {
        background-color: white;
        border: 10px solid #000000;
        border-radius: 10px;
        width: 280px;
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .score_title {
        font-family: Odibee Sans;
        font-size: 55px;
        font-weight: 400;
        line-height: 61px;
        text-align: center;
      }
      .history-container {
        margin-top: 17px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        flex-wrap: wrap;
        column-gap: 25px;
        
        font-size: 55px;
        text-align: right;
      }
      @media (min-width: 1023px) {
        .history-container {
          flex-direction: column;
        }
      }
      .history {
        margin: 0 5px 0 0;
        
        font-family: Odibee Sans;
        font-size: 43px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
      }
      
      @media (min-width: 1023px) {
        .score {
          width: 400px;
          height: 290px;
        }
        
        .score_title {
          font-size: 60px;
        }
        
        
        
        
        .history {
          margin: 0 15px 0 0;
          
          font-size: 55px;
        }
        
        .button-container {
          width: 400px;
          height: 80px;
        }
      }
      
      .p-draw{
        font-family: Odibee Sans;
        font-size: 62px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
      }
      
      @media (min-width: 1023px) {
        .p-draw {
          font-size: 80px;
        }
      }
      
      .delete-container {
        align-self: end;
        margin-left: 6px;
      }
      @media (min-width: 1023px) {
        .delete-container {
          align-self: start;
        }
      }
      
      .delete-history {
        height: 35px;
        display: flex;
      }
      @media (min-width: 1023px) {
        .delete-history {
          height: 43px;
        }
      }
      `;
      this.shadow.appendChild(style);
    }

    render() {
      const currentState = state.getState();
      const myHistory = currentState.history.myWins;
      const cpuHistory = currentState.history.cpuWins;

      const logoTacho = require("url:../../images/tacho.svg");
      console.log(logoTacho);

      this.shadow.innerHTML = `
        <div class="img-container">
        </div>
          <div class="score">
              <h3 class="score_title">Score</h3>
              <div class="history-container">
                  <p class="history">Vos: ${myHistory}</p>
                  <p class="history">Máquina: ${cpuHistory}</p>
                  <div class="delete-container">
                    <img class="delete-history" src="${logoTacho}"/>
                  </div>
              </div>
          </div>
          <div class="button-container">
            <button-comp>Volver a jugar!</button-comp>
          </div>`;

      const imgContainer = this.shadow.querySelector(
        ".img-container"
      ) as HTMLElement;

      if (currentState.lastWinner == "user") {
        imgContainer.innerHTML = `<result-img-win>¡Ganaste!</result-img-win>`;
        // this.shadow.style.backgroundColor = "#888949E5";
      } else if (currentState.lastWinner == "cpu") {
        imgContainer.innerHTML = `<result-img-lose>Perdiste</result-img-lose>`;
        // this.shadow.style.backgroundColor = "#894949E5";
      } else {
        imgContainer.innerHTML = `<p class ="p-draw">¡Empate!</p>`;
        // this.shadow.style.backgroundColor = "#FDEBD0";
      }
      console.log(currentState.lastWinner);

      // const buttonEl = this.shadow.querySelector(
      //   ".button-container"
      // ) as HTMLElement;

      const deleteHistoryEl = this.shadow.querySelector(
        ".delete-history"
      ) as HTMLElement;

      deleteHistoryEl.addEventListener("click", () => {
        state.deleteHistory();
      });

      // buttonEl.addEventListener("click", () => {
      //   goTo("/details");
      // });

      this.addStyles();
    }
  }
);
